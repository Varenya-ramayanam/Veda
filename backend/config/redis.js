// config/redis.js
const Redis = require("ioredis");

let redis = null;

const env = process.env.NODE_ENV || "development";
const useRedis = process.env.USE_REDIS === "true";
const isDocker = process.env.DOCKER === "true";

if (env === "development") {
  if (isDocker && useRedis) {
    // Dev in Docker - connect to docker-compose Redis
    redis = new Redis({
      host: "redis", // docker-compose service name
      port: 6379,
    });
  } else {
    // Dev local - disable Redis
    console.log("⚠️ Redis disabled in local development");
  }
} else if (env === "production") {
  if (useRedis) {
    // Production with Redis enabled (Cloud)
    redis = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      tls: process.env.REDIS_TLS === "true" ? {} : undefined,
    });
  } else {
    console.log("⚠️ Redis disabled in production");
  }
}

if (redis) {
  redis.on("connect", () => console.log("✅ Redis connected"));
  redis.on("error", (err) => console.error("❌ Redis error:", err));
}

module.exports = redis;
