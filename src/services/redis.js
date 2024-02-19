import { createClient } from 'redis';

class RedisClient {

    constructor() {
        this.client = createClient();
        this.isClientConnected = true;
        this.client.on('error', (err) => {
          console.error('Redis client failed to connect:', err.message || err.toString());
          this.isClientConnected = false;
        });
        this.client.on('connect', () => {
          this.isClientConnected = true;
        });
      }


 /**
   * Checks if this client's connection to the Redis server is active.
   * @returns {boolean}
   */
  isAlive() {
    return this.isClientConnected;
  }    

}

export const redisClient = new RedisClient();
export default redisClient;