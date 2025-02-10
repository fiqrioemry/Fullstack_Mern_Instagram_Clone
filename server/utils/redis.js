const { createClient } = require('redis');

const { REDIS_CLIENT_PASSWORD, REDIS_CLIENT_URL } = process.env;

const client = createClient({
  username: 'default',
  password: REDIS_CLIENT_PASSWORD,
  socket: {
    host: REDIS_CLIENT_URL,
    port: 13751,
  },
});

client.on('error', (err) => console.log('Redis Client Error', err));

const connectRedis = async () => {
  try {
    await client.connect();
    console.log('Redis is connected');
  } catch (err) {
    console.error('Error connecting to Redis', err);
    process.exit(1);
  }
};

module.exports = { client, connectRedis };
