import HttpStatus from "http-status-codes";
const BasicResponse = {
	success: false,
	status_code: 400,
	message: "",
  };

class Response {
	static onSuccess(res, data, statusCode = 200, message = "OK") {
		res.status(statusCode).json({ data, message })
	}


	static getResponseHandler(res) {

		return {
		  onSuccess(data, message, code, links) {
			return Response.respondWithSuccess(res, code, data, message, links);
		  },
		  onError(error) {
          const {name, status, message} = error;
			return Response.respondWithError({res, errorName: name, errorCode: status,  message, data: error});
		  },
		};
	  }


	  static respondWithSuccess(
		res,
		code = 200,
		data = {},
		message = "success",
		links = []
	  ) {
		const response = { ...BasicResponse };
		response.success = true;
		response.message = message;
		response.data = data;
		response.links = links;
		response.status_code = code;
		return res.status(code).json(response);
	  }

	  static respondWithError(
		{res,
		errorName,
		errorCode = HttpStatus.INTERNAL_SERVER_ERROR,
		message = "Unknown error",
		data = {}}
	  ) {
		const response = { ...BasicResponse };
		response.success = false;
		response.name = errorName;
		response.message = message;
		response.status_code = errorCode;
		return res.status(errorCode).json(response);
	  }
}

export default Response