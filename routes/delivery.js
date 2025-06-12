const express = require('express');
const router = express.Router();
const Delivery = require('../models/delivery'); // Модель Sequelize

router.get('/', async (req, res) => {
    const city = req.query.city;

    try {
        if (city) {
            const deliveries = await Delivery.findAll({ where: { district: city } });

            if (deliveries.length > 0) {
                return res.json(deliveries.map(d => ({
                    Id: d.id,
                    district: d.district,
                    location: d.location,
                    price: d.price
                })));
            } else {
                return res.status(404).json({ message: 'Orașul nu a fost găsit.' });
            }
        }

        const deliverys = await Delivery.findAll();
        const result = deliverys.map(c => ({
            Id: c.id,
            district: c.district,
            location: c.location,
            price: c.price
        }));

        res.json(result);
    } catch (err) {
        console.error('Error fetching delivery:', err);
        res.status(500).json({ message: 'Eroare la preluarea datelor.' });
    }
});

module.exports = router;
