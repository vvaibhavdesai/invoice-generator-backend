const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middlewares/checkAuth");
const { getAll, createInvoice } = require("../controllers/Invoice");

router.route("/all").get(checkAuth, getAll);
router.route("/create").post(checkAuth, createInvoice);
module.exports = router;
