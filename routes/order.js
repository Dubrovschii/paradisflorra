const express = require('express');
const sequelize = require('../config/database');
const router = express.Router();
const { QueryTypes } = require('sequelize');

router.post('/', async (req, res) => {
  const {
    first_name,
    last_name,
    phone,
    email,
    city,
    district,
    street,
    house_number,
    apartment,
    notes,
    payment_method,
    total_price,
    items, // ожидаем массив объектов { product_id, product_name, quantity, price }
  } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Товары не переданы или пусты' });
  }

  const t = await sequelize.transaction();
  try {
    // Проверяем, что у каждого элемента есть все нужные свойства
    for (const item of items) {
      if (
        !item.product_id ||
        !item.product_name ||
        !item.quantity ||
        !item.price
      ) {
        await t.rollback();
        return res.status(400).json({ error: 'Некорректные данные о товаре' });
      }
    }

    // Вставляем заказ в backend_order, сохраняя товары сразу в JSON-колонке "items"
    const [result] = await sequelize.query(
      `
      INSERT INTO backend_order (
        first_name, last_name, phone, email, city, district,
        street, house_number, apartment, notes, payment_method, total_price, items
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      {
        replacements: [
          first_name,
          last_name,
          phone,
          email,
          city,
          district,
          street,
          house_number,
          apartment,
          notes,
          payment_method,
          total_price,
          JSON.stringify(items), // сериализуем массив товаров
        ],
        transaction: t,
        type: QueryTypes.INSERT,
      }
    );

    // result — это id только что созданного заказа
    const orderId = result;

    await t.commit();
    return res
      .status(201)
      .json({ message: 'Comanda a fost creată cu succes', orderId });
  } catch (err) {
    await t.rollback();
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
