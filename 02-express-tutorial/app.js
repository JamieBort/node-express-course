const express = require('express'); // Import the Express module
const app = express(); // Create an Express application instance
const port = 3000; // Define the port number
const { products } = require("./data");

// We want this BEFORE any route handlers.
app.use(express.static("./public"));

// Define a route for the root URL (/)
app.get('/api/v1/test', (req, res) => {
  console.log('The /api/v1/test endpoint');
//   res.send('Hello World from Express!'); // Send a response to the client
  const payload = { message: "It worked!" };
  console.log(payload)
  res.json(payload);
});

app.get('/api/v1/products',(req, res) => {
  console.log('The /api/v1/products endpoint');
    res.json(products);
});

// Trigger an error
app.get('/api/v1/productx', (req, res, next) => {
  console.log('The /api/v1/productx endpoint');
  try {
    // Simulate some logic that may throw an error
    const error = new Error('Database connection failed');
    throw error; // Throw an error
  } catch (err) {
    next(err); // Pass the error to the error-handling middleware
  }
});


app.get('/api/v1/product/:productID',(req, res) => {
  console.log('The /api/v1/product/:productID endpoint');
    const idToFind = parseInt(req.params.productID); 
    const product = products.find((p) => p.id === idToFind);
     // If not found, return 404 JSON
    if (!product) {
        return res.status(404).json({ message: "That product was not found." });
    }
    res.json(product);
});

app.get("/api/v1/query", (req, res) => {
  console.log('The /api/v1/query endpoint');
  const { search, regex, limit, maxPrice } = req.query;

  let result = [...products];

  // 1. Handle "search" — names starting with provided letters
  if (search) {
    result = result.filter(product =>
      product.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  // 2. Handle "regex" — names matching a regular expression
  // Example call: /api/v1/query?regex=^a.*e$
  if (regex) {
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

  res.json(result);
});

app.all('/secret', (req, res, next) => {
  console.log('The /secret endpoint');
  // Perform authentication, logging, or other shared logic here
  console.log('Accessing the secret section...');
    const payload = 'Hello the Secret page!';
    console.log(payload)
    res.send(payload); // Send a response to the client
  // next(); // Pass control to the next handler. NOT needed in this file.
});

// Your normal routes and middleware go here...

// Error-handling middleware should be defined after all your routes
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack to the console for debugging

  // If the error is an instance of a custom error class or contains specific properties, handle accordingly
  if (err.isCustomError) {
    return res.status(err.statusCode || 500).json({
      message: err.message || 'Something went wrong!',
      details: err.details || 'No additional details provided.'
    });
  }

  // Default error response for unhandled errors
  res.status(500).json({
    message: 'Internal Server Error',
    details: err.message || 'Something went wrong, please try again later.'
  });
});

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});