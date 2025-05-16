
// import uploadFeature from '@adminjs/upload';
// import path from 'path';
// export const categoryOptions = {
//     properties: {
//         image: {
//             type: 'mixed',
//             isVisible: {
//                 edit: true,
//                 list: true,
//                 show: true,
//                 filter: false
//             },
//         },
//     },
//     parent: {
//         name: 'Category',
//     },
// };

// export const categoryFeatures = (componentLoader) => [
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
//             key: 'image.path',
//             file: 'image',
//             filesToDelete: 'image.toDelete',
//             bucket: 'image.bucket',
//             mimeType: 'image.mimeType',
//         },
//         multiple: true,
//         validation: {
//             mimeTypes: ['image/png', 'image/jpeg', 'image/webp']
//         },
//         uploadPath: (record, filename) => {
//             return `categoty/${record.id()}/${Date.now()}-${filename}`;
//         },
//     })
// ];
const uploadFeature = require('@adminjs/upload');
const path = require('path');

const categoryOptions = {
    properties: {
        image: {
            type: 'mixed',
            isVisible: {
                edit: true,
                list: true,
                show: true,
                filter: false,
            },
        },
    },
    parent: {
        name: 'Category',
    },
};

const categoryFeatures = (componentLoader) => [
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
            key: 'image.path',
            file: 'image',
            filesToDelete: 'image.toDelete',
            bucket: 'image.bucket',
            mimeType: 'image.mimeType',
        },
        multiple: true,
        validation: {
            mimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
        },
        uploadPath: (record, filename) => {
            return `category/${record.id()}/${Date.now()}-${filename}`;
        },
    }),
];

module.exports = {
    categoryOptions,
    categoryFeatures,
};
