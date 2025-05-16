const { Slider, Category, Subcategory, Product } = require('../models/index.js');
const { productOptions, productFeatures } = require('./productOption.js');
const { promoSliderOptions, promoSliderFeatures } = require('./promoSliderOptions.js');
const { categoryOptions, categoryFeatures } = require('./categoryOptions.js');
const { subcategoryOptions, subcategoryFeatures } = require('./subcategoryOptions.js');
const { componentLoader, Components } = require('./componentLoader.js');

// Экспортируем опции AdminJS
const AdminJSOptions = {
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

module.exports = { AdminJSOptions };
