const { Slider, Category, Subcategory, Product, Order, Customer, Delivery } = require('../models/index.js');
const { productOptions, productFeatures } = require('./productOption.js');
const { promoSliderOptions, promoSliderFeatures } = require('./promoSliderOptions.js');
const { categoryOptions, categoryFeatures } = require('./categoryOptions.js');
const { subcategoryOptions, subcategoryFeatures } = require('./subcategoryOptions.js');
const { customerOptions } = require('./customerOptions.js');
const { componentLoader, Components } = require('./componentLoader.js');
const { orderOptions } = require('./orderOptions.js');
const { deliveryOptions } = require('./deliveryOptions.js');

const AdminJSOptions = {
  componentLoader,
  resources: [
    {
      resource: Slider,
      options: promoSliderOptions,
      features: promoSliderFeatures(componentLoader),
      id: 'backend_slider',
    },
    {
      resource: Category,
      options: categoryOptions,
      features: categoryFeatures(componentLoader),
      id: 'backend_category',
    },
    {
      resource: Subcategory,
      options: subcategoryOptions,
      features: subcategoryFeatures(componentLoader),
      id: 'backend_subcategory',
    },
    {
      resource: Product,
      options: productOptions,
      features: productFeatures(componentLoader),
      id: 'backend_product',
    },
    {
      resource: Customer,
      options: customerOptions,
      id: 'backend_customer',
    },
    {
      resource: Order,
      options: orderOptions,
      id: 'backend_order',
    },
    {
      resource: Delivery,
      options: deliveryOptions,
      id: 'backend_delivery',
    },
  ],
  dashboard: {
    handler: async () => ({ someData: 'example' }),
    component: Components.Dashboard,
  },
  branding: {
    companyName: 'Flowers',
    withMadeWithLove: false,
    logo: 'https://flowers.vetro.md/uploads/logo-flora.jpg',
  },
  assets: {
    styles: ['/admin-assets/admin-custom.css'],
  },
  locale: {
    language: 'ro',
    translations: {
      labels: {
        Slider: 'Slider',
        Category: 'Categorie',
        Subcategory: 'Subcategorie',
        Product: 'Produs',
      },

    },
  },
};

module.exports = { AdminJSOptions };
