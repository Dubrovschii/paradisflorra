import React, { useState } from "react";

const QuantityControl = ({ initialQuantity, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleDecrease = () => {
    const newQty = quantity - 1;
    setQuantity(newQty);
    onQuantityChange(newQty);
  };

  const handleIncrease = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onQuantityChange(newQty);
  };

  return (
    <div className="d-flex rounded-4 overflow-hidden">
      <button
        type="button"
        onClick={handleDecrease}
        className="quantity__minus border border-end border-gray-100 flex-shrink-0 h-48 w-48 text-neutral-600 flex-center hover-bg-main-600 hover-text-white"
      >
        <i className="ph ph-minus" />
      </button>
      <input
        type="number"
        className="quantity__input flex-grow-1 border border-gray-100 border-start-0 border-end-0 text-center w-32 px-4"
        value={quantity}
        min={1}
        readOnly
      />
      <button
        type="button"
        onClick={handleIncrease}
        className="quantity__plus border border-end border-gray-100 flex-shrink-0 h-48 w-48 text-neutral-600 flex-center hover-bg-main-600 hover-text-white"
      >
        <i className="ph ph-plus" />
      </button>
    </div>
  );
};

export default QuantityControl;
