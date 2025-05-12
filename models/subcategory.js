import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Subcategory = sequelize.define('Subcategory', {
    id: {
        type: DataTypes.TINYINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING(29),
    seo_name: DataTypes.STRING(18),
    seo_description: DataTypes.STRING(61),
    seo_tags: DataTypes.STRING(21),
    slug: DataTypes.STRING(18),
    image: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null
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

export default Subcategory;
