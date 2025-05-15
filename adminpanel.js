import AdminJS from 'adminjs';
import AdminJSSequelize from '@adminjs/sequelize';
import AdminJSExpress from '@adminjs/express';
import { AdminJSOptions } from './adminOptions/index.js';
import { componentLoader } from './adminOptions/componentLoader.js';
import sequelize from './config/database.js';

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

export default async function setupAdminPanel(app) {
    try {
        // Проверяем соединение с базой
        await sequelize.authenticate();
        console.log('✅ Database connection established for AdminJS');

        const adminJs = new AdminJS({
            componentLoader,
            ...AdminJSOptions,
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
        throw error; // проброс ошибки дальше, чтобы сервер не запускался без базы
    }
}
