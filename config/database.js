// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';
// dotenv.config();

// const sequelize = new Sequelize({
//     host: process.env.DB_HOST || 'localhost',
//     port: process.env.DB_PORT || 3306,
//     username: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || '',
//     database: process.env.DB_NAME || 'marketpro',
//     dialect: 'mysql',
//     logging: (sql, timing) => {
//         console.log(`[SQL] ${sql}`);
//         if (timing) console.log(`[Execution time: ${timing}ms]`);
//     },
//     benchmark: true,
//     dialectOptions: {
//         connectTimeout: 60000,
//     },
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000,
//     },
// });
// export default sequelize;;

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'marketpro',
    dialect: 'mysql',
    logging: (sql, timing) => {
        console.log(`[SQL] ${sql}`);
        if (timing) console.log(`[Execution time: ${timing}ms]`);
    },
    benchmark: true,
    dialectOptions: {
        connectTimeout: 60000,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

module.exports = sequelize;
