const Redis = require('ioredis');

const redis = new Redis(); // Default: localhost (127.0.0.1:6379)

redis.on('connect', () => {
  console.log('✅ Connected to Redis on port 6379');
});

redis.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

module.exports = redis;
