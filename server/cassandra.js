const cassandra = require('cassandra-driver');

// Konfigurasi koneksi ke Cassandra
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'], // IP Cassandra, pakai 'cassandra' jika pakai Docker dengan network
  localDataCenter: 'datacenter1', // Default data center
  keyspace: 'chat_app',
});

// Cek koneksi ke Cassandra
client
  .connect()
  .then(() => console.log('✅ Connected to Cassandra'))
  .catch((err) => console.error('❌ Error connecting to Cassandra:', err));

module.exports = client;
