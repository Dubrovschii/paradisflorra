import React from "react";
import { Helmet } from "react-helmet";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import BlogDetails from "../components/BlogDetails";
import FooterOne from "../components/FooterOne";
import BottomFooter from "../components/BottomFooter";
import ScrollToTop from "react-scroll-to-top";
import ColorInit from "../helper/ColorInit";
const DeliveryPage = () => {
  const pageTitle = "Paradis Florra delivery";
  const pageDescription = "Delivery Paradis Florra.";
  const canonicalUrl = `${process.env.REACT_APP_BASE_URL}/contact`;
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
      <BlogDetails />

      {/* FooterOne */}
      <FooterOne />
      {/* BottomFooter */}
      <BottomFooter />
    </>
  );
};

export default DeliveryPage;
