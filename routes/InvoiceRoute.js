const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middlewares/checkAuth");

router.route("/all").get(checkAuth, require("../controllers/Invoice").getAll);
router
  .route("/create")
  .post(checkAuth, require("../controllers/Invoice").createInvoice);
module.exports = router;
