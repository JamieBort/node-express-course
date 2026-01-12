// Defines the data model (schema) for products in your application.
// Purpose
//        to describe the shape, rules, and defaults for documents stored in the MongoDB products collection and to expose a reusable Product model for database operations.
//        Defines what a Product document looks like
//        Enforces validation and constraints at the database layer
//        Provides a Mongoose model used for CRUD operations
//        Acts as the single source of truth for product data structure

// Import Mongoose library. Assign it to the mongoose variable so the file can use it.
const mongoose = require("mongoose");

// Defines fields, types, validation rules, and default values. Mongoose uses this schema to validate data before saving to MongoDB
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "The product name must be provided."],
	},
	price: {
		type: Number,
		required: [true, "The product price must be provided."],
	},
	featured: {
		type: Boolean,
		default: false,
	},
	rating: {
		type: Number,
		default: 4.5,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	company: {
		type: String,
		// Restricts the field to a predefined list of values. Prevents invalid or unexpected company names. Custom error message shows the invalid value. Useful for consistent filtering and querying.
		enum: {
			values: ["ikea", "liddy", "caressa", "marcos"],
			message: "{VALUE} is not supported",
		},
	},
});

// Compiles the schema into a Mongoose model
// "Product" becomes the model name
// MongoDB collection will be named products (pluralized automatically)
// Used throughout the app to interact with product data
module.exports = mongoose.model("Product", productSchema);
