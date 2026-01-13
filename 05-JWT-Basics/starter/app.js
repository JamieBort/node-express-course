require("dotenv").config(); // Loads environment variables from a .env file into process.env
require("express-async-errors"); // Allows errors thrown in async routes to be handled by Express error middleware

const express = require("express"); // Imports the Express framework
const app = express(); // Creates an Express application instance

const mainRouter = require("./routes/main"); // Imports the main API routes
const notFoundMiddleware = require("./middleware/not-found"); // Imports middleware for handling unknown routes
const errorHandlerMiddleware = require("./middleware/error-handler"); // Imports centralized error-handling middleware

// middleware
app.use(express.static("./public")); // Serves static files (HTML, CSS, JS, images) from the public folder
app.use(express.json()); // Parses incoming JSON request bodies and makes them available on req.body

app.use("/api/v1", mainRouter); // Mounts the main router under the /api/v1 base path

app.use(notFoundMiddleware); // Handles requests to routes that do not exist
app.use(errorHandlerMiddleware); // Handles all errors passed through next() or thrown in routes

const port = process.env.PORT || 3000; // Uses the PORT from environment variables or defaults to 3000

const start = async () => {
	// Defines an async function to start the server
	try {
		app.listen(
			port,
			() =>
				// Starts the server and listens on the specified port
				// eslint-disable-next-line no-console
				console.log(`Server is listening on port ${port}...`), // Logs a message when the server starts successfully
		);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error); // Logs any error that occurs while starting the server
	}
};

start(); // Calls the start function to launch the server
