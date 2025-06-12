import React from "react";
import { Helmet } from "react-helmet";
import Preloader from "../helper/Preloader";
import ColorInit from "../helper/ColorInit";
import HeaderOne from "../components/HeaderOne";
import Breadcrumb from "../components/Breadcrumb";
import FooterOne from "../components/FooterOne";
import BottomFooter from "../components/BottomFooter";
import CartSection from "../components/CartSection";
import ShippingOne from "../components/ShippingOne";
import ScrollToTop from "react-scroll-to-top";

const CartPage = () => {
  const pageTitle = "Coș de cumpărături | Numele site-ului";
  const pageDescription =
    "Vizualizați produsele adăugate în coșul de cumpărături. Finalizați comanda rapid și ușor.";
  const canonicalUrl = `${process.env.REACT_APP_BASE_URL}/cart`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`${process.env.REACT_APP_BASE_URL}/images/og-default.jpg`}
        />
      </Helmet>

      <ColorInit color="#299E60" />
      <ScrollToTop smooth />
      <Preloader />
      <HeaderOne category={true} />
      <Breadcrumb title={"Coş"} />
      <CartSection />
      <ShippingOne />
      <FooterOne />
      <BottomFooter />
    </>
  );
};

export default CartPage;
