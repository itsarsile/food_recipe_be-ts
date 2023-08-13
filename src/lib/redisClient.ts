import { createClient } from "redis";
import * as dotenv from "dotenv";
dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis client successfully connected!");
    redisClient.set("health", "Redis is healthy!");
  } catch (error) {
    console.error(error);
    setTimeout(connectRedis, 5000);
  }
};

redisClient.on("error", (error) => {
  console.error(error);
});

connectRedis();

export default redisClient;
