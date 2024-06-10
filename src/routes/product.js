const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

router.get("/search", ProductController.searchProduct);
router.get("/", ProductController.getProduct);
router.get("/products/:id", ProductController.getProductById);
router.post("/", ProductController.createProduct);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
