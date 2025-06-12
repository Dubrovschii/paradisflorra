const uploadFeature = require('@adminjs/upload');
const path = require('path');
const SafeLocalProvider = require('./SafeLocalProvider');

const categoryOptions = {
    properties: {
        imageFilePath: { isVisible: false },
        imageMime: { isVisible: false },
        imageSize: { isVisible: false },
        imageKey: { isVisible: false },
        imageBucket: { isVisible: false },
        imageBackgroundFilePath: { isVisible: false },
        imageBackgroundMime: { isVisible: false },
        imageBackgroundSize: { isVisible: false },
        imageBackgroundBucket: { isVisible: false },
        // image: {
        //     type: 'mixed',
        //     isVisible: {
        //         edit: true,
        //         list: true,
        //         show: true,
        //         filter: false,
        //     },
        // },
    },
    parent: {
        name: 'Categorie si Subcategorie',
    },
};


const categoryFeatures = (componentLoader) => [
  uploadFeature({
    provider: new SafeLocalProvider(
      '/home/ionnelli/public_html/flowers.vetro.md/public/uploads/categorie'
    // path.resolve('public', 'uploads', 'categorie')
    ,
    { baseUrl: '/uploads/categorie', providerName: 'imagesTitle' }
    ),
    properties: {
    file: 'imageFile',
    filePath: 'imageFilePath',
    filesToDelete: 'imageFilesToDelete',
    key: 'imageKey',
    mimeType: 'imageMime',
    bucket: 'imageBucket',
    size: 'imageSize',
    },
    uploadPath: (record, filename) => {
    return `${record.id()}/${filename}`;
    },
    }),
    uploadFeature({
    provider: new SafeLocalProvider(
    path.resolve('public', 'uploads', 'categorie'),
    '/home/ionnelli/public_html/flowers.vetro.md/public/uploads/categorie',
    { baseUrl: '/uploads/categorie', providerName: 'Images Background' }
    ),properties: {
    file: 'imageBackgroundFile',
    filePath: 'imageBackgroundFilePath',
    filesToDelete: 'imageBackgroundFileToDelete',
    key: 'imageBackgroundKey',
    mimeType: 'imageBackgroundMime',
    bucket: 'imageBackgroundBucket',
    size: 'imageBackgroundSize',
    },
    multiple: true,
    uploadPath: (record, filename) => {
    return `${record.id()}/${filename}`;
    },
    }),
];
module.exports = {
    categoryOptions,
    categoryFeatures,
};
