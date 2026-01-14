// Purpose: Protects routes by verifying JWTs in the Authorization header.
// Adds authenticated user information to req.user or throws an UnauthenticatedError
// if no valid token is provided.

const jwt = require("jsonwebtoken"); // Library for creating and verifying JWTs
const { UnauthenticatedError } = require("../errors"); // Custom error for 401 Unauthorized

// Middleware function to authenticate requests
const authenticationMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization; // Get the Authorization header

	// Check if header exists and starts with "Bearer "
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new UnauthenticatedError("No token provided"); // Throw error if missing
	}

	const token = authHeader.split(" ")[1]; // Extract the token from the header
	// eslint-disable-next-line no-console
	console.log(token);

	// Verify token is valid.
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const { id, username } = decoded; // Extract payload
		req.user = { id, username }; // Attach user info to request
		next(); // Proceed to next middleware/route handler
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error); // Log error for debugging
		throw new UnauthenticatedError("Not authorized to access this route"); // Throw error if the token is invalid
	}
};

// Export the middleware to use in protected routes
module.exports = authenticationMiddleware;
