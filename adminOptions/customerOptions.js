const customerOptions = {
  parent: {
    name: 'Potențial client nou',
  },
  properties: {
    createdAt: {
      isVisible: { edit: false, show: true, list: true, filter: true },
    },
  },
  listProperties: [
    'id',
    'customer_name',
    'customer_phone',
    'createdAt',
  ],
  showProperties: [
    'id',
    'customer_name',
    'customer_phone',
    'createdAt',
  ],
};

module.exports = { customerOptions };
