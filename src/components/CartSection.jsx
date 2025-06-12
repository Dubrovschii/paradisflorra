import React from "react";
import { Link } from "react-router-dom";
import QuantityControl from "../helper/QuantityControl";
import { useCart } from "../CartContext";

const CartSection = () => {
  // clearCart
  const { cartItems, removeFromCart, setItemQuantity } = useCart();

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
    } else {
      setItemQuantity(id, newQty);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = Number(item.product_new_price || item.product_price);
    return sum + price * item.quantity;
  }, 0);

  return (
    <section className="cart py-80">
      <div className="container container-lg">
        <div className="row gy-4">
          <div className="col-xl-9 col-lg-8">
            <div className="cart-table border border-gray-100 rounded-8 px-40 py-48">
              <div className="overflow-x-auto scroll-sm scroll-sm-horizontal">
                <table className="table style-three">
                  <thead>
                    <tr>
                      <th className="h6 mb-0 text-lg fw-bold">Șterge</th>
                      <th className="h6 mb-0 text-lg fw-bold">Nume produs</th>
                      <th className="h6 mb-0 text-lg fw-bold">Preț</th>
                      <th className="h6 mb-0 text-lg fw-bold">Cantitate</th>
                      <th className="h6 mb-0 text-lg fw-bold">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.length === 0 ? (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center" }}>
                          Coșul este gol
                        </td>
                      </tr>
                    ) : (
                      cartItems.map((item) => {
                        const price = Number(
                          item.product_new_price || item.product_price
                        );
                        return (
                          <tr key={item.product_id}>
                            <td>
                              <button
                                type="button"
                                className="remove-tr-btn flex-align gap-12 hover-text-danger-600"
                                onClick={() => removeFromCart(item.product_id)}
                              >
                                <i className="ph ph-x-circle text-2xl d-flex" />
                                Elimina
                              </button>
                            </td>
                            <td>
                              <div className="table-product d-flex align-items-center gap-24">
                                {/* sdd */}
                                <Link
                                  to={`/product-details/${item.slug}`}
                                  className="table-product__thumb border border-gray-100 rounded-8 flex-center"
                                >
                                  <img
                                    src={`${process.env.REACT_APP_BASE_URL}/uploads/products/${item.imageTitleKey}`}
                                    alt={item.product_name}
                                  />
                                </Link>
                                <div className="table-product__content text-start">
                                  <h6 className="title text-lg fw-semibold mb-8">
                                    <Link
                                      to={`/product-details/${item.product_id}`}
                                      className="link text-line-2"
                                    >
                                      {item.product_name}
                                    </Link>
                                  </h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="text-lg h6 mb-0 fw-semibold">
                                {price.toFixed(2)} MDL
                              </span>
                            </td>
                            <td>
                              <QuantityControl
                                initialQuantity={item.quantity}
                                onQuantityChange={(newQty) => {
                                  console.log(
                                    "Calling updateQuantity",
                                    item.product_id,
                                    newQty
                                  );
                                  updateQuantity(item.product_id, newQty);
                                }}
                              />
                            </td>
                            <td>
                              <span className="text-lg h6 mb-0 fw-semibold">
                                {(price * item.quantity).toFixed(2)} MDL
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4">
            <div className="cart-sidebar border border-gray-100 rounded-8 px-24 py-40">
              <h6 className="text-xl mb-32">Totaluri coș</h6>
              <div className="bg-color-three rounded-8 p-24">
                <div className="mb-10 flex-between gap-8">
                  <span className="text-gray-900 font-heading-two">
                    Subtotal
                  </span>
                  <span className="text-gray-900 fw-semibold">
                    {subtotal.toFixed(2)} MDL
                  </span>
                </div>
              </div>
              <div className="bg-color-three rounded-8 p-24 mt-24">
                <div className="flex-between gap-8">
                  <span className="text-gray-900 text-xl fw-semibold">
                    Total
                  </span>
                  <span className="text-gray-900 text-xl fw-semibold">
                    {subtotal.toFixed(2)} MDL
                  </span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="btn btn-main mt-40 py-18 w-100 rounded-8"
              >
                Finalizează cumpărăturile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartSection;
