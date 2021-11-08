import config from "config"
import dotenv from "dotenv"
dotenv.config()

const configObject = {}

if (process.env.NODE_ENV === "development") {
	console.log("Loading development environment variables")
	const {
		dbConfig: { host, port },
	} = config.get("development")
	configObject.host = host
	configObject.port = port
}

export default configObject
