const uploadFeature = require('@adminjs/upload');
const path = require('path');
const SafeLocalProvider = require('./SafeLocalProvider');

const promoSliderOptions = {
    properties: {
        id: {
      position: 1,
    },
    slider_img: { position: 2,   
            type: 'mixed',
            isVisible: {
                edit: true,
                list: true,
                show: true,
                filter: false,
            },
         },
    slider_title: { position: 3 },
    slider_descr: { position: 4 },
    slider_link: { position: 5 },
    slider_link_text: { position: 6 },
     
        
    },
    parent: {
        name: 'Primul Slider',
        // icon: 'Shop',
    },
};

const promoSliderFeatures = (componentLoader) => [
    uploadFeature({
        componentLoader,
        provider: new SafeLocalProvider(
          '/home/ionnelli/public_html/flowers.vetro.md/public/uploads',
          { baseUrl: '/uploads' }
        ),
        // provider: {
        //     local: {
        //         bucket: path.resolve('public', 'uploads'),
        //         opts: {
        //             baseUrl: '/uploads',
        //         },
        //     },
        // },
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
