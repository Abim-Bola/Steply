import { createClient } from "redis";

let redisClient;

(
    async () => {
        redisClient = createClient({
            host: '127.0.0.1', // Redis server host
            port: 6379, 
            legacyMode: false
          });

        redisClient.on("error", (error) => console.error(`Error Redis: ${error}`));
        await redisClient.connect();
    }
)();

export default redisClient;
