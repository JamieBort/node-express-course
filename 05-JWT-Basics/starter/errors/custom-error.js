// Purpose: Provides a base custom error class that all application-specific
// API errors extend, allowing shared behavior and consistent error handling.

// Define a base custom error class for application-specific errors
class CustomAPIError extends Error {
	// Constructor runs when a new custom error is created
	constructor(message) {
		super(message); // Calls the built-in Error class constructor and sets the error message
	}
}

// Export the CustomAPIError class so other error classes can extend it
module.exports = CustomAPIError;
