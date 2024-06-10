const categorieService = require("../services/categorie");

class CategorieController {
  // API
  // [GET] /Categories
  getCategorie = async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const data = await categorieService.find({
      //   where: {id}
    });

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  };

  // [POST] /Categories
  createCategorie = async (req, res) => {
    const data = await categorieService.create(req.body);

    if (data.code === -1) {
      return res.status(500).json(data);
    }

    res.json(data);
  };

  // [PUT] /Categories/:id
  updateCategorie = async (req, res) => {
    const id = req.params.id;
    const data = await categorieService.update({
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

  // [DELETE] /Categories/:id
  deleteCategorie = async (req, res) => {
    const id = req.params.id;

    const data = await categorieService.delete({
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

module.exports = new CategorieController();
