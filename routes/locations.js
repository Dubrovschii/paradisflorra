import express from 'express';
import sequelize from '../config/database.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [results] = await sequelize.query('SELECT * FROM backend_locations');
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
