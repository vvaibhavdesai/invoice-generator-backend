const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middlewares/checkAuth");
const invoice = require("../controllers/Invoice");
router.route("/all").get(checkAuth, invoice.getAll);
router.route("/create").post(checkAuth, invoice.createInvoice);
module.exports = router;
