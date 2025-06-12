// const AdminJS = require('adminjs');
// const path = require('path');

// const componentLoader = new AdminJS.ComponentLoader();

// const Components = {
//     Dashboard: componentLoader.add('Dashboard', path.join(__dirname, 'components', 'imageAdd.jsx')),
// };

// module.exports = { componentLoader, Components };

const AdminJS = require('adminjs');
const path = require('path');

const componentLoader = new AdminJS.ComponentLoader();

const Components = {
    Dashboard: componentLoader.add('Dashboard', path.join(__dirname, 'components', 'imageAdd.jsx')),
    OrderItemsShow: componentLoader.add('OrderItemsShow', path.join(__dirname, 'components', 'OrderItemsShow.jsx')), // добавлено
};

module.exports = { componentLoader, Components };
 