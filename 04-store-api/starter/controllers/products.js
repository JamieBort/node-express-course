// Defines the controller logic for product-related API routes.
// Purpose
//        Handle incoming HTTP requests, build MongoDB queries based on request parameters, retrieve product data using the Product model, and return formatted JSON responses.
//        Exposes controller functions for product endpoints
//        Uses query parameters to dynamically filter, sort, select, and paginate products
//        Demonstrates both a static/example query and a fully dynamic query
//        Keeps route handlers thin by centralizing business logic
// Sits between the routes layer and the database/model layer.

// Import Mongoose Product model
// Used to query the products collection in MongoDB
const Product = require("../models/product");

// A testing / demonstration controller used to experiment with Mongoose queries
const getAllProductsStatic = async (req, res) => {
	// throw new Error("testing async error");

	// res.status(200).json({ msg: "product testing route" });

	// const products = await Product.find({});
	// res.status(200).json({ products, nbHits: products.length });

	// const products = await Product.find({ name: "vase table" });
	// res.status(200).json({ products, nbHits: products.length });

	// const products = await Product.find({ featured: true });
	// res.status(200).json({ products, nbHits: products.length });

	const products = await Product.find({ price: { $gt: 30 } }) // hard-coded query
		.sort("price") // Sorts results by price (ascending)
		.select("name price"); // Returns only name and price
	res.status(200).json({ products, nbHits: products.length });
};

// The main production controller. Supports advanced querying via URL parameters.
const getAllProducts = async (req, res) => {
	// res.status(200).json({ msg: "products route" });
	const { featured, company, name, sort, fields, numericFilters } = req.query;

	// Dynamic query object to build upon. Populated conditionally based on request parameters.
	const queryObject = {};

	// Filter by featured. Converts string query param into a boolean
	if (featured) queryObject.featured = featured === "true" ? true : false;

	// Filter by company. Exact match filter.
	if (company) queryObject.company = company;

	// Filter by name (partial, case-insensitive). Uses MongoDB regex. Enables search-like behavior.
	if (name) queryObject.name = { $regex: name, $options: "i" };

	// Numeric filters (price, rating).
	if (numericFilters) {
		// Allows comparison operators in the query string. Maps them to MongoDB operators.
		const operatorMap = {
			">": "$gt",
			">=": "$gte",
			"=": "$eq",
			"<": "$lt",
			"<=": "$lte",
		};
		const regEx = /\b(<|>|>=|=|<|<=)\b/g;

		// Converts operators into MongoDB syntax.
		let filters = numericFilters.replace(
			regEx,
			(match) => `-${operatorMap[match]}-`,
		);
		// Allowed numeric fields (price, rating)
		const options = ["price", "rating"];
		// Splits multiple conditions.
		filters = filters.split(",").forEach((item) => {
			const [field, operator, value] = item.split("-");
			if (options.includes(field)) {
				// Adds them to queryObject.
				queryObject[field] = { [operator]: Number(value) };
			}
		});
		// eslint-disable-next-line no-console
		console.log(filters);
	}

	// Creates a Mongoose query instance.
	let result = Product.find(queryObject);
	// Multi-field sorting
	if (sort) {
		const sortList = sort.split(",").join(" ");
		result = result.sort(sortList);
	} else {
		result = result.sort("createdAt");
	}
	// Limits returned fields. Improves performance.
	if (fields) {
		const fieldsList = fields.split(",").join(" ");
		result = result.select(fieldsList);
	}
	// Prevents returning large result sets.
	const page = Number(req.query.page) || 1;
	// Limits returned fields. Improves performance.
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	result = result.skip(skip).limit(limit);

	// Executes the query
	const products = await result;
	// Sends back results and count
	res.status(200).json({ products, nbHits: products.length });
};

// Exported controllers. Makes controllers available to the routing layer
module.exports = {
	getAllProducts,
	getAllProductsStatic,
};
