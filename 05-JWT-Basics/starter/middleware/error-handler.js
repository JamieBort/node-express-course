// Purpose: Centralized error-handling middleware for Express.
// Sends proper JSON responses for custom API errors and a generic
// 500 response for unhandled errors.

const { CustomAPIError } = require("../errors"); // Base class for application-specific errors // *** I midified this. ***
const { StatusCodes } = require("http-status-codes"); // HTTP status code constants // *** I added this. ***

// Express error-handling middleware
const errorHandlerMiddleware = (err, req, res) => {
	// If the error is a custom API error, send its status code and message
	if (err instanceof CustomAPIError) {
		return res.status(err.statusCode).json({ msg: err.message });
	}

	// For all other errors, send a generic 500 Internal Server Error response // *** I midified this. ***
	return res
		.status(StatusCodes.INTERNAL_SERVER_ERROR)
		.send("Something went wrong try again later");
};

// Export the middleware to use in the Express app
module.exports = errorHandlerMiddleware;
