/* eslint-disable arrow-body-style */
import express from "express"
import routes from "@startup/routes"
import cors from "cors"
import db from "@startup/db"
import userServices from "@routes/user"
// eslint-disable-next-line import/extensions

const app = express()
db()

app.use(express.urlencoded({ extended: false }))
app.use(cors())


app.get("/", async (req, res) => {
	return res.json({ message: "Hello King, I love you." })
})

routes(app);

app.use((err, req, res, next) => {
	return res.status(500).json({
		status: "error",
    message: err.message,
    stack: err.stack
	})
})

const port = process.env.PORT || 6000
app.listen(port, () => console.log(`Listening on port ${port}...`))

export default app


