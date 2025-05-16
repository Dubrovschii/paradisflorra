const express = require('express');
const http = require('http');
const cors = require('cors');
const session = require('express-session');
const sequelize = require('./config/database.js');
const dotenv = require('dotenv');
const path = require('path');

const sliderRoutes = require('./routes/slider.js');
const categoryRoutes = require('./routes/category.js');
const subcategoryRoutes = require('./routes/subcategory.js');
const productRoutes = require('./routes/product.js');
const locationsRoutes = require('./routes/locations.js');
const setupAdminPanel = require('./adminpanel.js');

dotenv.config();

const app = express();

app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://app.vetro.md',
        'https://flowers.vetro.md'
    ],
    credentials: true,
}));

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'default-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: parseInt(process.env.SESSION_COOKIE_MAX_AGE) || 86400000,
    },
}));

// API маршруты
app.use('/api/slider', sliderRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/subcategory', subcategoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/locations', locationsRoutes);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established');

        await setupAdminPanel(app);

        if (process.env.NODE_ENV === 'production') {
            // Отдаём React билд
            app.use(express.static(path.join(__dirname, 'build')));

            // SPA fallback для всех путей, кроме /api
            app.get(/^\/(?!api).*/, (req, res) => {
                res.sendFile(path.join(__dirname, 'build', 'index.html'));
            });
        }

        // Создаём сервер вручную
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
