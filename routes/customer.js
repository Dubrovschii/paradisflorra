// routes/newsletter.js
const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer'); // импорт модели

router.post('/', async (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: 'Numele și telefonul sunt necesare.' });
  }

  try {
    await Customer.create({ customer_name: name, customer_phone: phone });
    return res.status(201).json({ message: 'Mulțumim. Vă vom contacta în curând.' });
  } catch (err) {
    console.error('Error saving customer:', err);
    return res.status(500).json({ message: 'Eroare la salvarea datelor.' });
  }
});


module.exports = router;
