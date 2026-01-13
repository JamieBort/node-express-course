require("dotenv").config();
require("express-async-errors"); // Errors thrown inside async route handlers and rejected promises inside routes or middleware are automatically forwarded to Express’s error handler.

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());

// routes

app.get("/", (req, res) => {
	res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

// products route

app.use("/api/v1/products", productsRouter);

app.use(notFoundMiddleware); // middleware for routes
app.use(errorMiddleware); // middleware for routes

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		// connectDB
		await connectDB(process.env.MONGO_URI);
		// eslint-disable-next-line no-console
		app.listen(port, () => console.log(`Server is listening port ${port}...`));
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
	}
};

start();
