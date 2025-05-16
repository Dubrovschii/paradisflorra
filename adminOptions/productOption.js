
// import uploadFeature from '@adminjs/upload';
// import path from 'path';
// export const productOptions = {
//     properties: {
//         product_img: {
//             type: 'mixed',
//         },
//     },
//     parent: {
//         name: 'Product',
//         // icon: 'Shop',
//     },
// };

// export const productFeatures = (componentLoader) => [
//     uploadFeature({
//         componentLoader,
//         provider: {
//             local: {
//                 bucket: path.resolve('public', 'uploads'),
//                 opts: {
//                     baseUrl: '/uploads'
//                 }
//             }
//         },
//         properties: {
//             key: 'product_img.path',
//             file: 'product_img',
//             filesToDelete: 'product_img.toDelete',
//             bucket: 'product_img.bucket',
//             mimeType: 'product_img.mimeType',
//         },
//         multiple: true,
//         validation: {
//             mimeTypes: ['image/png', 'image/jpeg', 'image/webp']
//         },
//         uploadPath: (record, filename) => {
//             return `uploads/${record.id()}/${Date.now()}-${filename}`;
//         },
//     })
// ];
const uploadFeature = require('@adminjs/upload');
const path = require('path');

const productOptions = {
    properties: {
        product_img: {
            type: 'mixed',
        },
    },
    parent: {
        name: 'Product',
        // icon: 'Shop',
    },
};

const productFeatures = (componentLoader) => [
    uploadFeature({
        componentLoader,
        provider: {
            local: {
                bucket: path.resolve('public', 'uploads'),
                opts: {
                    baseUrl: '/uploads',
                },
            },
        },
        properties: {
            key: 'product_img.path',
            file: 'product_img',
            filesToDelete: 'product_img.toDelete',
            bucket: 'product_img.bucket',
            mimeType: 'product_img.mimeType',
        },
        multiple: true,
        validation: {
            mimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
        },
        uploadPath: (record, filename) => {
            return `uploads/${record.id()}/${Date.now()}-${filename}`;
        },
    }),
];

module.exports = {
    productOptions,
    productFeatures,
};
