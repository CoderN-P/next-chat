"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.db = void 0;
// Desc: Connect to MongoDB Atlas using X.509 certificate
// Load environment variables from .env.local file
require('dotenv').config({ path: '.env.local' });
// Load MongoDB driver
var _a = require('mongodb'), MongoClient = _a.MongoClient, ServerApiVersion = _a.ServerApiVersion;
// Load X.509 certificate
var credentials = 'src/db/X509-cert-7229008834198183053.pem';
// Create new MongoClient instance

var client = new MongoClient(process.env.MONGOURI, {
    tlsCertificateKeyFile: credentials,
    serverApi: ServerApiVersion.v1
});
exports.client = client;
var db = client.db('NextChat');
exports.db = db;
