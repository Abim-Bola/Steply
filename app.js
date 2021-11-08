/* eslint-disable arrow-body-style */
import express from "express"
import config from "config"
import cors from "cors"
import configObject from "./src/utils/environment.js"

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.get("/", async (req, res) => {
	return res.json({ message: "Hello King, I love you." })
})

// let configDetails
// if (process.env.NODE_ENV === "development") {
// 	const { dbConfig } = config.get("production")
// 	console.log("🚀 ~ file: app.js ~ line 18 ~ dbConfig", dbConfig)
// }

console.log(configObject.host)

const port = process.env.PORT || 3000
const server = app.listen(port, () =>
	console.log(`Listening on port ${port}...`)
)

export default app
