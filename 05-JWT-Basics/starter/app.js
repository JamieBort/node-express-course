require('dotenv').config();
require("express-async-errors"); // Errors thrown inside async route handlers and rejected promises inside routes or middleware are automatically forwarded to Express’s error handler.

const express = require("express");
const app = express();

const mainRouter = require("./routes/main");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1", mainRouter);

app.use(notFoundMiddleware); // middleware for routes
app.use(errorHandlerMiddleware); // middleware for routes

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		app.listen(port, () =>
			// eslint-disable-next-line no-console
			console.log(`Server is listening on port ${port}...`),
		);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
	}
};

start();
