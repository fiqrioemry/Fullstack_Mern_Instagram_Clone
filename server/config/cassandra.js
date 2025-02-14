const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'chat_app',
});

client
  .connect()
  .then(() =>
    console.log(
      `✅ Connected to Cassandra on port: ${client.options.contactPoints[0]}:${client.options.protocolOptions.port}`,
    ),
  )
  .catch((err) => console.error('❌ Error connecting to Cassandra:', err));

module.exports = client;
