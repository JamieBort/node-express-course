const express = require('express'); // Import the Express module
const app = express(); // Create an Express application instance
const port = 3000; // Define the port number
// const { products, people } = require("./data");
const peopleRouter = require("./routes/people");
const authentication = require('./routes/authentication');
const productsRouter = require("./routes/products");
const cookieParser = require('cookie-parser'); // Import cookie-parser

// Global Middleware (like parsers, logging, authentication, etc.) should be defined before routes to ensure they run for all requests.

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: false })); // For parsing form data
app.use(express.json()); // For parsing JSON data
app.use(cookieParser()); // Use cookie parser middleware

// Middleware for logging
const logger = (req, res, next) => {
  // console.log("start");
  // const all = req;
  const method = req.method;
  const url = req.url;
  const time = new Date();
  // console.log(all);
  console.log(method, url, time);
  // console.log("end");
  next();
}

// Middleware for using the peopleRouter
app.use("/api/v1/people", logger, peopleRouter);

// Middleware for using the productRouter
app.use("/api/v1/products", productsRouter);

// Middleware for using the authentication
app.use("/authenticate", authentication);

// We want this BEFORE any route handlers.
app.use(express.static("./public"));
// app.use(express.static("./methods-public"));

// Route handlers are usually defined after the middleware that they should be processed through.

// Define a route for the root URL (/)
// NOTE: logger() is invoked by inserting it into the route statement
app.get('/api/v1/test', logger, (req, res) => {
  // console.log('The /api/v1/test endpoint');
  //   res.send('Hello World from Express!'); // Send a response to the client
  const payload = { message: "It worked!" };
  console.log(payload)
  res.json(payload);
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


// Route to secret page
app.all('/secret', (req, res, next) => {
  console.log('The /secret endpoint');
  // Perform authentication, logging, or other shared logic here
  console.log('Accessing the secret section...');
  const payload = 'Hello the Secret page!';
  console.log(payload)
  res.send(payload); // Send a response to the client
  // next(); // Pass control to the next handler. NOT needed in this file.
});

// Error-handling middleware goes last, after all routes and other middleware.

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