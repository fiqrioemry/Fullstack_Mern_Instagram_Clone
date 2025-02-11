const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'chat_app',
});

client
  .connect()
  .then(() => console.log('✅ Connected to Cassandra'))
  .catch((err) => console.error('❌ Error connecting to Cassandra:', err));

module.exports = client;
