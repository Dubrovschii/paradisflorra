
// import uploadFeature from '@adminjs/upload';
// import path from 'path';
// export const promoSliderOptions = {
//     properties: {
//         slider_img: {
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
//         name: 'Promo Slider',
//         // icon: 'Shop',
//     },
// };

// export const promoSliderFeatures = (componentLoader) => [
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
//             key: 'slider_img.path',
//             file: 'slider_img',
//             filesToDelete: 'slider_img.toDelete',
//             bucket: 'slider_img.bucket',
//             mimeType: 'slider_img.mimeType',
//         },
//         multiple: true,
//         validation: {
//             mimeTypes: ['image/png', 'image/jpeg', 'image/webp']
//         },
//         uploadPath: (record, filename) => {
//             return `promoslider/${record.id()}/${Date.now()}-${filename}`;
//         },
//     })
// ];
const uploadFeature = require('@adminjs/upload');
const path = require('path');

const promoSliderOptions = {
    properties: {
        slider_img: {
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
        name: 'Promo Slider',
        // icon: 'Shop',
    },
};

const promoSliderFeatures = (componentLoader) => [
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
            key: 'slider_img.path',
            file: 'slider_img',
            filesToDelete: 'slider_img.toDelete',
            bucket: 'slider_img.bucket',
            mimeType: 'slider_img.mimeType',
        },
        multiple: true,
        validation: {
            mimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
        },
        uploadPath: (record, filename) => {
            return `promoslider/${record.id()}/${Date.now()}-${filename}`;
        },
    }),
];

module.exports = {
    promoSliderOptions,
    promoSliderFeatures,
};
