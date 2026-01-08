// Used to dynamically populate data in the `products` collection of the database.
// To that end, run "node populate.js in the root directory of Terminal."

require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");
const jsonProducts = require("./products.json");

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		// eslint-disable-next-line no-console
		console.log("*** SUCCESS - Connected to database. ***");
		await Product.deleteMany();
		// eslint-disable-next-line no-console
		console.log("Deleted contents of the collection.");
		await Product.create(jsonProducts);
		// eslint-disable-next-line no-console
		console.log("Populated products collection from the ./products.json file.");
		process.exit(0);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		process.exit(1);
	}
};

start();
