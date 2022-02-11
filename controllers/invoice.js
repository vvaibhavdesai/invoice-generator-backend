const Invoice = require("../models/Invoice");
const User = require("../models/User");

exports.getAll = async (req, res, next) => {
  const user = req.user;
  console.log(user, "user");
  try {
    const invoices = await User.findById(user._id)
      .populate("userInvoices")
      .exec();
    console.log(invoices, "invoices");

    res.status(200).json({
      success: true,
      invoices,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      msg: error,
    });
  }
};

exports.createInvoice = async (req, res, next) => {
  const user = req.user;
  const { invoice } = req.body;

  try {
    const newInvoice = new Invoice({
      ...invoice,
    });
    const dbUser = await User.findById(user._id);
    console.log(dbUser, "dbUser");

    
      dbUser.userInvoices.push(newInvoice._id);
      await dbUser.save();
    await newInvoice.save(function (err, doc) {
      if (err) {
        return res.status(500).json({
          success: false,
          code: "FAILED_TO_SAVE",
          msg: "Failed to save this doc",
        });
      } else {
        console.log(doc, "doc");
        return res.status(200).json({
          success: true,
          code: "INVOICE_SAVED",
          doc,
        });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
