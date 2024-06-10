const { Op } = require("sequelize");
const orderService = require("../services/order");

const Exports = require("../services/export");

class OrderController {
  // API
  // [GET] /users
  getOrder = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await orderService.find({
      page: page,
      pageSize,
      //   where: {id}
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  // [POST] /users
  createOrder = async (req, res) => {
    const data = await orderService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [PUT] /users/:id
  updateOrder = async (req, res) => {
    const id = req.params.id;
    const data = await orderService.update({
      data: {
        ...req.body,
      },
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [DELETE] /users/:id
  deleteOrder = async (req, res) => {
    const id = req.params.id;

    const data = await orderService.delete({
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };
  // [GET] /orders/search?query=?
  searchOrder = async (req, res) => {
    const query = req.query.q;

    const data = await orderService.find({
      where: {
        [Op.or]: [
          { id: query },
          { userID: query },
          { status: { [Op.substring]: query } },
        ],
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };
  // [GET] /orders/:orderID/details
  getOrderDetails = async (req, res) => {
    const orderID = req.params.orderID;

    try {
      const orderDetails = await Exports.getOrderDetails(orderID);

      if (!orderDetails) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.status(200).json(orderDetails);
    } catch (error) {
      console.error("Error while fetching order details:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}

module.exports = new OrderController();
