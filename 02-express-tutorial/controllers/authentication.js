// ./controllers/authentication.js

// Authentication Routes

// POST /logon — Sets the 'name' cookie and responds with a greeting
const logonUser = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  res.cookie("name", name); // Set 'name' cookie
  res.status(201).json({ message: `Hello, ${name}! You are logged in.` });
  };

// DELETE /logoff — Clears the 'name' cookie and logs out the user
const logoffUser = (req, res) => {
  res.clearCookie("name"); // Clear the cookie
  res.status(200).json({ message: "You are now logged off." });
};

// GET /test — Uses auth middleware to check if user is logged in
const testUser = (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user}!` });
};

module.exports = { logonUser, logoffUser, testUser };