import BaseRepository from "infra/repositories/BaseRepository"
import { sanitize } from "helpers/sanitize"
import passwordService from "helpers/password"
import ConflictError from "interfaces/errors/ConflictError"
import HttpStatus from "http-status-codes";
import ResourceNotFoundError from "interfaces/errors/ResourceNotFoundError"
import Password from "helpers/password";
import JWT from "helpers/jwt";
import InvalidPayloadError from "interfaces/errors/InvalidPayloadError"
import User from "infra/database/models/user"

class UserRepository extends BaseRepository {
  constructor({ User }) {
    super({ Model: User })
    this.User = User
  }

  async signup(payload) {
    const findUser = await this.find({ email: payload.email }, { email: 1 }, { lean: true })
    if (findUser) {
      return new ConflictError("User already exists")
    }
    const passwordStrength = await passwordService.passwordStrengthChecker(payload.password, payload.first_name)
    if (passwordStrength.score < 3) {
      return new InvalidPayloadError("Weak Password")
    }
    const saveUser = await this.create({
      ...payload,
    })
    // saveUser.testing()
    return sanitize(saveUser)
  }

  async login(payload) {
    try {
      const { password } = payload
      const findUser = await this.find({ email: payload.email }, undefined, undefined)
      if (!findUser) {
        throw new ResourceNotFoundError("User does not exist")
      }
      const findpassword = await Password.compare(password, findUser.password);
      if(!findpassword) {
        throw new  InvalidPayloadError("Wrong password", HttpStatus.UNAUTHORIZED);
      }
      const token = JWT.generateAuthToken(findUser)
      return {token}
    } catch (error) {
      throw error
    }
  }
  async changePassword(payload, user) {
    try {
      //this is a protected endpoint
      //payload should contain old_password, new_password and confirm_password
      //compare payload.old_password to what is stored in the db for the user if not same throw an error
      //if it is the same, save the new password in the db
      //to get the id of the user user._id
      //your code goes in here
    } catch (error) {
      return error
    }
  }
}

export default new UserRepository({ User })
