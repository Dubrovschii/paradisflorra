import React from "react";

const ImageShow = ({ record, property }) => {
  const imagePath = record.params[property.name];
  return imagePath ? (
    <div>
      <img
        src={`/uploads/products/${imagePath}`}
        style={{ maxWidth: 200, maxHeight: 200 }}
        alt="Product"
      />
    </div>
  ) : null;
};

export default ImageShow;
