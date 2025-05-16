// import express from 'express';
// import sequelize from '../config/database.js';
const express = require('express');
const sequelize = require('../config/database');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [results] = await sequelize.query('SELECT * FROM backend_slider');
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// export default router;
module.exports = router

