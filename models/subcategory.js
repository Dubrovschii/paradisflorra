const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Subcategory = sequelize.define('Subcategory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING(50),
    seo_name: DataTypes.STRING(50),
    seo_description: DataTypes.STRING(61),
    seo_tags: DataTypes.STRING(21),
    slug: DataTypes.STRING(50),
    image: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
    },
    parent_category: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: [],
    },
}, {
    tableName: 'backend_subcategory',
    timestamps: false,
});

module.exports = Subcategory;
