const { Op } = require("sequelize");
const paymentService = require("../services/payment");

class PaymentController {
  // API
  // [GET] /users
  getPayment = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await paymentService.find({
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
  createPayment = async (req, res) => {
    const data = await paymentService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [PUT] /users/:id
  updatePayment = async (req, res) => {
    const id = req.params.id;
    const data = await paymentService.update({
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
  deletePayment = async (req, res) => {
    const id = req.params.id;

    const data = await paymentService.delete({
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [GET] /products/search?query=?
  searchPayment = async (req, res) => {
    const query = req.query.q;

    const data = await paymentService.find({
      where: {
        [Op.or]: [{ OrderId: query }, { name: { [Op.substring]: query } }],
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };
}

module.exports = new PaymentController();
