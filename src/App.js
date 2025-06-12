import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteScrollToTop from "./helper/RouteScrollToTop.jsx";
import PhosphorIconInit from "./helper/PhosphorIconInit.js";

import HomePageOne from "./pages/HomePageOne.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import ProductDetailsPageOne from "./pages/ProductDetailsPageOne.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import DeliveryPage from "./pages/DeliveryPage.jsx";
import Modal from "./components/Modal";
import { CartProvider } from "./CartContext";
import { CategoryProvider } from './context/CategoryContext';
import { ProductProvider } from './context/ProductContext';
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const openModal = (products) => {
    setRelatedProducts(products);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <CartProvider>
      <ProductProvider>
        <CategoryProvider>
          <BrowserRouter>
            <RouteScrollToTop />
            <PhosphorIconInit />

            {isModalOpen && (
              <Modal onClose={closeModal} relatedProducts={relatedProducts} />
            )}

            <Routes>
              <Route exact path='/' element={<HomePageOne />} />
              <Route exact path='/shop' element={<ShopPage />} />
              <Route
                path="/shop/:categorySlug?/:subcategorySlug?"
                element={<ShopPage />}
              />
              <Route
                exact
                path='/product-details/:id'
                element={<ProductDetailsPageOne openModal={openModal} />}
              />

              <Route exact path='/cart' element={<CartPage />} />
              <Route exact path='/checkout' element={<CheckoutPage />} />
              <Route exact path='/contact' element={<ContactPage />} />
              <Route exact path='/delivery' element={<DeliveryPage />} />
              <Route exact path='/terms' element={<TermsPage />} />
            </Routes>
          </BrowserRouter>
        </CategoryProvider>
      </ProductProvider>
    </CartProvider>
  );
}

export default App;
