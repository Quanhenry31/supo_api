const { Op } = require("sequelize");
const orderDetailService = require("../services/orderDetail");

class UserController {
  // API
  // [GET] /users
  getOrderDetail = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await orderDetailService.find({
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
  createOrderDetail = async (req, res) => {
    const data = await orderDetailService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [PUT] /users/:id
  updateOrderDetail = async (req, res) => {
    const id = req.params.id;
    const data = await orderDetailService.update({
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
  deleteOrderDetail = async (req, res) => {
    const id = req.params.id;

    const data = await orderDetailService.delete({
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [GET] /OrderDetaill/search?q=?
  searchOrderDetail = async (req, res) => {
    const query = req.query.q;

    const data = await orderDetailService.find({
      where: {
        orderID: { [Op.substring]: query },
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };
}

module.exports = new UserController();
