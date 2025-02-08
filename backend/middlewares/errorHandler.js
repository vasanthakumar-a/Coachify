const { errorConstants } = require('../utils/constants');
const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode ? res.statusCode : 500;

	switch(statusCode) {
	case errorConstants.VALIDATION_ERROR:
		res.json({title: "Validation failed", message: err.message, stackTrace: err.stack})
		break;
	case errorConstants.NOT_FOUND:
		res.json({title: "Not Found", message: err.message, stackTrace: err.stack})
		break;
	case errorConstants.UNAUTHORIZED:
		res.json({title: "unauthorized", message: err.message, stackTrace: err.stack})
		break;
	case errorConstants.FORBIDDEN:
		res.json({title: "Forbidden", message: err.message, stackTrace: err.stack})
		break;
	case errorConstants.SERVER_ERROR:
		res.json({title: "Server Error", message: err.message, stackTrace: err.stack})
		break;
	default:
		console.log("No Error, All good !");
		break;
	}	
}

module.exports = errorHandler;