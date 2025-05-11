// import AdminJS from 'adminjs';
// import path from 'path';
// import { fileURLToPath } from 'url';
import { Slider, Category, Subcategory, Product } from '../models/index.js';
import { productOptions, productFeatures } from './productOption.js'
import { promoSliderOptions, promoSliderFeatures } from './promoSliderOptions.js'
import { categoryOptions, categoryFeatures } from './categoryOptions.js'
import { subcategoryOptions, subcategoryFeatures } from './subcategoryOptions.js'
import { componentLoader, Components } from './componentLoader.js';


// Экспортируем опции AdminJS
export const AdminJSOptions = {
    componentLoader,
    resources: [
        {
            resource: Slider,
            options: promoSliderOptions,
            features: promoSliderFeatures(componentLoader),
        },
        {
            resource: Category,
            options: categoryOptions,
            features: categoryFeatures(componentLoader),
        },
        {
            resource: Subcategory,
            options: subcategoryOptions,
            features: subcategoryFeatures(componentLoader),
        },
        {
            resource: Product,
            options: productOptions,
            features: productFeatures(componentLoader),
        }
    ],
    dashboard: {
        handler: async () => ({ someData: 'example' }),
        component: Components.Dashboard,
    },
    branding: {
        companyName: 'Flowers',
        withMadeWithLove: false,
        logo: '/logo.png',
    },
};
