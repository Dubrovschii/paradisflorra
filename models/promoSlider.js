import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Подключение к базе данных

const Slider = sequelize.define('Slider', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    slider_img: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null
    },
    slider_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slider_descr: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    slider_link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    slider_link_text: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'backend_slider',
    timestamps: false, // если таблица не имеет столбцов createdAt и updatedAt
});

export default Slider;
