import { pick } from "lodash"
import HttpStatus from "http-status-codes"
import ProfileRepository from "infra/repositories/ProfileRepository"
import Response from "helpers/response"
import container from 'container'
import redis from 'startup/redis';

class ProfileController {
  constructor() {}
  
  async get(req, res, next) {
    try {
      const payload = pick(req.params, ["id"])
      const response = await ProfileRepository.get(payload);
      container.cradle.redisClient.saveRedisCache(req, res, next, response)
      return Response.getResponseHandler(res).onSuccess(response, "Profile found successfully", HttpStatus.OK)
    } catch (error) {
      return Response.getResponseHandler(res).onError(error)
    }
  }
}

export default new ProfileController()
