class Response {
	static send(res, data, statusCode = 200, message = "OK") {
		res.status(statusCode).json({ data, message })
	}
}

export default Response