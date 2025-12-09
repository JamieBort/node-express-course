// ./routes/authentication.js

const express = require("express");
const app = express(); // Create an Express application instance
const { logonUser, logoffUser, testUser } = require('./../controllers/authentication');

// Middleware to check for authentication (name cookie)
const auth = (req, res, next) => {
const userName = req.cookies.name; // Read 'name' cookie
if (userName) {
  req.user = userName; // Set user object
  return next(); // Proceed to the next middleware/route
}
res.status(401).json({ message: "Unauthorized" }); // If no cookie, reject
};


// Authentication Routes

// POST /logon — Sets the 'name' cookie and responds with a greeting
app.post("/logon", logonUser);

// DELETE /logoff — Clears the 'name' cookie and logs out the user
app.delete("/logoff", logoffUser);

// GET /test — Uses auth middleware to check if user is logged in
app.get("/test", auth,testUser);

module.exports = app