const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Product = sequelize.define('Product', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  product_category: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  product_subcategory: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  product_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: null,
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  seo_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  product_old_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: null,
  },
  product_new_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: null,
  },
  date_for_sale: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
  },
  sale_start_date: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
  product_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  product_descr: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  product_more_details: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  product_season: {
    type: DataTypes.ENUM('Vara', 'Primăvara', 'Iarna', 'Toamna'),
    allowNull: true,
    defaultValue: null,
  },
  is_for_bouquet: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  },
  is_for_sale: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  is_for_coupon: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  // product_img: {
  //   type: DataTypes.JSON,
  //   allowNull: true,
  //   defaultValue: null,
  // },
  imageTitleFilePath: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  imageTitleMime: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  imageTitleSize: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  imageTitleKey: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  imageTitleBucket: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  imageSliderFilePath: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  imageSliderMime: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  imageSliderSize: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  imageSliderKey: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  imageSliderBucket: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  product_rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0.0,
  },
  product_sold: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },


}, {
  tableName: 'backend_product',
  timestamps: false,
});

module.exports = Product;
