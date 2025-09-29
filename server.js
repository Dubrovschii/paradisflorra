

const express = require('express');
const http = require('http');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const sequelize = require('./config/database.js');
const dotenv = require('dotenv');
const path = require('path');

const sliderRoutes = require('./routes/slider.js');
const categoryRoutes = require('./routes/category.js');
const subcategoryRoutes = require('./routes/subcategory.js');
const productRoutes = require('./routes/product.js');
const locationsRoutes = require('./routes/locations.js');
const setupAdminPanel = require('./adminpanel.js');
const productDetailRoutes = require('./routes/product-detail.js');
const postOrder = require('./routes/order.js');
const newsLetter = require('./routes/customer.js');
const delivery = require('./routes/delivery.js');

dotenv.config();

const app = express();

app.use('/admin-assets', express.static(path.join(__dirname, 'public')));

app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://app.vetro.md',
        'https://flowers.vetro.md',
        'https://paradisflorra.md'
    ],
    credentials: true,
}));

app.use(express.json());


const sessionStore = new MySQLStore({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'marketpro',
    // Можно добавить опции для очистки сессий и т.п.
    // clearExpired: true,
    // checkExpirationInterval: 900000,
    // expiration: 86400000,
});

app.use(session({
    key: 'session_cookie_name', // можно изменить
    secret: process.env.SESSION_SECRET || 'default-secret',
    store: sessionStore,
    resave: false,             // не сохранять сессию, если не изменялась
    saveUninitialized: false,  // не сохранять пустые сессии
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: parseInt(process.env.SESSION_COOKIE_MAX_AGE) || 86400000, // 1 день
    },
}));

// API маршруты
app.use('/api/slider', sliderRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/subcategory', subcategoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api/product-details', productDetailRoutes);
app.use('/api/delivery', delivery);
app.use('/api/orders', (req, res, next) => {
    console.log(`Request to /api/orders: ${req.method} ${req.url}`);
    next();
}, postOrder);
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use('/api/newsletter', (req, res, next) => {
    console.log(`Request to /api/newsletter: ${req.method} ${req.url}`);
    next();
}, newsLetter);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established');

        await setupAdminPanel(app);

        app.use(express.static(path.join(__dirname, 'build')));

        if (process.env.NODE_ENV === 'production') {
            app.use(express.static(path.join(__dirname, 'build')));

            app.get(/^\/(?!api).*/, (req, res) => {
                res.sendFile(path.join(__dirname, 'build', 'index.html'));
            });
        }

        app.use('/', express.static('build'));
        app.use('/shop', express.static('build'));

        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
        });

        const server = http.createServer(app);
        server.listen(3001, () => {
            console.log('Server running at http://localhost:3001');
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
};

startServer();
