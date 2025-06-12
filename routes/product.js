const express = require('express');
const sequelize = require('../config/database');
const router = express.Router();

// router.get('/', async (req, res) => {
//     try {
//         const page = parseInt(req.query.page) || 1;
//         const perPage = parseInt(req.query.perPage) || 10;
//         const offset = (page - 1) * perPage;

//         const [[{ total }]] = await sequelize.query('SELECT COUNT(*) AS total FROM backend_product');
//         const [results] = await sequelize.query(`SELECT * FROM backend_product LIMIT ${perPage} OFFSET ${offset}`);

//         res.status(200).json({
//             data: results,
//             total,
//             page,
//             perPage,
//             totalProducts: total,
//             totalPages: Math.ceil(total / perPage),
//         });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });   if filter without subcategory and category


// router.get('/', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const perPage = parseInt(req.query.perPage) || 10;
//     const category = req.query.category;  // category id для фильтра
//     const offset = (page - 1) * perPage;
//     let whereClause = '';
//     let replacements = { limit: perPage, offset };

//     if (category) {
//       whereClause = 'WHERE JSON_CONTAINS(product_category, :categoryJson)';
//       replacements.categoryJson = JSON.stringify([category]);
//       console.log('Filtering by category (JSON):', category);
//     }

//     const [[{ total }]] = await sequelize.query(
//       `SELECT COUNT(*) AS total FROM backend_product ${whereClause}`,
//       { replacements }
//     );

//     console.log('Total products:', total);

//     const [results] = await sequelize.query(
//       `SELECT * FROM backend_product ${whereClause} LIMIT :limit OFFSET :offset`,
//       { replacements }
//     );

//     res.status(200).json({
//       data: results,
//       total,
//       page,
//       perPage,
//       totalProducts: total,
//       totalPages: Math.ceil(total / perPage),
//     });
//   } catch (err) {
//     console.error('Error fetching products:', err);
//     res.status(500).json({ error: err.message });
//   }
// }); if filter without subcategory

// router.get('/', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const perPage = parseInt(req.query.perPage) || 10;
//     const category = req.query.category;
//     const subcategory = req.query.subcategory;
//     const offset = (page - 1) * perPage;

//     let whereConditions = [];
//     let replacements = { limit: perPage, offset };

//     if (category) {
//       whereConditions.push('JSON_CONTAINS(product_category, :categoryJson)');
//       replacements.categoryJson = JSON.stringify([category]);
//     }

//     if (subcategory) {
//       whereConditions.push('product_subcategory = :subcategory');
//       replacements.subcategory = subcategory;
//     }

//     const whereClause = whereConditions.length > 0 ? 'WHERE ' + whereConditions.join(' AND ') : '';

//     const [[{ total }]] = await sequelize.query(
//       `SELECT COUNT(*) AS total FROM backend_product ${whereClause}`,
//       { replacements }
//     );

//     const [results] = await sequelize.query(
//       `SELECT * FROM backend_product ${whereClause} LIMIT :limit OFFSET :offset`,
//       { replacements }
//     );

//     res.status(200).json({
//       data: results,
//       total,
//       page,
//       perPage,
//       totalProducts: total,
//       totalPages: Math.ceil(total / perPage),
//     });
//   } catch (err) {
//     console.error('Error fetching products:', err);
//     res.status(500).json({ error: err.message });
//   }
// });  if subcategory not json

// router.get('/', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const perPage = parseInt(req.query.perPage) || 10;
//     const category = req.query.category;
//     const subcategory = req.query.subcategory;
//     const offset = (page - 1) * perPage;

//     let whereConditions = [];
//     let replacements = { limit: perPage, offset };

//     if (category) {
//       whereConditions.push('JSON_CONTAINS(product_category, :categoryJson)');
//       replacements.categoryJson = JSON.stringify([category]);
//     }

//     if (subcategory) {
//       whereConditions.push('JSON_CONTAINS(product_subcategory, :subcategoryJson)');
//       replacements.subcategoryJson = JSON.stringify([subcategory]);
//     }

//     const whereClause = whereConditions.length > 0 ? 'WHERE ' + whereConditions.join(' AND ') : '';

//     const [[{ total }]] = await sequelize.query(
//       `SELECT COUNT(*) AS total FROM backend_product ${whereClause}`,
//       { replacements }
//     );

//     const [results] = await sequelize.query(
//       `SELECT * FROM backend_product ${whereClause} LIMIT :limit OFFSET :offset`,
//       { replacements }
//     );

//     res.status(200).json({
//       data: results,
//       total,
//       page,
//       perPage,
//       totalProducts: total,
//       totalPages: Math.ceil(total / perPage),
//     });
//   } catch (err) {
//     console.error('Error fetching products:', err);
//     res.status(500).json({ error: err.message });
//   }
// });
//if filter id

// router.get('/', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const perPage = parseInt(req.query.perPage) || 10;
//     const categoryName = req.query.category;
//     const subcategoryName = req.query.subcategory;
//     const offset = (page - 1) * perPage;

//     let whereConditions = [];
//     let replacements = { limit: perPage, offset };

//     // Если есть category name, получаем id
//     if (categoryName) {
//       const [categoryResult] = await sequelize.query(
//         'SELECT id FROM backend_category WHERE name = :categoryName LIMIT 1',
//         { replacements: { categoryName } }
//       );

//       if (categoryResult.length > 0) {
//         const categoryId = categoryResult[0].id;
//         whereConditions.push('JSON_CONTAINS(product_category, :categoryJson)');
//         replacements.categoryJson = `"${categoryId}"`;  // Важно - строка, а не массив
//       }
//     }

//     // Если есть subcategory name, получаем id
//     if (subcategoryName) {
//       const [subcategoryResult] = await sequelize.query(
//         'SELECT id FROM backend_category WHERE name = :subcategoryName LIMIT 1',
//         { replacements: { subcategoryName } }
//       );

//       if (subcategoryResult.length > 0) {
//         const subcategoryId = subcategoryResult[0].id;
//         whereConditions.push('JSON_CONTAINS(product_subcategory, :subcategoryJson)');
//         replacements.subcategoryJson = `"${subcategoryId}"`;
//       }
//     }

//     const whereClause = whereConditions.length > 0 ? 'WHERE ' + whereConditions.join(' AND ') : '';

//     // Считаем количество подходящих товаров
//     const [[{ total }]] = await sequelize.query(
//       `SELECT COUNT(*) AS total FROM backend_product ${whereClause}`,
//       { replacements }
//     );

//     // Получаем товары с пагинацией
//     const [results] = await sequelize.query(
//       `SELECT * FROM backend_product ${whereClause} LIMIT :limit OFFSET :offset`,
//       { replacements }
//     );

//     res.status(200).json({
//       data: results,
//       total,
//       page,
//       perPage,
//       totalProducts: total,
//       totalPages: Math.ceil(total / perPage),
//     });

//   } catch (err) {
//     console.error('Error fetching products:', err);
//     res.status(500).json({ error: err.message });
//   }
// });
//if filter name
// router.get('/', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const perPage = parseInt(req.query.perPage) || 10;
//     const categoryName = req.query.category;
//     const subcategoryName = req.query.subcategory;
//     const offset = (page - 1) * perPage;

//     let whereConditions = [];
//     let replacements = { limit: perPage, offset };

//     // Получаем id категории по имени, если есть categoryName
//     if (categoryName) {
//       const [categoryResult] = await sequelize.query(
//         'SELECT id FROM backend_category WHERE name = :categoryName LIMIT 1',
//         { replacements: { categoryName } }
//       );

//       if (categoryResult.length > 0) {
//         const categoryId = categoryResult[0].id;
//         whereConditions.push('JSON_CONTAINS(product_category, :categoryJson)');
//         replacements.categoryJson = `"${categoryId}"`; // строка, а не массив
//       }
//     }

//     // Получаем id подкатегории по имени, если есть subcategoryName
//     if (subcategoryName) {
//       const [subcategoryResult] = await sequelize.query(
//         'SELECT id FROM backend_category WHERE name = :subcategoryName LIMIT 1',
//         { replacements: { subcategoryName } }
//       );

//       if (subcategoryResult.length > 0) {
//         const subcategoryId = subcategoryResult[0].id;
//         whereConditions.push('JSON_CONTAINS(product_subcategory, :subcategoryJson)');
//         replacements.subcategoryJson = `"${subcategoryId}"`; // строка, а не массив
//       }
//     }

//     const whereClause = whereConditions.length > 0 ? 'WHERE ' + whereConditions.join(' AND ') : '';

//     // Получаем общее число подходящих товаров
//     const [[{ total }]] = await sequelize.query(
//       `SELECT COUNT(*) AS total FROM backend_product ${whereClause}`,
//       { replacements }
//     );

//     // Получаем товары с пагинацией
//     const [results] = await sequelize.query(
//       `SELECT * FROM backend_product ${whereClause} LIMIT :limit OFFSET :offset`,
//       { replacements }
//     );

//     res.status(200).json({
//       data: results,
//       total,
//       page,
//       perPage,
//       totalProducts: total,
//       totalPages: Math.ceil(total / perPage),
//     });
//   } catch (err) {
//     console.error('Error fetching products:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const perPage = parseInt(req.query.perPage) || 10;
//     const categoryName = req.query.category;
//     // const subcategoryName = req.query.subcategory;
//     const subcategory = req.query.subcategory;

//     const offset = (page - 1) * perPage;

//     let whereConditions = [];
//     let replacements = { limit: perPage, offset };

//     // Обработка категории
//     if (categoryName) {
//       const [categoryResult] = await sequelize.query(
//         'SELECT id FROM backend_category WHERE name = :categoryName LIMIT 1',
//         { replacements: { categoryName } }
//       );

//       if (categoryResult.length > 0) {
//         const categoryId = categoryResult[0].id;
//         whereConditions.push('JSON_CONTAINS(product_category, :categoryJson)');
//         replacements.categoryJson = `"${categoryId}"`;
//       } else {
//         return res.status(200).json({ data: [], total: 0, page, perPage, totalProducts: 0, totalPages: 0 });
//       }
//     }

//       if (subcategory) {
//       whereConditions.push('JSON_CONTAINS(product_subcategory, :subcategoryJson)');
//       replacements.subcategoryJson = JSON.stringify([subcategory]);
//     }
//     // Обработка подкатегории
//     // if (subcategoryName) {
//     //   const [subcategoryResult] = await sequelize.query(
//     //     'SELECT id FROM backend_category WHERE name = :subcategoryName LIMIT 1',
//     //     { replacements: { subcategoryName } }
//     //   );

//     //   if (subcategoryResult.length > 0) {
//     //     const subcategoryId = subcategoryResult[0].id;
//     //     whereConditions.push('JSON_CONTAINS(product_subcategory, :subcategoryJson)');
//     //     replacements.subcategoryJson = `"${subcategoryId}"`;
//     //   } else {
//     //     return res.status(200).json({ data: [], total: 0, page, perPage, totalProducts: 0, totalPages: 0 });
//     //   }
//     // }

//     const whereClause = whereConditions.length > 0 ? 'WHERE ' + whereConditions.join(' AND ') : '';

//     // Получаем общее количество
//     const [[{ total }]] = await sequelize.query(
//       `SELECT COUNT(*) AS total FROM backend_product ${whereClause}`,
//       { replacements }
//     );

//     // Получаем сами продукты
//     const [results] = await sequelize.query(
//       `SELECT * FROM backend_product ${whereClause} LIMIT :limit OFFSET :offset`,
//       { replacements }
//     );

//     res.status(200).json({
//       data: results,
//       total,
//       page,
//       perPage,
//       totalProducts: total,
//       totalPages: Math.ceil(total / perPage),
//     });

//   } catch (err) {
//     console.error('Error fetching products:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const perPage = parseInt(req.query.perPage) || 10;
//     const categoryName = req.query.category;
//     const subcategory = req.query.subcategory;
//     const search = req.query.search; // параметр поиска

//     const offset = (page - 1) * perPage;

//     let whereConditions = [];
//     let replacements = { limit: perPage, offset };

//     // Поиск по названию продукта
//     if (search) {
//       whereConditions.push('product_name LIKE :search');
//       replacements.search = `%${search}%`;
//     }

//     // Обработка категории
//     if (categoryName) {
//       const [categoryResult] = await sequelize.query(
//         'SELECT id FROM backend_category WHERE name = :categoryName LIMIT 1',
//         { replacements: { categoryName } }
//       );

//       if (categoryResult.length > 0) {
//         const categoryId = categoryResult[0].id;
//         whereConditions.push('JSON_CONTAINS(product_category, :categoryJson)');
//         replacements.categoryJson = `"${categoryId}"`;
//       } else {
//         return res.status(200).json({ data: [], total: 0, page, perPage, totalProducts: 0, totalPages: 0 });
//       }
//     }

//     // Обработка подкатегории
//     if (subcategory) {
//       whereConditions.push('JSON_CONTAINS(product_subcategory, :subcategoryJson)');
//       replacements.subcategoryJson = JSON.stringify([subcategory]);
//     }

//     const whereClause = whereConditions.length > 0 ? 'WHERE ' + whereConditions.join(' AND ') : '';

//     // Получаем общее количество
//     const [[{ total }]] = await sequelize.query(
//       `SELECT COUNT(*) AS total FROM backend_product ${whereClause}`,
//       { replacements }
//     );

//     // Получаем сами продукты
//     const [results] = await sequelize.query(
//       `SELECT * FROM backend_product ${whereClause} LIMIT :limit OFFSET :offset`,
//       { replacements }
//     );

//     res.status(200).json({
//       data: results,
//       total,
//       page,
//       perPage,
//       totalProducts: total,
//       totalPages: Math.ceil(total / perPage),
//     });

//   } catch (err) {
//     console.error('Error fetching products:', err);
//     res.status(500).json({ error: err.message });
//   }
// });
// if searche name 

// router.get('/', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const perPage = parseInt(req.query.perPage) || 10;
//     const subcategorySlug = req.query.subcategory;
//     // const subcategory = req.query.subcategory;
//     const search = req.query.search;
//     const categorySlug = req.query.category;
//     // console.log('Category slug:', categorySlug);

//     const offset = (page - 1) * perPage;

//     let whereConditions = [];
//     let replacements = { limit: perPage, offset };

//     if (search) {
//       whereConditions.push('product_name LIKE :search');
//       replacements.search = `%${search}%`;
//     }

//     if (categorySlug) {
//       const [categoryResult] = await sequelize.query(
//         'SELECT id FROM backend_category WHERE slug = :categorySlug LIMIT 1',
//         { replacements: { categorySlug } }
//       );
//       if (categoryResult.length > 0) {
//         const categoryId = categoryResult[0].id;
//         whereConditions.push('JSON_CONTAINS(product_category, :categoryJson)');
//         replacements.categoryJson = `"${categoryId}"`;
//       } else {
//         return res.status(200).json({ data: [], total: 0, page, perPage, totalProducts: 0, totalPages: 0 });
//       }
//     }

//     // if (subcategory) {
//     //   whereConditions.push('JSON_CONTAINS(product_subcategory, :subcategoryJson)');
//     //   replacements.subcategoryJson = JSON.stringify(subcategory);
//     // }
//     if (subcategorySlug) {
//       const [subcategoryResult] = await sequelize.query(
//         'SELECT id FROM backend_category WHERE slug = :subcategorySlug LIMIT 1',
//         { replacements: { subcategorySlug } }
//       );
//       if (subcategoryResult.length > 0) {
//         const subcategoryId = subcategoryResult[0].id;
//         whereConditions.push('JSON_CONTAINS(product_subcategory, :subcategoryJson)');
//         replacements.subcategoryJson = `"${subcategoryId}"`;
//       } else {
//         return res.status(200).json({ data: [], total: 0, page, perPage, totalProducts: 0, totalPages: 0 });
//       }
//     }

//     const whereClause = whereConditions.length > 0 ? 'WHERE ' + whereConditions.join(' AND ') : '';

//     // console.log('SQL COUNT:', `SELECT COUNT(*) AS total FROM backend_product ${whereClause}`);
//     // console.log('Replacements:', replacements);

//     const [[{ total }]] = await sequelize.query(
//       `SELECT COUNT(*) AS total FROM backend_product ${whereClause}`,
//       { replacements }
//     );

//     console.log('SQL SELECT:', `SELECT * FROM backend_product ${whereClause} LIMIT :limit OFFSET :offset`);
//     const [results] = await sequelize.query(
//       `SELECT * FROM backend_product ${whereClause} LIMIT :limit OFFSET :offset`,
//       { replacements }
//     );

//     // Выводим товары в консоль с пометкой
//     console.log('Fetched products:', results);

//     res.status(200).json({
//       data: results,
//       total,
//       page,
//       perPage,
//       totalProducts: total,
//       totalPages: Math.ceil(total / perPage),
//     });

//   } catch (err) {
//     console.error('Error fetching products:', err);
//     res.status(500).json({ error: err.message });
//   }
// }); only slug category


// router.get('/', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const perPage = parseInt(req.query.perPage) || 10;
//     const search = req.query.search;
//     const categorySlug = req.query.category;
//     const subcategorySlug = req.query.subcategory;

//     const offset = (page - 1) * perPage;

//     let whereConditions = [];
//     let replacements = { limit: perPage, offset };

//     // Поиск по названию
//     if (search) {
//       whereConditions.push('product_name LIKE :search');
//       replacements.search = `%${search}%`;
//     }

//     // По slug категории
//     if (categorySlug) {
//       const [categoryResult] = await sequelize.query(
//         'SELECT id FROM backend_category WHERE slug = :categorySlug LIMIT 1',
//         { replacements: { categorySlug } }
//       );

//       if (categoryResult.length > 0) {
//         const categoryId = categoryResult[0].id;
//         whereConditions.push('JSON_CONTAINS(product_category, :categoryJson)');
//         replacements.categoryJson = `"${categoryId}"`;
//       } else {
//         console.log('Категория не найдена:', categorySlug);
//         return res.status(200).json({
//           data: [],
//           total: 0,
//           page,
//           perPage,
//           totalProducts: 0,
//           totalPages: 0,
//         });
//       }
//     }

//     // По slug сабкатегории
//     if (subcategorySlug) {
//       const [subcategoryResult] = await sequelize.query(
//         'SELECT id FROM backend_category WHERE slug = :subcategorySlug LIMIT 1',
//         { replacements: { subcategorySlug } }
//       );

//       if (subcategoryResult.length > 0) {
//         const subcategoryId = subcategoryResult[0].id;
//         whereConditions.push('JSON_CONTAINS(product_subcategory, :subcategoryJson)');
//         replacements.subcategoryJson = `"${subcategoryId}"`;
//       } else {
//         console.log('Сабкатегория не найдена:', subcategorySlug);
//         return res.status(200).json({
//           data: [],
//           total: 0,
//           page,
//           perPage,
//           totalProducts: 0,
//           totalPages: 0,
//         });
//       }
//     }

//     // Формируем WHERE-условие
//     const whereClause = whereConditions.length > 0 ? 'WHERE ' + whereConditions.join(' AND ') : '';

//     // Получаем общее количество
//     const [[{ total }]] = await sequelize.query(
//       `SELECT COUNT(*) AS total FROM backend_product ${whereClause}`,
//       { replacements }
//     );

//     // Получаем товары с лимитом
//     const [results] = await sequelize.query(
//       `SELECT * FROM backend_product ${whereClause} LIMIT :limit OFFSET :offset`,
//       { replacements }
//     );

//     // Выводим результат в консоль
//     console.log('=== РЕЗУЛЬТАТ ФИЛЬТРА ===');
//     console.log('Фильтры:', { search, categorySlug, subcategorySlug });
//     console.log('WHERE SQL:', whereClause);
//     console.log('Replacements:', replacements);
//     console.log('Всего товаров:', total);
//     console.log('Результаты:', results);

//     // Ответ клиенту
//     res.status(200).json({
//       data: results,
//       total,
//       page,
//       perPage,
//       totalProducts: total,
//       totalPages: Math.ceil(total / perPage),
//     });

//   } catch (err) {
//     console.error('Ошибка при получении товаров:', err);
//     res.status(500).json({ error: err.message });
//   }
// });



// router.get('/', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const perPage = parseInt(req.query.perPage) || 10;
//     const search = (req.query.search || '').trim();
//     const categorySlug = (req.query.category || '').trim();
//     const subcategorySlug = (req.query.subcategory || '').trim();
//     // const categoryName = req.query.category;

//     const offset = (page - 1) * perPage;

//     let whereConditions = [];
//     let replacements = { limit: perPage, offset };

//     // Поиск по имени товара
//     if (search) {
//       whereConditions.push('product_name LIKE :search');
//       replacements.search = `%${search}%`;
//     }
//     // if (categoryName) {
//     //   const [categoryResult] = await sequelize.query(
//     //     'SELECT id FROM backend_category WHERE name = :categoryName LIMIT 1',
//     //     { replacements: { categoryName } }
//     //   );

//     //   if (categoryResult.length > 0) {
//     //     const categoryId = categoryResult[0].id;
//     //     whereConditions.push('JSON_CONTAINS(product_category, :categoryJson)');
//     //     replacements.categoryJson = `"${categoryId}"`;
//     //   } else {
//     //     return res.status(200).json({ data: [], total: 0, page, perPage, totalProducts: 0, totalPages: 0 });
//     //   }
//     // }
//     // Поиск по категории (slug)
//     if (categorySlug) {
//       const [categoryResult] = await sequelize.query(
//         'SELECT id FROM backend_category WHERE slug = :categorySlug LIMIT 1',
//         { replacements: { categorySlug } }
//       );
//       // console.log('Результат поиска категории:', categoryResult);

//       if (categoryResult.length > 0) {
//         const categoryId = categoryResult[0].id;
//         whereConditions.push('JSON_CONTAINS(product_category, :categoryJson)');
//         replacements.categoryJson = `"${categoryId}"`;
//       } else {
//         console.log('Категория не найдена:', categorySlug);
//         return res.status(200).json({
//           data: [],
//           total: 0,
//           page,
//           perPage,
//           totalProducts: 0,
//           totalPages: 0,
//         });
//       }
//     }

//     // Поиск по сабкатегории (slug)
//     if (subcategorySlug) {
//       const [subcategoryResult] = await sequelize.query(
//         'SELECT id FROM backend_subcategory WHERE slug = :subcategorySlug LIMIT 1',
//         { replacements: { subcategorySlug } }
//       );
//       // console.log('Результат поиска сабкатегории:', subcategoryResult);

//       if (subcategoryResult.length > 0) {
//         const subcategoryId = subcategoryResult[0].id;
//         whereConditions.push('JSON_CONTAINS(product_subcategory, :subcategoryJson)');
//         replacements.subcategoryJson = `"${subcategoryId}"`;
//       } else {
//         console.log('Сабкатегория не найдена:', subcategorySlug);
//         return res.status(200).json({
//           data: [],
//           total: 0,
//           page,
//           perPage,
//           totalProducts: 0,
//           totalPages: 0,
//         });
//       }
//     }

//     const whereClause = whereConditions.length > 0
//       ? 'WHERE ' + whereConditions.join(' AND ')
//       : '';

//     // Отладка запроса
//     // console.log('Готовый WHERE:', whereClause);
//     // console.log('Заменяемые значения (replacements):', replacements);

//     // Получаем общее количество подходящих товаров
//     const [[{ total }]] = await sequelize.query(
//       `SELECT COUNT(*) AS total FROM backend_product ${whereClause}`,
//       { replacements }
//     );

//     // Получаем товары
//     const [results] = await sequelize.query(
//       `SELECT * FROM backend_product ${whereClause} LIMIT :limit OFFSET :offset`,
//       { replacements }
//     );

//     // Выводим товары в консоль
//     // console.log('Найдено товаров:', total);
//     // console.log('Результаты:', results);

//     res.status(200).json({
//       data: results,
//       total,
//       page,
//       perPage,
//       totalProducts: total,
//       totalPages: Math.ceil(total / perPage),
//     });

//   } catch (err) {
//     console.error('Ошибка при получении товаров:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// dsd

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const search = (req.query.search || '').trim();
    const categorySlug = (req.query.category || '').trim();
    const subcategorySlug = (req.query.subcategory || '').trim();

    const offset = (page - 1) * perPage;

    let whereConditions = [];
    let replacements = { limit: perPage, offset };

    // Поиск по имени товара
    if (search) {
      whereConditions.push('product_name LIKE :search');
      replacements.search = `%${search}%`;
    }

    // Поиск по категории (slug)
    if (categorySlug) {
      const [categoryResult] = await sequelize.query(
        'SELECT id FROM backend_category WHERE slug = :categorySlug LIMIT 1',
        { replacements: { categorySlug } }
      );
      console.log('Результат поиска категории:', categoryResult);

      if (categoryResult.length > 0) {
        const categoryId = categoryResult[0].id;
        whereConditions.push('JSON_CONTAINS(product_category, :categoryJson)');
        replacements.categoryJson = `"${categoryId}"`;
      } else {
        console.log('Категория не найдена:', categorySlug);
        return res.status(200).json({
          data: [],
          total: 0,
          page,
          perPage,
          totalProducts: 0,
          totalPages: 0,
        });
      }
    }

    // Поиск по сабкатегории (slug)
    if (subcategorySlug) {
      const [subcategoryResult] = await sequelize.query(
        'SELECT id FROM backend_subcategory WHERE slug = :subcategorySlug LIMIT 1',
        { replacements: { subcategorySlug } }
      );
      console.log('Результат поиска сабкатегории:', subcategoryResult);

      if (subcategoryResult.length > 0) {
        const subcategoryId = subcategoryResult[0].id;
        whereConditions.push('JSON_CONTAINS(product_subcategory, :subcategoryJson)');
        replacements.subcategoryJson = `"${subcategoryId}"`;
      } else {
        console.log('Сабкатегория не найдена:', subcategorySlug);
        return res.status(200).json({
          data: [],
          total: 0,
          page,
          perPage,
          totalProducts: 0,
          totalPages: 0,
        });
      }
    }

    const whereClause = whereConditions.length > 0
      ? 'WHERE ' + whereConditions.join(' AND ')
      : '';

    // Отладка запроса
    // console.log('Готовый WHERE:', whereClause);
    // console.log('Заменяемые значения (replacements):', replacements);

    // Получаем общее количество подходящих товаров
    const [[{ total }]] = await sequelize.query(
      `SELECT COUNT(*) AS total FROM backend_product ${whereClause}`,
      { replacements }
    );

    // Получаем товары
    const [results] = await sequelize.query(
      `SELECT * FROM backend_product ${whereClause} LIMIT :limit OFFSET :offset`,
      { replacements }
    );

    // Выводим товары в консоль
    console.log('Найдено товаров:', total);
    console.log('Результаты:', results);

    res.status(200).json({
      data: results,
      total,
      page,
      perPage,
      totalProducts: total,
      totalPages: Math.ceil(total / perPage),
    });

  } catch (err) {
    console.error('Ошибка при получении товаров:', err);
    res.status(500).json({ error: err.message });
  }
});

// вместо router.get('/', …) используем параметры пути
// router.get('/:categorySlug?/:subcategorySlug?', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const perPage = parseInt(req.query.perPage) || 10;
//     const search = (req.query.search || '').trim();

//     // Читаем из params, а не из query
//     const categorySlug = (req.params.categorySlug || '').trim();
//     const subcategorySlug = (req.params.subcategorySlug || '').trim();

//     const offset = (page - 1) * perPage;
//     let whereConditions = [];
//     let replacements = { limit: perPage, offset };

//     // Поиск по имени товара
//     if (search) {
//       whereConditions.push('product_name LIKE :search');
//       replacements.search = `%${search}%`;
//     }

//     // Поиск по категории (slug)
//     if (categorySlug) {
//       const [categoryResult] = await sequelize.query(
//         'SELECT id FROM backend_category WHERE slug = :categorySlug LIMIT 1',
//         { replacements: { categorySlug } }
//       );
//       console.log('Результат поиска категории:', categoryResult);

//       if (categoryResult.length > 0) {
//         const categoryId = categoryResult[0].id;
//         whereConditions.push('JSON_CONTAINS(product_category, :categoryJson)');
//         replacements.categoryJson = `"${categoryId}"`;
//       } else {
//         // Если категория не найдена, возвращаем пустой ответ
//         return res.status(200).json({
//           data: [],
//           total: 0,
//           page,
//           perPage,
//           totalProducts: 0,
//           totalPages: 0,
//         });
//       }
//     }

//     // Поиск по сабкатегории (slug)
//     if (subcategorySlug) {
//       const [subcategoryResult] = await sequelize.query(
//         'SELECT id FROM backend_subcategory WHERE slug = :subcategorySlug LIMIT 1',
//         { replacements: { subcategorySlug } }
//       );
//       console.log('Результат поиска сабкатегории:', subcategoryResult);

//       if (subcategoryResult.length > 0) {
//         const subcategoryId = subcategoryResult[0].id;
//         whereConditions.push('JSON_CONTAINS(product_subcategory, :subcategoryJson)');
//         replacements.subcategoryJson = `"${subcategoryId}"`;
//       } else {
//         // Если сабкатегория не найдена, возвращаем пустой ответ
//         return res.status(200).json({
//           data: [],
//           total: 0,
//           page,
//           perPage,
//           totalProducts: 0,
//           totalPages: 0,
//         });
//       }
//     }

//     const whereClause = whereConditions.length
//       ? 'WHERE ' + whereConditions.join(' AND ')
//       : '';

//     // Получаем общее число
//     const [[{ total }]] = await sequelize.query(
//       `SELECT COUNT(*) AS total FROM backend_product ${whereClause}`,
//       { replacements }
//     );

//     // Получаем список товаров
//     const [results] = await sequelize.query(
//       `SELECT * FROM backend_product ${whereClause} LIMIT :limit OFFSET :offset`,
//       { replacements }
//     );

//     console.log('Найдено товаров:', total);
//     console.log('Результаты:', results);

//     res.status(200).json({
//       data: results,
//       total,
//       page,
//       perPage,
//       totalProducts: total,
//       totalPages: Math.ceil(total / perPage),
//     });
//   } catch (err) {
//     console.error('Ошибка при получении товаров:', err);
//     res.status(500).json({ error: err.message });
//   }
// });


module.exports = router;
