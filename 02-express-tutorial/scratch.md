Thanks for sharing the details! Based on what you've provided, we can break this down and integrate the required functionality. Here's how we can approach it step-by-step:

### 1. **Add the `auth` middleware**

You’ll want to create a new middleware function that checks for the `name` cookie, sets `req.user`, and handles the `401 Unauthorized` response when the cookie is missing.

Since you don't have a `middleware.js` file, you can either define it directly in your `app.js` or create a new file for it. I'll show you how to add it to your `app.js`.

```javascript
// Middleware to check for authentication (name cookie)
const auth = (req, res, next) => {
  const userName = req.cookies.name; // Read 'name' cookie
  if (userName) {
    req.user = userName; // Set user object
    return next(); // Proceed to the next middleware/route
  }
  res.status(401).json({ message: "Unauthorized" }); // If no cookie, reject
};
```

Don't forget to **import `cookie-parser`** if you haven't already, since you'll need it to read the cookies:

```bash
npm install cookie-parser
```

Then, in `app.js`:

```javascript
const cookieParser = require('cookie-parser'); // Import cookie-parser
app.use(cookieParser()); // Use cookie parser middleware
```

### 2. **Create the `/logon`, `/logoff`, and `/test` routes**

These routes will be added to your `app.js` file, just like the existing routes. Here's how to handle them:

```javascript
// POST /logon — Sets the 'name' cookie and responds with a greeting
app.post("/logon", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  res.cookie("name", name); // Set 'name' cookie
  res.status(201).json({ message: `Hello, ${name}! You are logged in.` });
});

// DELETE /logoff — Clears the 'name' cookie and logs out the user
app.delete("/logoff", (req, res) => {
  res.clearCookie("name"); // Clear the cookie
  res.status(200).json({ message: "You are now logged off." });
});

// GET /test — Uses auth middleware to check if user is logged in
app.get("/test", auth, (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user}!` });
});
```

### 3. **Complete Integration in `app.js`**

Now you can integrate everything into your `app.js`. I’ll summarize how it will look:

1. Add **cookie-parser** to handle cookies.
2. Define the **auth middleware** to check the cookies.
3. Add the **logon**, **logoff**, and **test** routes.

Here’s the complete `app.js` with everything included:

```javascript
const express = require('express');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const app = express();
const port = 3000;

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware

// Middleware to check for authentication (name cookie)
const auth = (req, res, next) => {
  const userName = req.cookies.name;
  if (userName) {
    req.user = userName; // Set user object
    return next(); // Proceed to the next middleware/route
  }
  res.status(401).json({ message: "Unauthorized" }); // If no cookie, reject
};

// Route for logging in (sets the name cookie)
app.post("/logon", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  res.cookie("name", name); // Set 'name' cookie
  res.status(201).json({ message: `Hello, ${name}! You are logged in.` });
});

// Route for logging off (clears the name cookie)
app.delete("/logoff", (req, res) => {
  res.clearCookie("name"); // Clear the cookie
  res.status(200).json({ message: "You are now logged off." });
});

// Route to test if the user is logged in (protected by auth middleware)
app.get("/test", auth, (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user}!` });
});

// You can place your existing routes here, for example:
// const peopleRouter = require("./routes/people");
// app.use("/api/v1/people", peopleRouter);

// Error-handling middleware goes last, after all routes and other middleware.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', details: err.message || 'Something went wrong, please try again later.' });
});

// Start the server
app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
```

### 4. **Testing with Postman**

You can now test the following:

1. **POST `/logon`** with a JSON body: `{ "name": "yourName" }`. This should set a cookie and return a 201 response with a greeting.
2. **DELETE `/logoff`** to clear the cookie and log out. You should get a 200 status and a log-off message.
3. **GET `/test`** to check if the user is logged in. If the `name` cookie is set, you'll get a 200 response with a message saying "Welcome, yourName!". If no cookie is set, you'll get a 401 response with "Unauthorized".

Let me know if you need further adjustments or explanations!
