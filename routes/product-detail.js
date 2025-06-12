// const express = require('express');
// const sequelize = require('../config/database');
// const router = express.Router();

// router.get('/:slug', async (req, res) => {
//   try {
//     const slug = req.params.slug; // например: "14-Тюльпан Голандия" (URL закодирован, express сам раскодирует)

//     // Получаем ID до первого дефиса
//     const productId = slug.split('-')[0];

//     const [results] = await sequelize.query(
//       `SELECT * FROM backend_product WHERE product_id = :productId LIMIT 1`,
//       { replacements: { productId } }
//     );

//     if (results.length === 0) {
//       return res.status(404).json({ message: 'Товар не найден' });
//     }

//     res.json(results[0]);
//   } catch (error) {
//     console.error('Ошибка при получении товара:', error);
//     res.status(500).json({ error: 'Внутренняя ошибка сервера' });
//   }
// });


// module.exports = router;
const express = require('express');
const sequelize = require('../config/database');
const router = express.Router();

router.get('/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;

    const [results] = await sequelize.query(
      `SELECT * FROM backend_product WHERE slug = :slug LIMIT 1`,
      { replacements: { slug } }
    );

    if (results.length === 0) {
      return res.status(404).json({ message: 'Товар не найден' });
    }

    res.json(results[0]);
  } catch (error) {
    console.error('Ошибка при получении товара:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

module.exports = router;
