// const uploadFeature = require('@adminjs/upload');
// const SafeLocalProvider = require('./SafeLocalProvider');
// const path = require('path');
// const product = require('../models/product.js');
// const formatToUTCString = (val) => {
//   const date = new Date(val);
//   const year = date.getUTCFullYear();
//   const month = String(date.getUTCMonth() + 1).padStart(2, '0');
//   const day = String(date.getUTCDate()).padStart(2, '0');
//   const hours = String(date.getUTCHours()).padStart(2, '0');
//   const minutes = String(date.getUTCMinutes()).padStart(2, '0');
//   const seconds = String(date.getUTCSeconds()).padStart(2, '0');
//   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
// };

// const toUTCWithoutShift = (val) => {
//   if (!val) return val;
//   const localDate = new Date(val);
//   const utcDate = new Date(Date.UTC(
//     localDate.getFullYear(),
//     localDate.getMonth(),
//     localDate.getDate(),
//     localDate.getHours(),
//     localDate.getMinutes(),
//     localDate.getSeconds()
//   ));
//   return utcDate.toISOString();
// };

// const productOptions = {
//   resource: product,
//   properties: {
//   product_id: {
//     position: 1,
//     isVisible: { list: true, filter: true, show: true, edit: false },
//   },
//   product_name: { position: 2 },
//   product_category: {
//   type: 'mixed',
//   isArray: true,
//   label: 'Категории',
//   isVisible: { edit: true, list: false, show: true, filter: false },
//   reference: 'backend_category',
//   position: 3,
//   },
//   product_subcategory: {
//     type: 'mixed',
//     isArray: true,
//     label: 'СабКатегории',
//     isVisible: { edit: true, list: false, show: true, filter: false },
//     reference: 'backend_subcategory',
//     position: 4,
//   },
//   imageTitleFile: { position: 5 },
//   imageSliderFile: { position: 6 },

//   product_price: { position: 7 },
//   product_old_price: { position: 8 },
//   product_new_price: { position: 9 },

//   date_for_sale: { position: 10 },
//   sale_start_date: {
//     position: 11,
//     type: 'datetime',
//   },

//   product_count: { position: 12 },
//   product_descr: { position: 13 },
//   product_more_details: {
//       type: 'textarea',
//       isArray: true,
//       label: 'СабКатегории',
//       isVisible: { edit: true, list: false, show: true, filter: false },
//       position: 14,
//     },
//   is_for_bouquet: { position: 15 },
//   is_for_sale: { position: 16 },
//   is_for_coupon: { position: 17 },

//   product_rating: { position: 18 },
//   imageTitleFilePath: { isVisible: false },
//   imageSliderFilePath: { isVisible: false },
//   imageTitleMime: { isVisible: false },
//   imageTitleSize: { isVisible: false },
//   imageTitleKey: { isVisible: false },
//   imageTitleBucket: { isVisible: false },
//   imageSliderSize: { isVisible: false },
//   imageSliderKey: { isVisible: false },
//   imageSliderBucket: { isVisible: false },
//   imageSliderMime: { isVisible: false },
// },

//   actions: {
//     new: {
//       before: async (request) => {
//         ['product_price', 'product_old_price', 'product_new_price'].forEach((field) => {
//           if (request.payload?.[field] === '') {
//             request.payload[field] = null;
//           }
//         });

//         if (request.payload?.sale_start_date) {
//           request.payload.sale_start_date = toUTCWithoutShift(request.payload.sale_start_date);
//         }

//         return request;
//       },
//       after: async (response) => {
//         const val = response.record?.params?.sale_start_date;
//         if (val) {
//           response.record.params.sale_start_date = formatToUTCString(val);
//         }
//         return response;
//       },
//     },
//     edit: {
//       before: async (request) => {
//         ['product_price', 'product_old_price', 'product_new_price'].forEach((field) => {
//           if (request.payload?.[field] === '') {
//             request.payload[field] = null;
//           }
//         });

//         if (request.payload?.sale_start_date) {
//           request.payload.sale_start_date = toUTCWithoutShift(request.payload.sale_start_date);
//         }

//         return request;
//       },
//       after: async (response) => {
//         const val = response.record?.params?.sale_start_date;
//         if (val) {
//           response.record.params.sale_start_date = formatToUTCString(val);
//         }
//         return response;
//       },
//     },
//     list: {
//       after: async (response) => {
//         if (response.records) {
//           response.records.forEach((record) => {
//             const val = record.params.sale_start_date;
//             if (val) {
//               record.params.sale_start_date = formatToUTCString(val);
//             }
//           });
//         }
//         return response;
//       },
//     },
//     show: {
//       after: async (response) => {
//         const val = response.record?.params?.sale_start_date;
//         if (val) {
//           response.record.params.sale_start_date = formatToUTCString(val);
//         }
//         return response;
//       },
//     },
//   },
//   parent: {
//     name: 'Produse',
//   },
// };

// const productFeatures = (componentLoader) => [
//   uploadFeature({
//     provider: new SafeLocalProvider(
//       // '/home/ionnelli/public_html/flowers.vetro.md/public/uploads/product-images'
//     path.resolve('public', 'uploads', 'products')
//     ,
//     { baseUrl: '/uploads/products', providerName: 'imagesTitle' }
//     ),
//     properties: {
//     file: 'imageTitleFile',
//     filePath: 'imageTitleFilePath',
//     filesToDelete: 'imageFilesToDelete',
//     key: 'imageTitleKey',
//     mimeType: 'imageTitleMime',
//     bucket: 'imageTitleBucket',
//     size: 'imageTitleSize',
//     },
//     uploadPath: (record, filename) => {
//     return `${record.id()}/${filename}`;
//     },
//     }),
//     uploadFeature({
//     provider: new SafeLocalProvider(
//     path.resolve('public', 'uploads', 'products'),
//     // '/home/ionnelli/public_html/flowers.vetro.md/public/uploads/product-slider',
//     { baseUrl: '/uploads/products', providerName: 'Images Slider' }
//     ),properties: {
//     file: 'imageSliderFile',
//     filePath: 'imageSliderFilePath',
//     filesToDelete: 'imageSliderFileToDelete',
//     key: 'imageSliderKey',
//     mimeType: 'imageSliderMime',
//     bucket: 'imageSliderBucket',
//     size: 'imageSliderSize',
//     },
//     multiple: true,
//     uploadPath: (record, filename) => {
//     return `${record.id()}/${filename}`;
//     },
//     }),
// ];

// module.exports = {
//   productOptions,
//   productFeatures,
// };

const uploadFeature = require('@adminjs/upload');
const SafeLocalProvider = require('./SafeLocalProvider');
const path = require('path');
const product = require('../models/product.js');
const backendCategory = require('../models/category');  // импорт модели категорий

const formatToUTCString = (val) => {
  const date = new Date(val);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const toUTCWithoutShift = (val) => {
  if (!val) return val;
  const localDate = new Date(val);
  const utcDate = new Date(Date.UTC(
    localDate.getFullYear(),
    localDate.getMonth(),
    localDate.getDate(),
    localDate.getHours(),
    localDate.getMinutes(),
    localDate.getSeconds()
  ));
  return utcDate.toISOString();
};

const productOptions = {
  resource: product,
  properties: {
    product_id: {
      position: 1,
      isVisible: { list: true, filter: true, show: true, edit: false },
    },
    product_name: { position: 2 },
    product_category: {
      type: 'mixed',
      isArray: true,
      label: 'Категории',
      isVisible: { edit: true, list: false, show: true, filter: false },
      reference: 'backend_category',
      position: 3,
    },
    product_subcategory: {
      type: 'mixed',
      isArray: true,
      label: 'СабКатегории',
      isVisible: { edit: true, list: false, show: true, filter: false },
      reference: 'backend_subcategory',
      position: 4,
    },
    slug: { position: 5 },
    seo_name: { position: 5 },
    imageTitleFile: { position: 5 },
    imageSliderFile: { position: 6 },
    product_price: { position: 7 },
    product_old_price: { position: 8 },
    product_new_price: { position: 9 },
    date_for_sale: { position: 10 },
    sale_start_date: {
      position: 11,
      type: 'datetime',
    },
    product_count: { position: 12 },
    product_descr: { position: 13 },
    product_more_details: {
      type: 'textarea',
      isArray: true,
      label: 'СабКатегории',
      isVisible: { edit: true, list: false, show: true, filter: false },
      position: 14,
    },
    is_for_bouquet: { position: 15 },
    is_for_sale: { position: 16 },
    is_for_coupon: { position: 17 },
    product_rating: { position: 18 },
    imageTitleFilePath: { isVisible: false },
    imageSliderFilePath: { isVisible: false },
    imageTitleMime: { isVisible: false },
    imageTitleSize: { isVisible: false },
    imageTitleKey: { isVisible: false },
    imageTitleBucket: { isVisible: false },
    imageSliderSize: { isVisible: false },
    imageSliderKey: { isVisible: false },
    imageSliderBucket: { isVisible: false },
    imageSliderMime: { isVisible: false },
  },

  actions: {
    new: {
      before: async (request) => {
        ['product_price', 'product_old_price', 'product_new_price'].forEach((field) => {
          if (request.payload?.[field] === '') {
            request.payload[field] = null;
          }
        });

        if (request.payload?.sale_start_date) {
          request.payload.sale_start_date = toUTCWithoutShift(request.payload.sale_start_date);
        }

        return request;
      },
      after: async (response) => {
        const val = response.record?.params?.sale_start_date;
        if (val) {
          response.record.params.sale_start_date = formatToUTCString(val);
        }
        return response;
      },
    },
    edit: {
      before: async (request) => {
        ['product_price', 'product_old_price', 'product_new_price'].forEach((field) => {
          if (request.payload?.[field] === '') {
            request.payload[field] = null;
          }
        });

        if (request.payload?.sale_start_date) {
          request.payload.sale_start_date = toUTCWithoutShift(request.payload.sale_start_date);
        }

        return request;
      },
      after: async (response) => {
        const val = response.record?.params?.sale_start_date;
        if (val) {
          response.record.params.sale_start_date = formatToUTCString(val);
        }
        return response;
      },
    },
    list: {
      after: async (response) => {
        if (response.records) {
          for (const record of response.records) {
            const val = record.params.sale_start_date;
            if (val) {
              record.params.sale_start_date = formatToUTCString(val);
            }

            // ПРЕОБРАЗОВАНИЕ product_category в массив объектов {id, name}
            const catIds = record.params.product_category || [];
            if (catIds.length > 0) {
              const categories = await backendCategory.findAll({
                where: { id: catIds },
                attributes: ['id', 'name'],
              });
              record.params.product_category = categories.map(c => ({ id: c.id, name: c.name }));
            }
          }
        }
        return response;
      },
    },
    show: {
      after: async (response) => {
        const val = response.record?.params?.sale_start_date;
        if (val) {
          response.record.params.sale_start_date = formatToUTCString(val);
        }

        // ПРЕОБРАЗОВАНИЕ product_category в массив объектов {id, name}
        const catIds = response.record?.params?.product_category || [];
        if (catIds.length > 0) {
          const categories = await backendCategory.findAll({
            where: { id: catIds },
            attributes: ['id', 'name'],
          });
          response.record.params.product_category = categories.map(c => ({ id: c.id, name: c.name }));
        }

        return response;
      },
    },
  },
  parent: {
    name: 'Produse',
  },
};

const productFeatures = (componentLoader) => [
  uploadFeature({
    provider: new SafeLocalProvider(
      path.resolve('public', 'uploads', 'products'),
      { baseUrl: '/uploads/products', providerName: 'imagesTitle' }
    ),
    properties: {
      file: 'imageTitleFile',
      filePath: 'imageTitleFilePath',
      filesToDelete: 'imageFilesToDelete',
      key: 'imageTitleKey',
      mimeType: 'imageTitleMime',
      bucket: 'imageTitleBucket',
      size: 'imageTitleSize',
    },
    uploadPath: (record, filename) => `${record.id()}/${filename}`,
  }),
  uploadFeature({
    provider: new SafeLocalProvider(
      path.resolve('public', 'uploads', 'products'),
      { baseUrl: '/uploads/products', providerName: 'Images Slider' }
    ),
    properties: {
      file: 'imageSliderFile',
      filePath: 'imageSliderFilePath',
      filesToDelete: 'imageSliderFileToDelete',
      key: 'imageSliderKey',
      mimeType: 'imageSliderMime',
      bucket: 'imageSliderBucket',
      size: 'imageSliderSize',
    },
    multiple: true,
    uploadPath: (record, filename) => `${record.id()}/${filename}`,
  }),
];

module.exports = {
  productOptions,
  productFeatures,
};
