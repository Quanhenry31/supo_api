const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/PaymentController");
const { route } = require("./user");

router.get("/search", paymentController.searchPayment);
router.get("/", paymentController.getPayment);
router.post("/", paymentController.createPayment);
router.put("/:id", paymentController.updatePayment);
router.delete("/:id", paymentController.deletePayment);

module.exports = router;
