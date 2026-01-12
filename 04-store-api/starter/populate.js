// This file is a one-off database seeding script. Its purpose is to reset and repopulate the products collection in MongoDB using data from a local JSON file.
// Used to dynamically populate data in the `products` collection of the database.
// It is not part of the main application runtime (API/server); it’s meant to be run manually (e.g., node populate.js) during development, testing, or initial setup.
// To that end, run "node populate.js in the root directory of Terminal."

require("dotenv").config(); // Loads environment variables (MongoDB connection string)

// Import dependencies
const connectDB = require("./db/connect"); // establishes a MongoDB connection
const Product = require("./models/product"); // Mongoose model for the products collection
const jsonProducts = require("./products.json"); // static seed data (array of product objects)

// Define seed function.
// Wrapped in an async function so await can be used. Keeps database logic isolated and easy to run.
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI); // Opens a database connection. Script cannot proceed without a successful connection.

		// eslint-disable-next-line no-console
		console.log("*** SUCCESS - Connected to database. ***");

		await Product.deleteMany(); // Deletes all documents in the products collection. Prevents duplicates and ensures consistent data. ⚠️ (Intentional) Destructive operation

		// eslint-disable-next-line no-console
		console.log("Deleted contents of the collection.");

		await Product.create(jsonProducts); // Bulk-inserts all products from products.json. Uses the schema validation defined in Product.

		// eslint-disable-next-line no-console
		console.log("Populated products collection from the ./products.json file.");

		// Exit the process explicitly
		process.exit(0); // Ends the Node.js process after success. Prevents the script from hanging due to open DB connections. Exit code 0 = success
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		process.exit(1);
	}
};

start();
