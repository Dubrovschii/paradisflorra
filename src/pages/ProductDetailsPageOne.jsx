import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Preloader from "../helper/Preloader";
import HeaderOne from "../components/HeaderOne";
import ProductDetailsOne from "../components/ProductDetailsOne";
import NewArrivalTwo from "../components/NewArrivalTwo";
import ShippingOne from "../components/ShippingOne";
import NewsletterOne from "../components/NewsletterOne";
import FooterOne from "../components/FooterOne";
import BottomFooter from "../components/BottomFooter";
import BreadcrumbTwo from "../components/BreadcrumbTwo";
import Modal from "../components/Modal";
import ScrollToTop from "react-scroll-to-top";
import ColorInit from "../helper/ColorInit";

const ProductDetailsPageOne = () => {
  const [product, onSetProduct] = useState(null);
  const [categorySeo, setCategorySeo] = useState(null);
  const [subcategorySeo, setSubcategorySeo] = useState(null);

  useEffect(() => {
    const fetchSeoNames = async () => {
      if (!product) return;

      // Получаем categoryId и subcategoryId как строки (из массива)
      let categoryId = product.product_category;
      let subcategoryId = product.product_subcategory;

      // Обработка, если это массивы
      if (Array.isArray(categoryId)) {
        categoryId = categoryId[0]; // берём первый валидный
      }
      if (Array.isArray(subcategoryId)) {
        subcategoryId = subcategoryId.find((val) => val); // пропускаем пустые строки
      }

      // console.log("Category ID:", categoryId);
      // console.log("Subcategory ID:", subcategoryId);

      if (!categoryId || !subcategoryId) return;

      try {
        const [categoryRes, subcategoryRes] = await Promise.all([
          fetch(`${process.env.REACT_APP_BASE_URL}/api/category`),
          fetch(`${process.env.REACT_APP_BASE_URL}/api/subcategory`),
        ]);

        const [categoryData, subcategoryData] = await Promise.all([
          categoryRes.json(),
          subcategoryRes.json(),
        ]);

        const matchedCategory = categoryData.find(
          (cat) => String(cat.id) === String(categoryId)
        );
        const matchedSubcategory = subcategoryData.find(
          (subcat) => String(subcat.id) === String(subcategoryId)
        );

        // console.log("Matched category:", matchedCategory);
        // console.log("Matched subcategory:", matchedSubcategory);

        if (matchedCategory?.seo_name) {
          setCategorySeo(matchedCategory.seo_name);
        }

        if (matchedSubcategory?.seo_name) {
          setSubcategorySeo(matchedSubcategory.seo_name);
        }
      } catch (error) {
        console.error("Eroare la încărcarea categoriilor:", error);
      }
    };

    fetchSeoNames();
  }, [product]);

  useEffect(() => {
    if (categorySeo && subcategorySeo) {
      console.log("SEO names fetched:", categorySeo, subcategorySeo);
    }
  }, [categorySeo, subcategorySeo]);

  const productName = product?.product_name || "Produs";
  const productSeoName = product?.seo_name || "Produs seo";
  // console.log(14141, productName);
  const pageTitle = `${productName} ${productSeoName} `;
  const pageDescription = `Descoperă ${productName} din categoria ${categorySeo} și subcategoria ${subcategorySeo}. Cumpără acum!`;
  const canonicalUrl = `${process.env.REACT_APP_BASE_URL}/product-details/${product?.slug}`;

  return (
    <>
      {product && (
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <link rel="canonical" href={canonicalUrl} />
        </Helmet>
      )}

      <Preloader />
      <ColorInit color={false} />
      <ScrollToTop smooth color="#299E60" />
      <HeaderOne />
      <BreadcrumbTwo title={"Detalii produs"} />

      <ProductDetailsOne onSetProduct={onSetProduct} />

      <Modal />
      <NewArrivalTwo
        category={product?.product_category || "defaultCategory"}
      />
      <ShippingOne />
      <NewsletterOne />
      <FooterOne />
      <BottomFooter />
    </>
  );
};

export default ProductDetailsPageOne;

// import React, { useState, useEffect } from "react";
// import { Helmet } from "react-helmet";
// import Preloader from "../helper/Preloader";
// import HeaderOne from "../components/HeaderOne";
// import ProductDetailsOne from "../components/ProductDetailsOne";
// import NewArrivalTwo from "../components/NewArrivalTwo";
// import ShippingOne from "../components/ShippingOne";
// import NewsletterOne from "../components/NewsletterOne";
// import FooterOne from "../components/FooterOne";
// import BottomFooter from "../components/BottomFooter";
// import BreadcrumbTwo from "../components/BreadcrumbTwo";
// import Modal from "../components/Modal";
// import ScrollToTop from "react-scroll-to-top";
// import ColorInit from "../helper/ColorInit";

// const ProductDetailsPageOne = () => {
//   const [product, onSetProduct] = useState(null);
//   const [categorySeo, setCategorySeo] = useState(null);
//   const [subcategorySeo, setSubcategorySeo] = useState(null);

//   useEffect(() => {
//     const fetchSeoNames = async () => {
//       if (!product) return;

//       const categoryId = product.product_category;
//       const subcategoryId = product.product_subcategory;
//       console.log(categoryId);
//       console.log(subcategoryId);
//       if (!categoryId || !subcategoryId) return;

//       try {
//         const [categoryRes, subcategoryRes] = await Promise.all([
//           fetch(`${process.env.REACT_APP_BASE_URL}/api/category`),
//           fetch(`${process.env.REACT_APP_BASE_URL}/api/subcategory`),
//         ]);

//         const [categoryData, subcategoryData] = await Promise.all([
//           categoryRes.json(),
//           subcategoryRes.json(),
//         ]);

//         const matchedCategory = categoryData.find(
//           (cat) => cat.id === categoryId
//         );
//         const matchedSubcategory = subcategoryData.find(
//           (subcat) => subcat.id === subcategoryId
//         );
//         console.log(13133, subcategoryId);
//         console.log(1312233, categoryId);
//         if (matchedCategory?.seo_name) {
//           setCategorySeo(matchedCategory.seo_name);
//         }

//         if (matchedSubcategory?.seo_name) {
//           setSubcategorySeo(matchedSubcategory.seo_name);
//         }
//       } catch (error) {
//         console.error("Eroare la încărcarea categoriilor:", error);
//       }
//       console.log(14141, categorySeo, subcategorySeo);
//     };

//     fetchSeoNames();
//   }, [product]);

//   const productName = product?.name || "Produs";
//   const productSlug = product?.slug || "produs";
//   useEffect(() => {
//     if (categorySeo && subcategorySeo) {
//     }
//   }, [categorySeo, subcategorySeo]);
//   console.log(15511111, categorySeo, subcategorySeo);
//   const pageTitle = `${productName} | ${categorySeo}/${subcategorySeo}`;
//   const pageDescription = `Descoperă ${productName} din categoria ${categorySeo} și subcategoria ${subcategorySeo}. Cumpără acum!`;
//   const canonicalUrl = `${process.env.REACT_APP_BASE_URL}/${categorySeo}/${subcategorySeo}/${productSlug}`;

//   return (
//     <>
//       {product && (
//         <Helmet>
//           <title>{pageTitle}</title>
//           <meta name="description" content={pageDescription} />
//           <link rel="canonical" href={canonicalUrl} />
//         </Helmet>
//       )}

//       <Preloader />
//       <ColorInit color={false} />
//       <ScrollToTop smooth color="#299E60" />
//       <HeaderOne />
//       <BreadcrumbTwo title={"Detalii produs"} />

//       <ProductDetailsOne onSetProduct={onSetProduct} />

//       <Modal />
//       <NewArrivalTwo
//         category={product?.product_category || "defaultCategory"}
//       />
//       <ShippingOne />
//       <NewsletterOne />
//       <FooterOne />
//       <BottomFooter />
//     </>
//   );
// };

// export default ProductDetailsPageOne;
