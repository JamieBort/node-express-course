const { CustomAPIError } = require("../errors"); // *** I midified this. ***
const { StatusCodes } = require("http-status-codes"); // *** I added this. ***
const errorHandlerMiddleware = (err, req, res) => {
	if (err instanceof CustomAPIError) {
		return res.status(err.statusCode).json({ msg: err.message });
	}
	// *** I midified this. ***
	return res
		.status(StatusCodes.INTERNAL_SERVER_ERROR)
		.send("Something went wrong try again later");
};

module.exports = errorHandlerMiddleware;
