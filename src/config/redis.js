const Redis = require('ioredis');

const redisConnection = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: null })
  : new Redis({
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT || 6379,
      maxRetriesPerRequest: null,
    });

redisConnection.on('connect', () => {
  console.log('Connected to Redis');
});

redisConnection.on('error', (err) => {
  console.error('Redis connection error:', err);
});

module.exports = redisConnection;
