import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteScrollToTop from "./helper/RouteScrollToTop.jsx";
import HomePageOne from "./pages/HomePageOne.jsx";
import HomePageTwo from "./pages/HomePageTwo.jsx";
import HomePageThree from "./pages/HomePageThree.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import ProductDetailsPageOne from "./pages/ProductDetailsPageOne.jsx";
import ProductDetailsPageTwo from "./pages/ProductDetailsPageTwo.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import BlogDetailsPage from "./pages/BlogDetailsPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import PhosphorIconInit from "./helper/PhosphorIconInit.js";
import VendorPage from "./pages/VendorPage.jsx";
import VendorDetailsPage from "./pages/VendorDetailsPage.jsx";
import VendorTwoPage from "./pages/VendorTwoPage.jsx";
import VendorTwoDetailsPage from "./pages/VendorTwoDetailsPage.jsx";
import BecomeSellerPage from "./pages/BecomeSellerPage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";
function App() {
  return (
    <BrowserRouter>
      <RouteScrollToTop />
      <PhosphorIconInit />

      <Routes>
        <Route exact path='/' element={<HomePageOne />} />
        <Route exact path='/index-two' element={<HomePageTwo />} />
        <Route exact path='/index-three' element={<HomePageThree />} />
        <Route exact path='/shop' element={<ShopPage />} />
        <Route
          exact
          path='/product-details'
          element={<ProductDetailsPageOne />}
        />
        <Route
          exact
          path='/product-details-two'
          element={<ProductDetailsPageTwo />}
        />
        <Route exact path='/cart' element={<CartPage />} />
        <Route exact path='/checkout' element={<CheckoutPage />} />
        <Route exact path='/become-seller' element={<BecomeSellerPage />} />
        <Route exact path='/wishlist' element={<WishlistPage />} />
        <Route exact path='/account' element={<AccountPage />} />
        <Route exact path='/blog' element={<BlogPage />} />
        <Route exact path='/blog-details' element={<BlogDetailsPage />} />
        <Route exact path='/contact' element={<ContactPage />} />
        <Route exact path='/vendor' element={<VendorPage />} />
        <Route exact path='/vendor-details' element={<VendorDetailsPage />} />
        <Route exact path='/vendor-two' element={<VendorTwoPage />} />
        <Route
          exact
          path='/vendor-two-details'
          element={<VendorTwoDetailsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
