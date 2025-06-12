const { Components } = require('./componentLoader.js');

const orderOptions = {
  properties: {
    items: {
      components: {
        show: Components.OrderItemsShow, 
      },
      isVisible: {
        list: false,
        edit: false,
        filter: false,
        show: true,
      },
      label: 'Items',
    },
    created_at: {
      isVisible: { edit: false, show: true, list: true, filter: true },
    },
 
  },
     parent: {
    name: 'Comanda',
  },
  listProperties: [
    'id',
    'first_name',
    'last_name',
    'phone',
    'total_price',
    'created_at',
  ],
  showProperties: [
    'id',
    'first_name',
    'last_name',
    'phone',
    'email',
    'city',
    'district',
    'street',
    'house_number',
    'apartment',
    'notes',
    'payment_method',
    'total_price',
    'items',
    'created_at',
  ],
};

module.exports = { orderOptions };

