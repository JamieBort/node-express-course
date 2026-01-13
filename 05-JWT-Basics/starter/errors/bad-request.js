// Purpose: Defines a custom BadRequest error class that represents HTTP 400 errors
// and standardizes how client-side validation failures are handled across the API.

// Import the base custom error class that all API errors extend
const CustomAPIError = require("./custom-error");

// Import HTTP status code constants (e.g., 400, 401, 404)
const { StatusCodes } = require("http-status-codes");

// Define a BadRequest error class that extends the base CustomAPIError
class BadRequest extends CustomAPIError {
	// Constructor runs when a new BadRequest error is created
	constructor(message) {
		super(message); // Calls the parent class constructor and sets the error message
		this.statusCode = StatusCodes.BAD_REQUEST; // Assigns HTTP status code 400 to this error
	}
}

// Export the BadRequest class so it can be used throughout the application
module.exports = BadRequest;
