const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  customer: {
    address: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
    phone: {
      type: String,
      lowercase: true,
    },
    pincode: {
      type: String,
    },
    name:{
      type: String,
    }
  },
  itemsList: [
    {
      itemName: String,
      id: Number,
      price: Number,
      quantity: Number,
      subTotal: Number,
      tax: Number,
      discount: Number,
      discountAmount: Number,
      taxAmount: Number,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  discount: {
    type: Number,
  },
  discountAmount: {
    type: Number,
  },
  grandTotal: {
    type: Number,
  },
  id: {
    type: String,
  },
  subTotal: {
    type: Number,
  },
  tax: {
    type: Number,
  },
  taxAmount: {
    type: Number,
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
