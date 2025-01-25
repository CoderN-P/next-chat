// Desc: Connect to MongoDB Atlas using X.509 certificate
// Load environment variables from .env.local file
require('dotenv').config({ path: '.env.local'});

// Load MongoDB driver
const { MongoClient, ServerApiVersion } = require('mongodb');
// Load X.509 certificate
const credentials = 'src/db/X509-cert-3558676617755470267.pem';
// Create new MongoClient instance

const client = new MongoClient(process.env.MONGOURI, {
  tlsCertificateKeyFile: credentials,
  serverApi: ServerApiVersion.v1
});


const db = client.db('NextChat');
// Export db connection
export {db, client};


