const { Op } = require("sequelize");
const productService = require("../services/productService");

class productController {
  // API
  // [GET] /products
  getProduct = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await productService.find({
      page: page,
      pageSize,
      //   where: {id}
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  // [POST] /products
  createProduct = async (req, res) => {
    const data = await productService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [PUT] /products/:id
  updateProduct = async (req, res) => {
    const id = req.params.id;
    const data = await productService.update({
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

  // [DELETE] /products/:id
  deleteProduct = async (req, res) => {
    const id = req.params.id;

    const data = await productService.delete({
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
  searchProduct = async (req, res) => {
    const query = req.query.q;

    const data = await productService.find({
      where: {
        // name: { [Op.substring]: query },

        [Op.or]: [
          { id: query },
          { categoryID: query },
          { name: { [Op.substring]: query } },
        ],
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };
  // [GET] /products/:id
  getProductById = async (req, res) => {
    const id = req.params.id;

    const data = await productService.find({
      where: {
        id,
      },
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };
}

module.exports = new productController();
