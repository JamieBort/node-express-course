// This file handles authentication logic using JSON Web Tokens (JWT)

// Purpose: Handles authentication and protected routes using JSON Web Tokens (JWT).
// Provides a login controller that validates credentials and issues tokens, and a
// dashboard controller that returns data only to authenticated users with a valid JWT.

// Import the jsonwebtoken library for creating and verifying JWTs
const jwt = require("jsonwebtoken");
// Import the custom BadRequestError class for validation errors
const { BadRequestError } = require("../errors");

// Controller function for handling user login
const login = async (req, res) => {
	// Destructure username and password from the request body
	const { username, password } = req.body;

	// If either username or password is missing, throw a validation error
	if (!username || !password) {
		throw new BadRequestError("Please provide username and password");
	}

	// DEMO ONLY: Generate a fake user ID using the current day of the month
	// In a real application, this ID would come from the database
	const id = new Date().getDate();

	// Create a JWT token with a small payload (id and username)
	const token = jwt.sign(
		{ id, username }, // Payload data stored inside the token
		process.env.JWT_SECRET, // process.env.JWT_SECRET is the secret key used to sign the token. Secret key used to sign the token
		{
			expiresIn: "30d", // expiresIn defines how long the token remains valid. Token expiration time
		},
	);

	// Send a success response with the generated JWT token
	res.status(200).json({ msg: "user created", token });
};

// Controller function for a protected dashboard route
const dashboard = async (req, res) => {
	// Generate a random number between 0 and 99
	const luckyNumber = Math.floor(Math.random() * 100);

	// Send a response with user-specific and protected data
	// req.user is added by authentication middleware after verifying the JWT
	res.status(200).json({
		msg: `Hello, ${req.user.username}`, // Personalized greeting using authenticated user data
		secret: `Here is your authorized data, your lucky number is ${luckyNumber}`, // Protected information
	});
};

// Export the controller functions so they can be used in routes
module.exports = {
	login,
	dashboard,
};
