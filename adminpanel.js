const AdminJS = require('adminjs');
const AdminJSSequelize = require('@adminjs/sequelize');
const AdminJSExpress = require('@adminjs/express');
// const AdminJSOptions = require('./adminOptions/index.js');
const { AdminJSOptions } = require('./adminOptions/index.js');

const { componentLoader } = require('./adminOptions/componentLoader.js'); // <-- Деструктуризация!
const sequelize = require('./config/database.js');


AdminJS.registerAdapter(AdminJSSequelize);

const DEFAULT_ADMIN = {
    email: 'admin@example.com',
    password: 'password',
};

const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN);
    }
    return null;
};

async function setupAdminPanel(app) {
    try {
        // Проверяем соединение с базой
        await sequelize.authenticate();
        console.log('✅ Database connection established for AdminJS');

        const adminJs = new AdminJS({
            ...AdminJSOptions,
            componentLoader,
            rootPath: '/admin',
        });

        const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
            adminJs,
            {
                authenticate,
                cookiePassword: process.env.COOKIE_SECRET || 'super-secret-cookie',
            },
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

        adminJs.watch();
    } catch (error) {
        console.error('❌ Failed to connect to database for AdminJS:', error);
        throw error;
    }
}

module.exports = setupAdminPanel;
