// Desc: Connect to MongoDB Atlas using X.509 certificate
// Load nenvironment variables from .env.local file
require('dotenv').config({ path: '.env.local'});

// Load MongoDB driver
const { MongoClient, ServerApiVersion } = require('mongodb');
// Load X.509 certificate
const credentials = 'src/db/X509-cert-7229008834198183053.pem';
// Create new MongoClient instance
const client = new MongoClient(process.env.MONGOURI, {
  tlsCertificateKeyFile: credentials,
  serverApi: ServerApiVersion.v1,
  useNewUrlParser: true
});


const db = client.db('NextChat');
// Export db connection
export {db, client};


