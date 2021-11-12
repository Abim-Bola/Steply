/* eslint-disable no-const-assign */
import userServices from "@services/user"
import { sanitize } from "@utils/sanitize"
import { StatusCodes } from "http-status-codes"
import Response from "@utils/response"

export const authenticationController = {
	signup: async (req, res, next) => {
		try {
			let { firstName, lastName, password, email, companyName, jobTitle } =
				req.body
			email = email.toLowerCase()
			firstName = firstName.toLowerCase()
			lastName = lastName.toLowerCase()
			const findUser = await userServices.findUser(email)
			if (findUser) {
				return Response.send(
					res,
					null,
					StatusCodes.CONFLICT,
					"User already exists"
				)
			}
			const saveUser = await userServices.saveUser({
				firstName,
				password,
				lastName,
				email,
				companyName,
				jobTitle,
			})
			res.status(StatusCodes.CREATED).json({
				status: true,
				message:
					"Signup Successful, Please check your email for a link to verify your account",
				data: sanitize(saveUser),
			})
		} catch (error) {
			next(error)
		}
	},
	login: async (req, res, next) => {
		try {
			const { email, password } = req.body
			const findUser = await userServices.findUser(email)
			// eslint-disable-next-line no-mixed-operators
			if (!findUser || (findUser && findUser.verified === false)) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ status: true, message: "User does not exist" })
			}
		} catch (error) {
			next(error)
		}
	},
}
