// orderService.js

const { Order, OrderDetail, Payment } = require("../models");

class BillService {
  async createOrderWithDetailsAndPayment(
    orderData,
    orderDetailData,
    paymentData
  ) {
    try {
      // Tạo đơn hàng
      const createdOrder = await Order.create(orderData);

      // Tạo chi tiết đơn hàng
      for (const detail of orderDetailData) {
        detail.orderID = createdOrder.id; // Gán ID của đơn hàng vừa tạo
        await OrderDetail.create(detail);
      }

      // Tạo thanh toán
      paymentData.orderID = createdOrder.id; // Gán ID của đơn hàng vừa tạo
      await Payment.create(paymentData);

      return {
        success: true,
        message: "Order, order detail, and payment created successfully.",
      };
    } catch (error) {
      console.error("Error creating order with details and payment:", error);
      return {
        success: false,
        message: "Failed to create order with details and payment.",
      };
    }
  }

  // Thêm các phương thức khác cần thiết
}

module.exports = new BillService();
