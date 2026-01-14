// This file is NOT used in this app (./05-JWT-Basics/).
// The author chose to add it here as a placeholder for the next app (./06-jobs-api/)

const mongoose = require("mongoose");

const connectDB = (url) => {
	return mongoose.connect(url, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	});
};

module.exports = connectDB;
