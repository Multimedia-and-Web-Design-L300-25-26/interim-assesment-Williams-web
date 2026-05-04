const mongoose = require('mongoose');

const CryptoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true, unique: true },
  price: { type: String, required: true },
  image: { type: String },
  change24h: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Crypto', CryptoSchema);
