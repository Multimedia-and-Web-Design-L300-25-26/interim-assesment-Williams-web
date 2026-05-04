require('dotenv').config();
const mongoose = require('mongoose');
const Crypto = require('./models/Crypto');

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected for seeding...'))
.catch(err => {
  console.log('MongoDB connection error:', err);
  process.exit(1);
});

const initialData = [
  { name: 'Bitcoin', symbol: 'BTC', price: '725403.56', change24h: 0.64, image: '#F7931A' },
  { name: 'Ethereum', symbol: 'ETH', price: '21381.91', change24h: 2.08, image: '#627EEA' },
  { name: 'Tether', symbol: 'USDT', price: '10.79', change24h: 0.0, image: '#26A17B' },
  { name: 'BNB', symbol: 'BNB', price: '6722.45', change24h: 1.14, image: '#F3BA2F' },
  { name: 'XRP', symbol: 'XRP', price: '14.53', change24h: -0.08, image: '#23292F' },
  { name: 'USDC', symbol: 'USDC', price: '10.80', change24h: 0.01, image: '#2775CA' },
  { name: 'Pepe', symbol: 'PEPE', price: '0.0812', change24h: 12.45, image: '#4CAF50' },
  { name: 'Dogecoin', symbol: 'DOGE', price: '1.82', change24h: 8.32, image: '#C2A633' },
  { name: 'Sui', symbol: 'SUI', price: '8.45', change24h: 15.2, image: '#4DA2FF' }
];

const seedDB = async () => {
  try {
    await Crypto.deleteMany({});
    console.log('Cleared existing cryptos.');
    await Crypto.insertMany(initialData);
    console.log('Seeded initial cryptos successfully!');
  } catch (err) {
    console.error('Error seeding DB:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
