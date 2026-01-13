// Purpose: Defines a custom Unauthenticated error class representing HTTP 401 errors.
// Used to signal that a request requires valid authentication (e.g., missing or invalid JWT).

const CustomAPIError = require("./custom-error"); // Base custom error class
const { StatusCodes } = require("http-status-codes"); // HTTP status code constants

// Define UnauthenticatedError class that extends the base CustomAPIError
class UnauthenticatedError extends CustomAPIError {
	constructor(message) {
		super(message); // Call parent constructor and set error message
		this.statusCode = StatusCodes.UNAUTHORIZED; // Assign HTTP status code 401
	}
}

// Export the UnauthenticatedError class for use throughout the application
module.exports = UnauthenticatedError;
