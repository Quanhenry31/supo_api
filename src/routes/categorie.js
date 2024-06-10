const express = require("express");
const router = express.Router();
const categorieController = require("../controllers/CategorieController");

router.get("/", categorieController.getCategorie);
router.post("/", categorieController.createCategorie);
router.put("/:id", categorieController.updateCategorie);
router.delete("/:id", categorieController.deleteCategorie);

module.exports = router;
