import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

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
    seo_tags: DataTypes.TEXT,
    slug: {
        type: DataTypes.STRING,
        unique: true,
    },
    is_for_bouquet: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    },
    image: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null
    },
}, {
    tableName: 'backend_category',
    timestamps: false,
});

export default Category;
