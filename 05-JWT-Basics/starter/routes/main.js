// Purpose: Defines the main API routes for authentication and protected resources.
// /login handles user login and JWT issuance, /dashboard is protected by authentication middleware.

const express = require("express"); // Import Express
const router = express.Router(); // Create a router instance

const { login, dashboard } = require("../controllers/main"); // Import controller functions

const authMiddleware = require("../middleware/auth"); // Import JWT authentication middleware

// Protected route: only accessible with valid JWT
router.route("/dashboard").get(authMiddleware, dashboard);

// Public route: user login
router.route("/login").post(login);

// Export the router to use in the main Express app
module.exports = router;
