import HttpStatus from "http-status-codes";
import container from "container"
import redis from "../../startup/redis";
import Response from "helpers/response";
export default class RedisClient {
  constructor() {
    this.client = redis;
    this.useRedisCache = this.useRedisCache.bind(this)
    this.isClientConnected = true
  }

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @param {*} response 
   */
  async saveRedisCache(req, res, next, response){
    const key = `${req.baseUrl + "/" + container.cradle.currentUser.id}`;
    this.client.hSet(
      key,
      'data',
      JSON.stringify(response)
    );
  }


  /**
   * Checks if data is in redis db and if not it hands over to the next call which fetches from persistent db.
   * @returns {object}
   */
  async useRedisCache(req, res, next) {
    const key = `${req.baseUrl + "/" + container.cradle.currentUser.id}`;
    // Check if data is in cache
    try {
      const result = await this.client.hGet(key, 'data');
      if (result) {
        return Response.getResponseHandler(res).onSuccess(
          JSON.parse(result),
          "Profile found successfully", HttpStatus.OK
        )
      } else next();
    } catch (error) {
      return Response.getResponseHandler(res).onError(error)
    }

  }
}
