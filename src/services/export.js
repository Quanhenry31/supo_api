const { Order, OrderDetail, User, Payment, Product } = require("../models");

class OrderService {
  async getOrderDetails(orderID) {
    try {
      const order = await Order.findAll({ where: { id: orderID } });

      if (!order) {
        return null;
      }

      const orderDetail = await OrderDetail.findAll({
        where: { orderID: order[0].id },
      });
      const user = await User.findOne({ where: { id: order[0].userID } });

      const payment = await Payment.findOne({
        where: { orderID: order[0].id },
      });
      const productPromises = orderDetail.map(async (orderItem) => {
        const product = await Product.findOne({
          where: { id: orderItem.productID },
        });
        return product;
      });

      // Promise.all(productLists).then((products) => {
      //   console.log(products);
      // });
      const products = await Promise.all(productPromises);

      // console.log(orderDetail, user, payment, products);
      return { order, orderDetail, user, payment, products };
    } catch (error) {
      throw new Error("Error while fetching order details: " + error.message);
    }
  }
}

module.exports = new OrderService();
