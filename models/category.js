const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  seo_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  seo_descr: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
  },
  is_for_bouquet: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  },
  // image: {
  //     type: DataTypes.JSON,
  //     allowNull: true,
  //     defaultValue: null
  // },
  imageFilePath: {
    type: DataTypes.JSON,
  },
  imageMime: {
    type: DataTypes.JSON,
  },
  imageSize: {
    type: DataTypes.JSON,
  },
  imageKey: {
    type: DataTypes.JSON,
  },
  imageBucket: {
    type: DataTypes.JSON,
  },

  imageBackgroundFilePath: {
    type: DataTypes.JSON,
  },
  imageBackgroundMime: {
    type: DataTypes.JSON,
  },
  imageBackgroundSize: {
    type: DataTypes.JSON,
  },
  imageBackgroundKey: {
    type: DataTypes.JSON,
  },
  imageBackgroundBucket: {
    type: DataTypes.JSON,
  },
  is_for_subcategory: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
}, {
  tableName: 'backend_category',
  timestamps: false,
});


module.exports = Category;
