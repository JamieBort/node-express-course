// ./controllers/products.js

const { json } = require("express"); // Is this used?
const { products } = require("./../data");

// Product Routes

// GET endpoint for products
const getProducts = (req, res) => {
  console.log('getProducts');
    res.json(products);
};

// Get one product by ID
const getOneProductByID = (req, res) => {
  console.log('getOneProductByID');
  const idToFind = parseInt(req.params.productID);
    const product = products.find((p) => p.id === idToFind);
     // If not found, return 404 JSON
    if (!product) {
        return res.status(404).json({ message: "That product was not found." });
    }
    res.json(product);
};

// Get one product by search
const getOneProductsBySearch = (req, res) => {
  console.log('getOneProductsBySearch');
  const { search, regex, limit, maxPrice } = req.query;

  let result = [...products];

  // 1. Handle "search" — names starting with provided letters
  if (search) {
    result = result.filter(product =>
      product.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  // 2. Handle "regex" — names matching a regular expression
  // Example call: /query?regex=^a.*e$
  if (regex) {
    console.log("Regex received:", regex);
    console.log("Products being tested:", products.map(p => p.name));

    try {
      const pattern = new RegExp(regex, "i"); // case-insensitive
      result = result.filter(product => pattern.test(product.name));
    } catch (err) {
      return res.status(400).json({ message: "Invalid regex pattern." });
    }
  }

  // 3. Filter by maxPrice — only products cheaper than given price
  // Example: /api/v1/query?maxPrice=20
  if (maxPrice) {
    const priceLimit = Number(maxPrice);
    result = result.filter(product => product.price <= priceLimit);
  }

  // 4. Apply limit — return ONLY the first N products
  if (limit) {
    result = result.slice(0, Number(limit));
  }

  console.log("Results:", result);

  res.json(result);
};

module.exports = { getProducts, getOneProductByID, getOneProductsBySearch };