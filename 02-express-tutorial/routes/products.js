// ./routes/products.js

const express = require("express");
const router = express.Router();
// const { products } = require("./../data");
// const { addPerson, getPeople, getPerson, deletePerson } = require("./../controllers/people");
const { getProducts, getOneProductByID, getOneProductsBySearch } = require('./../controllers/products');

// // GET endpoint for people
// router.get('/',getPeople);

// router.get('/:personID', getPerson);

// // POST endpoint for adding a new person
// router.post('/',addPerson);

// router.delete('/:personID', deletePerson);

// // Product Routes

// GET endpoint for products
router.get('/', getProducts);

// Get one product by search
router.get("/query", getOneProductsBySearch);

// Get one product by ID
router.get('/:productID', getOneProductByID);

module.exports = router