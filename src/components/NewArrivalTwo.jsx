// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import { useCart } from "../CartContext";

// const NewArrivalTwo = ({ category }) => {
//   function SampleNextArrow(props) {
//     const { className, onClick } = props;
//     return (
//       <button
//         type="button"
//         onClick={onClick}
//         className={` ${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
//       >
//         <i className="ph ph-caret-right" />
//       </button>
//     );
//   }

//   function SamplePrevArrow(props) {
//     const { className, onClick } = props;
//     return (
//       <button
//         type="button"
//         onClick={onClick}
//         className={`${className} slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
//       >
//         <i className="ph ph-caret-left" />
//       </button>
//     );
//   }

//   useEffect(() => {}, [category]);

//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchAllProducts = async () => {
//       let allProducts = [];
//       let page = 1;
//       let totalPages = 1;

//       try {
//         while (page <= totalPages) {
//           const res = await fetch(
//             `${process.env.REACT_APP_BASE_URL}/api/product?page=${page}`
//           );
//           const data = await res.json();
//           allProducts = [...allProducts, ...(data.data || [])];

//           totalPages = data.meta?.total_pages || data.totalPages || 1;

//           page++;
//         }

//         setProducts(allProducts);
//       } catch (err) {
//         console.error("Ошибка загрузки продуктов", err);
//       }
//     };

//     fetchAllProducts();
//   }, []);

//   const filteredProducts = products.filter((product) => {
//     // console.log("prodeuse", product);
//     const productCategories = Array.isArray(product.product_category)
//       ? product.product_category.map(String)
//       : [String(product.product_category)];
//     return productCategories.some((catId) => category.includes(catId));
//   });

//   const filteredProductsLength = filteredProducts.length;
//   const slidesToShow = Math.max(filteredProductsLength - 1, 1);
//   console.log(slidesToShow);
//   const settings = {
//     dots: false,
//     arrows: true,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: slidesToShow > 1 ? 4 : slidesToShow,
//     slidesToScroll: 1,
//     initialSlide: 0,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1599,
//         settings: {
//           slidesToShow: slidesToShow > 1 ? 4 : slidesToShow,
//         },
//       },
//       {
//         breakpoint: 1399,
//         settings: {
//           slidesToShow: slidesToShow > 1 ? 4 : slidesToShow,
//         },
//       },
//       {
//         breakpoint: 992,
//         settings: {
//           slidesToShow: slidesToShow > 1 ? 4 : slidesToShow,
//         },
//       },
//       {
//         breakpoint: 575,
//         settings: {
//           slidesToShow: slidesToShow > 1 ? 4 : slidesToShow,
//         },
//       },
//       {
//         breakpoint: 424,
//         settings: {
//           slidesToShow: slidesToShow > 1 ? 4 : slidesToShow,
//         },
//       },
//     ],
//   };

//   const [quantity, setQuantity] = useState(1);
//   const { addToCart } = useCart();

//   return (
//     <section className="new-arrival pb-80">
//       <div className="container container-lg">
//         <div className="section-heading">
//           <div className="flex-between flex-wrap gap-8">
//             <h5 className="mb-0">V-ar putea plăcea și</h5>
//             <div className="flex-align mr-point gap-16">
//               <Link
//                 to="/shop"
//                 className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
//               >
//                 Toate produsele
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div className="new-arrival__slider arrow-style-two">
//           <Slider {...settings}>
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map((product) => (
//                 <div
//                   className="col-xxl-2 col-lg-3 col-sm-4 col-6"
//                   key={product.product_id}
//                 >
//                   <div className="product-card h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
//                     {!!product?.is_for_sale && (
//                       <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
//                         Cel mai vandut
//                       </span>
//                     )}
//                     <Link
//                       to={`/product-details/${product.slug}`}
//                       className="product-card__thumb flex-center"
//                     >
//                       <img
//                         src={`${process.env.REACT_APP_BASE_URL}/uploads/products/${product.imageTitleKey}`}
//                         alt={product.product_name}
//                       />
//                     </Link>
//                     <div className="product-card__content p-sm-2">
//                       <h6 className="title text-lg fw-semibold mt-12 mb-8">
//                         <Link
//                           to={`/product-details/${product.slug}`}
//                           className="link text-line-2"
//                         >
//                           {product.product_name}
//                         </Link>
//                       </h6>
//                       <div className="flex-align gap-4 mt-8">
//                         <span className="text-main-600 text-xs d-flex">
//                           Categorie :
//                         </span>
//                         <span className="text-gray-900 text-xs fw-medium ">
//                           <span className="text-heading text-xs fw-semibold ">
//                             {product.product_category &&
//                             product.product_category.length > 0
//                               ? product.product_category
//                                   .map((catId) => {
//                                     const cat = category.find(
//                                       (c) => String(c.id) === String(catId)
//                                     );
//                                     return cat ? cat.name : "Fara Categorie";
//                                   })
//                                   .join(", ")
//                               : "Fara Categorie"}
//                           </span>
//                         </span>
//                       </div>
//                       <div className="product-card__content mt-12">
//                         <div className="product-card__price my-20">
//                           {!!product?.product_old_price && (
//                             <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
//                               {`${product.product_old_price} MDL`}
//                             </span>
//                           )}
//                           <span className="text-heading text-md fw-semibold ">
//                             <span>
//                               {product.product_price != null &&
//                               product.product_price !== "0.00" &&
//                               product.product_price !== "0"
//                                 ? `${product.product_price} MDL`
//                                 : `${product.product_new_price} MDL`}
//                             </span>
//                           </span>
//                         </div>
//                         <div className="flex-align gap-6">
//                           <span className="text-xs fw-bold text-gray-600">
//                             {product.product_rating}
//                           </span>
//                         </div>
//                         <button
//                           type="button"
//                           className="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 mt-24 w-100 justify-content-center"
//                           onClick={() => {
//                             addToCart(product, quantity);
//                           }}
//                         >
//                           <i className="ph ph-shopping-cart" />
//                           Adaugă in coş
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center w-100 mt-4">
//                 Nu există produse în această categorie.
//               </p>
//             )}
//           </Slider>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NewArrivalTwo;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useCart } from "../CartContext";

const NewArrivalTwo = ({ category }) => {
  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <button
        type="button"
        onClick={onClick}
        className={` ${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
      >
        <i className="ph ph-caret-right" />
      </button>
    );
  }

  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${className} slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
      >
        <i className="ph ph-caret-left" />
      </button>
    );
  }

  useEffect(() => {}, [category]);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      let allProducts = [];
      let page = 1;
      let totalPages = 1;

      try {
        while (page <= totalPages) {
          const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/api/product?page=${page}`
          );
          const data = await res.json();
          allProducts = [...allProducts, ...(data.data || [])];

          totalPages = data.meta?.total_pages || data.totalPages || 1;

          page++;
        }

        setProducts(allProducts);
      } catch (err) {
        console.error("Ошибка загрузки продуктов", err);
      }
    };

    fetchAllProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const productCategories = Array.isArray(product.product_category)
      ? product.product_category.map(String)
      : [String(product.product_category)];
    return productCategories.some((catId) => category.includes(catId));
  });

  const filteredProductsLength = filteredProducts.length;
  console.log(filteredProductsLength);
  const slidesToShow = Math.max(filteredProductsLength - 1, 1);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: slidesToShow > 1 ? 4 : slidesToShow,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1599,
        settings: {
          slidesToShow: slidesToShow > 1 ? 4 : slidesToShow,
        },
      },
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: slidesToShow > 1 ? 4 : slidesToShow,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: slidesToShow > 1 ? 3 : slidesToShow,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: slidesToShow > 1 ? 2 : slidesToShow,
        },
      },
      {
        breakpoint: 424,
        settings: {
          slidesToShow: slidesToShow > 1 ? 1 : slidesToShow,
        },
      },
    ],
  };

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  return (
    <section className="new-arrival pb-80">
      <div className="container container-lg">
        <div className="section-heading">
          <div className="flex-between flex-wrap gap-8">
            <h5 className="mb-0">V-ar putea plăcea și</h5>
            <div className="flex-align mr-point gap-16">
              <Link
                to="/shop"
                className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
              >
                Toate produsele
              </Link>
            </div>
          </div>
        </div>
        <div className="new-arrival__slider arrow-style-two">
          {filteredProducts.length > 1 ? (
            <Slider {...settings}>
              {filteredProducts.length > 1 ? (
                filteredProducts.map((product) => (
                  <div
                    className="col-xxl-2 col-lg-3 col-sm-4 col-6"
                    key={product.product_id}
                  >
                    <div className="product-card h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                      {!!product?.is_for_sale && (
                        <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                          Cel mai vandut
                        </span>
                      )}
                      <Link
                        to={`/product-details/${product.slug}`}
                        className="product-card__thumb flex-center"
                      >
                        <img
                          src={`${process.env.REACT_APP_BASE_URL}/uploads/products/${product.imageTitleKey}`}
                          alt={product.product_name}
                        />
                      </Link>
                      <div className="product-card__content p-sm-2">
                        <h6 className="title text-lg fw-semibold mt-12 mb-8">
                          <Link
                            to={`/product-details/${product.slug}`}
                            className="link text-line-2"
                          >
                            {product.product_name}
                          </Link>
                        </h6>
                        {/* <div className="flex-align gap-4 mt-8">
                        <span className="text-main-600 text-xs d-flex">
                          Categorie :
                        </span>
                        <span className="text-gray-900 text-xs fw-medium ">
                          <span className="text-heading text-xs fw-semibold ">
                            {product.product_category &&
                            product.product_category.length > 0
                              ? product.product_category
                                  .map((catId) => {
                                    const cat = category.find(
                                      (c) => String(c.id) === String(catId)
                                    );
                                    return cat ? cat.name : "Fara Categorie";
                                  })
                                  .join(", ")
                              : "Fara Categorie"}
                          </span>
                        </span>
                      </div> */}
                        <div className="product-card__content mt-12">
                          <div className="product-card__price my-20">
                            {!!product?.product_old_price && (
                              <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                {`${product.product_old_price} MDL`}
                              </span>
                            )}
                            <span className="text-heading text-md fw-semibold ">
                              <span>
                                {product.product_price != null &&
                                product.product_price !== "0.00" &&
                                product.product_price !== "0"
                                  ? `${product.product_price} MDL`
                                  : `${product.product_new_price} MDL`}
                              </span>
                            </span>
                          </div>
                          <div className="mb-10">
                            <div className="mt-12">
                              <div
                                className="progress w-100 bg-color-three rounded-pill h-4"
                                role="progressbar"
                                aria-label="Basic example"
                                aria-valuenow={
                                  product.product_count > 0
                                    ? (product.product_sold /
                                        product.product_count) *
                                      100
                                    : 0
                                }
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                <div
                                  className="progress-bar bg-main-600 rounded-pill"
                                  style={{
                                    width:
                                      product.product_count > 0
                                        ? `${
                                            (product.product_sold /
                                              product.product_count) *
                                            100
                                          }%`
                                        : "0%",
                                  }}
                                />
                              </div>
                              <span className="text-gray-900 text-xs fw-medium mt-8 d-block">
                                Vândut: {product.product_sold}/
                                {product.product_count}
                              </span>
                            </div>

                            <span className="text-sm text-gray-700 mt-8">
                              Disponibil doar:{product.product_count}
                            </span>
                          </div>
                          {/* <div className="flex-align gap-6">
                            <span className="text-xs fw-bold text-gray-600">
                              {product.product_rating}
                            </span>
                          </div> */}
                          <button
                            type="button"
                            className="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 mt-24 w-100 justify-content-center"
                            onClick={() => {
                              addToCart(product, quantity);
                            }}
                          >
                            <i className="ph ph-shopping-cart" />
                            Adaugă in coş
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="">Nu există produse în această categorie.</div>
              )}
            </Slider>
          ) : (
            <div className="">Nu există produse în această categorie.</div>
          )}
          {/* <Slider {...settings}>
            {filteredProducts.length > 1 ? (
              filteredProducts.map((product) => (
                <div
                  className="col-xxl-2 col-lg-3 col-sm-4 col-6"
                  key={product.product_id}
                >
                  <div className="product-card h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                    {!!product?.is_for_sale && (
                      <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                        Cel mai vandut
                      </span>
                    )}
                    <Link
                      to={`/product-details/${product.slug}`}
                      className="product-card__thumb flex-center"
                    >
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/uploads/products/${product.imageTitleKey}`}
                        alt={product.product_name}
                      />
                    </Link>
                    <div className="product-card__content p-sm-2">
                      <h6 className="title text-lg fw-semibold mt-12 mb-8">
                        <Link
                          to={`/product-details/${product.slug}`}
                          className="link text-line-2"
                        >
                          {product.product_name}
                        </Link>
                      </h6>
                   
                      <div className="product-card__content mt-12">
                        <div className="product-card__price my-20">
                          {!!product?.product_old_price && (
                            <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                              {`${product.product_old_price} MDL`}
                            </span>
                          )}
                          <span className="text-heading text-md fw-semibold ">
                            <span>
                              {product.product_price != null &&
                              product.product_price !== "0.00" &&
                              product.product_price !== "0"
                                ? `${product.product_price} MDL`
                                : `${product.product_new_price} MDL`}
                            </span>
                          </span>
                        </div>
                        <div className="flex-align gap-6">
                          <span className="text-xs fw-bold text-gray-600">
                            {product.product_rating}
                          </span>
                        </div>
                        <button
                          type="button"
                          className="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 mt-24 w-100 justify-content-center"
                          onClick={() => {
                            addToCart(product, quantity);
                          }}
                        >
                          <i className="ph ph-shopping-cart" />
                          Adaugă in coş
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="">Nu există produse în această categorie.</div>
            )}
          </Slider> */}
        </div>
      </div>
    </section>
  );
};

export default NewArrivalTwo;
