import { createClient } from "redis";
import container from '../container'

let redisClient;
(
    async () => {
        try {
            redisClient = createClient({
                host: '127.0.0.1', // Redis server host
                port: 6379, 
                legacyMode: false
              });
              await redisClient.connect();
              container.cradle.logger.info("Reddis connected Successfully")
        } catch (error) {
            redisClient.on("error", (error) => container.cradle.logger.error(`Error Redis: ${error}`));
        }
    }
)();

export default redisClient;
