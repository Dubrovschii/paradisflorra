const express = require('express');
const sequelize = require('../config/database');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [results] = await sequelize.query('SELECT * FROM backend_category');
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router
