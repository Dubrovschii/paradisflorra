// import React, { useState, useEffect } from "react";
// import { Helmet } from "react-helmet";

// import Preloader from "../helper/Preloader";
// import HeaderOne from "../components/HeaderOne";
// import Breadcrumb from "../components/Breadcrumb";
// import ShopSection from "../components/ShopSection";
// import ShippingOne from "../components/ShippingOne";
// import FooterOne from "../components/FooterOne";
// import ColorInit from "../helper/ColorInit";
// import ScrollToTop from "react-scroll-to-top";
// import BottomFooter from "../components/BottomFooter";
// const ShopPage = () => {
//   const pageTitle = "Magazinul de cumpărături | Numele site-ului";
//   const pageDescription =
//     "Vizualizați produsele adăugate în coșul de cumpărături. Finalizați comanda rapid și ușor.";
//   const [categorySeo, setCategorySeo] = useState(null);
//   const [subcategorySeo, setSubcategorySeo] = useState(null);
//   const canonicalUrl = `${process.env.REACT_APP_BASE_URL}/shop`;

//   return (
//     <>
//       <Helmet>
//         <title>{pageTitle}</title>
//         <meta name="description" content={pageDescription} />
//         <link rel="canonical" href={canonicalUrl} />

//         <meta property="og:title" content={pageTitle} />
//         <meta property="og:description" content={pageDescription} />
//         <meta property="og:url" content={canonicalUrl} />
//         <meta property="og:type" content="website" />
//         <meta
//           property="og:image"
//           content={`${process.env.REACT_APP_BASE_URL}/images/og-default.jpg`}
//         />
//       </Helmet>
//       {/* ColorInit */}
//       <ColorInit color="#299E60" />

//       {/* ScrollToTop */}
//       <ScrollToTop smooth color="#299E60" />

//       {/* Preloader */}
//       <Preloader />

//       {/* HeaderOne */}
//       <HeaderOne category={true} />

//       {/* Breadcrumb */}
//       <Breadcrumb title={"Shop"} />

//       {/* ShopSection */}
//       <ShopSection />

//       {/* ShippingTwo */}
//       <ShippingOne />

//       {/* FooterTwo */}
//       <FooterOne />

//       <BottomFooter />
//     </>
//   );
// };

// export default ShopPage;
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams, useSearchParams } from "react-router-dom";

import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import Breadcrumb from "../components/Breadcrumb";
import ShopSection from "../components/ShopSection";
import ShippingOne from "../components/ShippingOne";
import FooterOne from "../components/FooterOne";
import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";
import BottomFooter from "../components/BottomFooter";

const ShopPage = () => {
  const defaultTitle = "Magazinul de cumpărături | Numele site-ului";
  const defaultDesc =
    "Vizualizați produsele adăugate în coșul de cumpărături. Finalizați comanda rapid și ușor.";

  const { categorySlug = "", subcategorySlug = "" } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // SEO-поля
  const [categorySeoName, setCategorySeoName] = useState("");
  const [categorySeoDescr, setCategorySeoDescr] = useState("");
  const [subcategorySeoName, setSubcategorySeoName] = useState("");
  const [subcategorySeoDescr, setSubcategorySeoDescr] = useState("");

  const [pageTitle, setPageTitle] = useState(defaultTitle);
  const [pageDescription, setPageDescription] = useState(defaultDesc);

  const canonicalUrl =
    `${process.env.REACT_APP_BASE_URL}/shop` +
    (categorySlug ? `/${categorySlug}` : "") +
    (subcategorySlug ? `/${subcategorySlug}` : "");

  useEffect(() => {
    if (!categorySlug) {
      setCategorySeoName("");
      setCategorySeoDescr("");
      return;
    }

    const fetchAllCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/category`
        );
        if (!res.ok) throw new Error("Failed to load categories");
        const data = await res.json();
        const match = data.find((cat) => cat.slug === categorySlug);
        if (match) {
          setCategorySeoName(match.seo_name || "");
          setCategorySeoDescr(match.seo_descr || "");
        } else {
          setCategorySeoName("");
          setCategorySeoDescr("");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategorySeoName("");
        setCategorySeoDescr("");
      }
    };

    fetchAllCategories();
  }, [categorySlug]);

  // Подгружаем SEO-поля подкатегории
  useEffect(() => {
    if (!subcategorySlug) {
      setSubcategorySeoName("");
      setSubcategorySeoDescr("");
      return;
    }

    const fetchAllSubcategories = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/subcategory`
        );
        if (!res.ok) throw new Error("Failed to load subcategories");
        const data = await res.json();
        const match = data.find((sub) => sub.slug === subcategorySlug);
        if (match) {
          setSubcategorySeoName(match.seo_name || "");
          setSubcategorySeoDescr(match.seo_description || "");
        } else {
          setSubcategorySeoName("");
          setSubcategorySeoDescr("");
        }
      } catch (err) {
        console.error("Error fetching subcategories:", err);
        setSubcategorySeoName("");
        setSubcategorySeoDescr("");
      }
    };

    fetchAllSubcategories();
  }, [subcategorySlug]);

  // Формируем итоговый title/description
  // useEffect(() => {
  //   if (subcategorySeoName && categorySeoName) {
  //     // Если есть и категория, и подкатегория — комбинируем
  //     setPageTitle(
  //       `${subcategorySeoName} – ${categorySeoName} | Magazinul de cumpărături`
  //     );
  //     // Если у подкатегории есть описание, используем его, иначе — описание категории, иначе — дефолт
  //     setPageDescription(`${categorySeoDescr}-${subcategorySeoDescr}`);
  //   } else if (subcategorySeoName) {
  //     setPageTitle(`${subcategorySeoName} | Magazinul de cumpărături`);
  //     setPageDescription(`${categorySeoDescr}${subcategorySeoDescr}`);
  //   } else if (categorySeoName) {
  //     setPageTitle(`${categorySeoName} | Magazinul de cumpărături`);
  //     setPageDescription(categorySeoDescr || defaultDesc);
  //   } else {
  //     setPageTitle(defaultTitle);
  //     setPageDescription(defaultDesc);
  //   }
  // }, [
  //   categorySeoName,
  //   categorySeoDescr,
  //   subcategorySeoName,
  //   subcategorySeoDescr,
  // ]);
  useEffect(() => {
    if (subcategorySeoName && categorySeoName) {
      // Если есть и категория, и подкатегория — комбинируем title и описания через «–»
      setPageTitle(
        `${subcategorySeoName} – ${categorySeoName} | Magazinul de cumpărături`
      );
      setPageDescription(`${categorySeoDescr} – ${subcategorySeoDescr}`);
    } else if (subcategorySeoName) {
      // Только подкатегория
      setPageTitle(`${subcategorySeoName} | Magazinul de cumpărături`);
      setPageDescription(subcategorySeoDescr || defaultDesc);
    } else if (categorySeoName) {
      // Только категория
      setPageTitle(`${categorySeoName} | Magazinul de cumpărături`);
      setPageDescription(categorySeoDescr || defaultDesc);
    } else {
      // Ничего нет
      setPageTitle(defaultTitle);
      setPageDescription(defaultDesc);
    }
  }, [
    categorySeoName,
    categorySeoDescr,
    subcategorySeoName,
    subcategorySeoDescr,
  ]);

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
      <ScrollToTop smooth color="#299E60" />
      <Preloader />
      <HeaderOne category={true} />
      <Breadcrumb title={"Toate florile"} />

      <ShopSection
        categorySlug={categorySlug}
        subcategorySlug={subcategorySlug}
        searchQuery={searchQuery}
      />

      <ShippingOne />
      <FooterOne />
      <BottomFooter />
    </>
  );
};

export default ShopPage;
