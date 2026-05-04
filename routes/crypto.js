const express = require('express');
const router = express.Router();
const Crypto = require('../models/Crypto');

// GET /crypto (All Tradable)
router.get('/', async (req, res) => {
  try {
    const cryptos = await Crypto.find();
    res.json(cryptos);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// GET /crypto/gainers
router.get('/gainers', async (req, res) => {
  try {
    const gainers = await Crypto.find().sort({ change24h: -1 }).limit(10);
    res.json(gainers);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// GET /crypto/new
router.get('/new', async (req, res) => {
  try {
    const newCryptos = await Crypto.find().sort({ createdAt: -1 }).limit(10);
    res.json(newCryptos);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// POST /crypto
router.post('/', async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;
    let crypto = new Crypto({ name, symbol, price, image, change24h });
    await crypto.save();
    res.status(201).json(crypto);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
