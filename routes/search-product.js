const express = require('express');
const sequelize = require('../config/database');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const categoryName = req.query.category;
    const subcategory = req.query.subcategory;
    const searchQuery = req.query.search;
    const offset = (page - 1) * perPage;

    let whereConditions = [];
    let replacements = { limit: perPage, offset };

    // Поиск по названию товара (регистронезависимый)
    if (searchQuery) {
      whereConditions.push('LOWER(product_name) LIKE LOWER(:searchQuery)');
      replacements.searchQuery = `%${searchQuery}%`;
    }

    // Фильтрация по категории
    if (categoryName) {
      const [categoryResult] = await sequelize.query(
        'SELECT id FROM backend_category WHERE name = :categoryName LIMIT 1',
        { replacements: { categoryName } }
      );

      if (categoryResult.length > 0) {
        const categoryId = categoryResult[0].id;
        whereConditions.push('JSON_CONTAINS(product_category, :categoryJson)');
        replacements.categoryJson = `"${categoryId}"`;
      } else {
        return res.status(200).json({ 
          data: [], 
          total: 0, 
          page, 
          perPage, 
          totalPages: 0 
        });
      }
    }

    // Фильтрация по подкатегории
    if (subcategory) {
      whereConditions.push('JSON_CONTAINS(product_subcategory, :subcategoryJson)');
      replacements.subcategoryJson = JSON.stringify([subcategory]);
    }

    const whereClause = whereConditions.length > 0 
      ? 'WHERE ' + whereConditions.join(' AND ') 
      : '';

    // Получаем общее количество товаров
    const [[{ total }]] = await sequelize.query(
      `SELECT COUNT(*) AS total FROM backend_product ${whereClause}`,
      { replacements }
    );

    // Получаем сами продукты
    const [results] = await sequelize.query(
      `SELECT * FROM backend_product ${whereClause} 
       ORDER BY product_name 
       LIMIT :limit OFFSET :offset`,
      { replacements }
    );

    res.status(200).json({
      data: results,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    });

  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ 
      error: 'Internal server error',
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }
});

module.exports = router