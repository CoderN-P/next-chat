// Desc: Connect to MongoDB Atlas using X.509 certificate
// Load nenvironment variables from .env file
require('dotenv').config();
// Load MongoDB driver
const { MongoClient, ServerApiVersion } = require('mongodb');
// Load X.509 certificate
const credentials = '<path_to_certificate>';
// Create new MongoClient instance
const client = new MongoClient(process.env.MONGOURI, {
  tlsCertificateKeyFile: credentials,
  serverApi: ServerApiVersion.v1
});

const db = client.db('NextChat');
// Export db connection
export default db;

