import React from "react";

const OrderItemsShow = ({ record }) => {
  const params = record?.params || {};

  const itemsData = [];
  let index = 0;
  while (params[`items.${index}.product_id`] !== undefined) {
    itemsData.push({
      product_id: params[`items.${index}.product_id`],
      product_name: params[`items.${index}.product_name`],
      quantity: params[`items.${index}.quantity`],
      price: params[`items.${index}.price`],
    });
    index++;
  }

  return (
    <div
      className="order-items-show"
      style={{
        backgroundColor: "#f0f0f0",
        padding: "1rem",
        borderRadius: "4px",
      }}
    >
      <h3>Articole în ordine:</h3>
      {itemsData.length > 0 ? (
        itemsData.map((item, idx) => (
          <di
            key={idx}
            className="order-item"
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <p>
              <strong>Nume:</strong> {item.product_name}
            </p>
            <p>
              <strong>ID:</strong> {item.product_id}
            </p>
            <p>
              <strong>Cantitate:</strong> {item.quantity}
            </p>
            <p>
              <strong>Preţ:</strong> {item.price}
            </p>
          </di>
        ))
      ) : (
        <p>— Nu există produse în comandă —</p>
      )}
    </div>
  );
};

export default OrderItemsShow;
