// Hashes a password string using SHA-256
const crypto = require('crypto');

function hashPassword(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

module.exports = hashPassword;
