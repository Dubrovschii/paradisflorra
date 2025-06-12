const Category = require('./category.js');
const Subcategory = require('./subcategory.js');
const Slider = require('./promoSlider.js');
const Product = require('./product.js');
const Order = require('./order.js');
const Customer = require('./Customer.js');
const Delivery = require('./delivery.js');
Category.hasMany(Subcategory, { foreignKey: 'parent_category' });
Subcategory.belongsTo(Category, { foreignKey: 'parent_category' });

module.exports = {
  Category,
  Subcategory,
  Slider,
  Product,
  Order,
  Customer,
  Delivery

};

