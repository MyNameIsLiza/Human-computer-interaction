const express = require("express");
const router = express.Router();
const CreditController = require("../controllers/creditController.js");


router.post("/add", CreditController.addCredit);
router.post("/pay", CreditController.payCredit);
router.get("/", CreditController.getCredits);

module.exports = router;
