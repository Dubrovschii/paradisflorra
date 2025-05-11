// import AdminJS from 'adminjs';
// import AdminJSExpress from '@adminjs/express';
// import { Database, Resource } from '@adminjs/sequelize';
// import 'dotenv/config';
// import express from 'express';
// import session from 'express-session';
// import { Sequelize } from 'sequelize';
// import cors from 'cors';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { Slider, Category, Subcategory, Product } from './models/index.js';
// import { ComponentLoader } from 'adminjs';


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const componentLoader = new ComponentLoader();
// const Components = {
//     Dashboard: componentLoader.add('Dashboard', path.resolve(__dirname, './dashboard.js')),
// };

// const app = express();
// app.use(cors({
//     origin: ['http://localhost:3000', 'http://localhost:3001', 'https://app.vetro.md'],
//     credentials: true,
// }));
// app.use(express.json());

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//     },
// }));

// const sequelize = new Sequelize({
//     host: process.env.DB_HOST || 'localhost',
//     port: process.env.DB_PORT || 3306,
//     username: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || '',
//     database: process.env.DB_NAME || 'marketpro',
//     dialect: 'mysql',
//     logging: false,
// });

// AdminJS.registerAdapter({ Database, Resource });

// const adminJs = new AdminJS({
//     resources: [
//         { resource: Slider, options: { parent: { name: 'Promo Slider' } } },
//         { resource: Category, options: { parent: { name: 'Category' } } },
//         { resource: Subcategory, options: { parent: { name: 'Category' } } },
//         { resource: Product, options: { parent: { name: 'Products' } } },
//     ],
//     rootPath: '/admin',
//     componentLoader,
//     dashboard: {
//         component: Components.Dashboard,
//     },
// });


// const DEFAULT_ADMIN = {
//     email: 'admin@example.com',
//     password: 'password',
// };

// const authenticate = async (email, password) => {
//     return (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password)
//         ? DEFAULT_ADMIN
//         : null;
// };

// const startServer = async () => {
//     try {
//         await sequelize.authenticate();

//         const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
//             authenticate,
//             cookiePassword: 'your-super-secret-cookie-password',
//         });

//         app.use(adminJs.options.rootPath, adminRouter);

//         app.get('/', async (req, res) => {
//             try {
//                 const [results] = await sequelize.query('SELECT * FROM backend_slider');
//                 res.status(200).json(results);
//             } catch (err) {
//                 res.status(500).json({ error: err.message });
//             }
//         });

//         app.get('/category', async (req, res) => {
//             try {
//                 const [results] = await sequelize.query('SELECT * FROM backend_category');
//                 res.status(200).json(results);
//             } catch (err) {
//                 res.status(500).json({ error: err.message });
//             }
//         });

//         app.get('/locations', async (req, res) => {
//             try {
//                 const [results] = await sequelize.query('SELECT * FROM backend_locations');
//                 res.status(200).json(results);
//             } catch (err) {
//                 res.status(500).json({ error: err.message });
//             }
//         });

//         app.listen(3001, () => {
//             console.log('AdminJS is running at http://localhost:3001/admin');

//         });
//     } catch (error) {
//         console.error('Failed to start the server:', error);
//     }
// };

// startServer();




import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/sequelize';
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import { Sequelize } from 'sequelize';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
// import fs from 'fs';
import { AdminJSOptions } from './adminOptions/index.js';
import { componentLoader } from './adminOptions/componentLoader.js';

// Получаем __dirname в ES-модуле
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Папка загрузок
// const uploadDir = path.join(__dirname, 'public/uploads/products');
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// Настройки CORS
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'https://app.vetro.md'],
    credentials: true,
}));

// Парсинг JSON
app.use(express.json());

// Статические файлы
// app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Настройка сессий
app.use(session({
    secret: process.env.SESSION_SECRET || 'default-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: parseInt(process.env.SESSION_COOKIE_MAX_AGE) || 86400000, // по умолчанию 24 часа
    },
}));

// Подключение к базе данных через Sequelize
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

// Подключение адаптера AdminJS для Sequelize
AdminJS.registerAdapter({ Database, Resource });

// Настройка AdminJS
const adminJs = new AdminJS({
    componentLoader,
    ...AdminJSOptions,
    rootPath: '/admin',
    assets: {
        styles: ['/custom.css'],
    },
});

// Учетные данные администратора
const DEFAULT_ADMIN = {
    email: 'admin@example.com',
    password: 'password',
};

// Аутентификация администратора
const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN);
    }
    return null;
};

// Запуск сервера
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established');

        const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
            adminJs,
            { authenticate, cookiePassword: process.env.COOKIE_SECRET || 'super-secret-cookie' },
            null,
            {
                resave: false,
                saveUninitialized: false,
                secret: process.env.SESSION_SECRET || 'super-secret',
                cookie: {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                },
                name: 'adminjs',
            }
        );

        app.use(adminJs.options.rootPath, adminRouter);

        // API endpoints
        app.get('/', async (req, res) => {
            try {
                const [results] = await sequelize.query('SELECT * FROM backend_slider');
                res.status(200).json(results);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        app.get('/category', async (req, res) => {
            try {
                const [results] = await sequelize.query('SELECT * FROM backend_category');
                res.status(200).json(results);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        app.get('/locations', async (req, res) => {
            try {
                const [results] = await sequelize.query('SELECT * FROM backend_locations');
                res.status(200).json(results);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
        app.use('/uploads/promoslider', express.static(path.join(__dirname, 'public', 'uploads/promoslider')));
        app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
        adminJs.watch()

        app.listen(3001, () => {
            console.log('Server is running on http://localhost:3001');
            console.log('AdminJS is running at http://localhost:3001/admin');
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
