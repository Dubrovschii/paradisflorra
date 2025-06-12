import React from "react";
import { Helmet } from "react-helmet";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import BannerOne from "../components/BannerOne";
import FeatureOne from "../components/FeatureOne";
import RecommendedOne from "../components/RecommendedOne";
import TopVendorsOne from "../components/TopVendorsOne";
import BestSellsOne from "../components/BestSellsOne";
import DeliveryOne from "../components/DeliveryOne";
import OrganicOne from "../components/OrganicOne";
import ShortProductOne from "../components/ShortProductOne";
import ShippingOne from "../components/ShippingOne";
import NewsletterOne from "../components/NewsletterOne";
import FooterOne from "../components/FooterOne";
import BottomFooter from "../components/BottomFooter";
import ScrollToTop from "react-scroll-to-top";
import ColorInit from "../helper/ColorInit";
const HomePageOne = () => {
  const pageTitle = "Home Categorii Subcategorie Produs Reducere";
  const pageDescription =
    "Vizualizați produsele adăugate în coșul de cumpărături. Finalizați comanda rapid și ușor.";
  const canonicalUrl = `${process.env.REACT_APP_BASE_URL}/`;

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
      {/* Preloader */}
      <Preloader />
      {/* ScrollToTop */}
      <ScrollToTop smooth color="#299E60" />
      {/* ColorInit */}
      <ColorInit color={false} />
      {/* HeaderOne */}
      <HeaderOne />
      {/* BannerOne */}
      <BannerOne />
      {/* FeatureOne */}
      <FeatureOne />
      {/* OrganicOne */}
      <OrganicOne />
      {/* RecommendedOne */}
      <RecommendedOne />
      {/* BestSellsOne */}
      <BestSellsOne />
      {/* TopVendorsOne */}
      <TopVendorsOne />
      {/* DeliveryOne */}
      <DeliveryOne />
      {/* ShortProductOne */}
      <ShortProductOne />
      {/* NewsletterOne */}
      {/* ShippingOne */}
      <ShippingOne />
      <NewsletterOne />
      {/* FooterOne */}
      <FooterOne />
      {/* BottomFooter */}
      <BottomFooter />
    </>
  );
};

export default HomePageOne;
