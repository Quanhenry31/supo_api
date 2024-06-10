const express = require("express");
const router = express.Router();
const orderDetailController = require("../controllers/OrderDetailController");

router.get("/search", orderDetailController.searchOrderDetail);
router.get("/", orderDetailController.getOrderDetail);
router.post("/", orderDetailController.createOrderDetail);
router.put("/:id", orderDetailController.updateOrderDetail);
router.delete("/:id", orderDetailController.deleteOrderDetail);

module.exports = router;
