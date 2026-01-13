// This file acts as a central "barrel" for all custom error classes.
// It allows other parts of the application to import multiple errors
// from a single location instead of requiring each file individually.

const CustomAPIError = require("./custom-error"); // Base custom error class
const BadRequestError = require("./bad-request"); // Error for HTTP 400 Bad Request
const UnauthenticatedError = require("./unauthenticated"); // Error for HTTP 401 Unauthorized

// Export all error classes together for cleaner imports
module.exports = {
	CustomAPIError,
	BadRequestError,
	UnauthenticatedError,
};
