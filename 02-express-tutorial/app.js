console.log('Express Tutorial')

const express = require('express'); // Import the Express module
const app = express(); // Create an Express application instance
const port = 3000; // Define the port number
const { products } = require("./data");

app.use(express.static("./public"));

// Define a route for the root URL (/)
app.get('/api/v1/test', (req, res) => {
//   res.send('Hello World from Express!'); // Send a response to the client
  const payload = { message: "It worked!" };
  console.log(payload)
  res.json(payload);
});

app.get('/api/v1/products',(req, res) => {
    res.json(products);
});

app.get('/api/v1/product/:productID',(req, res) => {
    const idToFind = parseInt(req.params.productID); 
    const product = products.find((p) => p.id === idToFind);
     // If not found, return 404 JSON
    if (!product) {
        return res.status(404).json({ message: "That product was not found." });
    }
    res.json(product);
});

app.get("/api/v1/query", (req, res) => {
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







// app.get("/api/v1/query", (req, res) => {
//   const { search, limit } = req.query;

//   let sortedProducts = [...products];

//   // If search was provided, filter by product name starting with that string
//   if (search) {
//     sortedProducts = sortedProducts.filter(product => {
//       return product.name.toLowerCase().startsWith(search.toLowerCase());
//     });
//   }

//   // If limit was provided, convert it to a number and slice the array
//   if (limit) {
//     sortedProducts = sortedProducts.slice(0, Number(limit));
//   }

//   res.json(sortedProducts);
// });


app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section...');
  // Perform authentication, logging, or other shared logic here
    const payload = 'Hello the Secret page!';
    console.log(payload)
    res.send(payload); // Send a response to the client
  next(); // Pass control to the next handler
});

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});