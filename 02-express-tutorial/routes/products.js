// ./routes/products.js

const express = require("express");
const router = express.Router();
const { getProducts, getOneProductByID, getOneProductsBySearch } = require('./../controllers/products');

// GET endpoint for products
router.get('/', getProducts);

// Get one product by search
router.get("/query", getOneProductsBySearch);

// Get one product by ID
router.get('/:productID', getOneProductByID);

module.exports = router