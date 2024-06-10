const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");
const bill = require("../controllers/bill");

router.get("/search", orderController.searchOrder);
router.get("/", orderController.getOrder);
router.get("/:orderID/details", orderController.getOrderDetails);
router.post("/", orderController.createOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

// Thêm tuyến đường cho tạo đồng thời các bản ghi
router.post("/ok", bill.createOrderWithDetailsAndPayment);

module.exports = router;
