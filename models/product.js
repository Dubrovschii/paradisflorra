import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

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
    // product_category: {
    //     type: DataTypes.JSON, // будет массив чисел: [1, 2, 3]
    //     allowNull: false,
    //     defaultValue: [],
    // },
    product_category: {
        type: DataTypes.INTEGER,
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
        allowNull: false,
    },
    product_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    product_descr: {
        type: DataTypes.TEXT,
        allowNull: true,
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
    product_img: {
        type: DataTypes.JSON, // Автоматическая обработка JSON
        allowNull: true,
        defaultValue: null
    },
    product_rating: {
        type: DataTypes.DECIMAL(3, 2),
        defaultValue: 0.0,
    },
}, {
    tableName: 'backend_product',
    timestamps: false,
});

export default Product;
