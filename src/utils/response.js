class Response {
	static send(res, data, statusCode = 200, message = "OK") {
		res.status(statusCode).json({ data, message })
	}

	static sendError(
		res,
		error,
		statusCode = 500,
		message = "Internal Server Error"
	) {
		res.status(statusCode).json({ error, message })
	}
}

export default Response
