import express from 'express';
import sequelize from '../config/database.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        const offset = (page - 1) * perPage;

        const [[{ total }]] = await sequelize.query('SELECT COUNT(*) AS total FROM backend_product');
        const [results] = await sequelize.query(`SELECT * FROM backend_product LIMIT ${perPage} OFFSET ${offset}`);

        res.status(200).json({
            data: results,
            total,
            page,
            perPage,
            totalProducts: total,
            totalPages: Math.ceil(total / perPage),
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
