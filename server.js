import express from 'express';
import cors from 'cors';
import session from 'express-session';
import sequelize from './config/database.js';
import dotenv from 'dotenv';
import sliderRoutes from './routes/slider.js';
import categoryRoutes from './routes/category.js';
import subcategoryRoutes from './routes/subcategory.js';
import productRoutes from './routes/product.js';
import locationsRoutes from './routes/locations.js';

import setupAdminPanel from './adminpanel.js';
dotenv.config();


const app = express();

app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://app.vetro.md',
        'https://flowers-dev-market.vercel.app'
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

        app.listen(process.env.PORTAdmin, () => {
            console.log('Server running at http://localhost:3001');
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
};

startServer();
