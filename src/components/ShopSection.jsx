// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useCart } from "../CartContext";

// const ShopSection = () => {
//   const [products, setProducts] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [subcategory, setSubCategory] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [grid, setGrid] = useState(false);
//   const [active, setActive] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const query = new URLSearchParams(location.search);
//   const selectedCategory = query.get("category");
//   const selectedSubcategory = query.get("subcategory");
//   const searchQuery = query.get("search") || "";

//   const { addToCart } = useCart();
//   const observerRef = useRef(null);

//   const sidebarController = () => {
//     setActive(!active);
//   };

//   const [searchTerm, setSearchTerm] = useState(searchQuery);

//   useEffect(() => {
//     setProducts([]);
//     setPage(1);
//     setHasMore(true);
//     setSearchTerm(searchQuery);
//   }, [selectedCategory, selectedSubcategory, searchQuery]);

//   const fetchProducts = useCallback(async () => {
//     if (loading || !hasMore) return;
//     setLoading(true);

//     const url = new URL(`${process.env.REACT_APP_BASE_URL}/api/product`);
//     url.searchParams.set("page", page);
//     url.searchParams.set("perPage", 8);
//     if (selectedCategory) url.searchParams.set("category", selectedCategory);
//     if (selectedSubcategory)
//       url.searchParams.set("subcategory", selectedSubcategory);
//     if (searchQuery) url.searchParams.set("search", searchQuery);

//     try {
//       const res = await fetch(url.toString());
//       const data = await res.json();

//       if (data?.data?.length > 0) {
//         setProducts((prev) => [...prev, ...data.data]);
//         setPage((prev) => prev + 1);
//       } else {
//         setHasMore(false);
//       }
//     } catch (err) {
//       console.error("Ошибка загрузки продуктов", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [
//     page,
//     selectedCategory,
//     selectedSubcategory,
//     searchQuery,
//     loading,
//     hasMore,
//   ]);

//   useEffect(() => {
//     if (page === 1) {
//       fetchProducts();
//     }
//   }, [fetchProducts]);

//   useEffect(() => {
//     const currentRef = observerRef.current;
//     if (!currentRef || loading || !hasMore) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && !loading && hasMore) {
//           fetchProducts();
//         }
//       },
//       { threshold: 1 }
//     );

//     observer.observe(currentRef);
//     return () => {
//       if (currentRef) observer.unobserve(currentRef);
//     };
//   }, [fetchProducts, loading, hasMore]);

//   useEffect(() => {
//     fetch(`${process.env.REACT_APP_BASE_URL}/api/category`)
//       .then((res) => res.json())
//       .then(setCategory)
//       .catch((err) => console.error("Ошибка загрузки категории", err));

//     fetch(`${process.env.REACT_APP_BASE_URL}/api/subcategory`)
//       .then((res) => res.json())
//       .then(setSubCategory)
//       .catch((err) => console.error("Ошибка загрузки подкатегорий", err));
//   }, []);

//   // const handleAllCategoriesClick = () => {
//   //   query.delete("category");
//   //   query.delete("subcategory");
//   //   navigate({ pathname: "/shop", search: query.toString() });
//   // };

//   // const handleSearchChange = (e) => {
//   //   const val = e.target.value;
//   //   setSearchTerm(val);

//   //   if (val) {
//   //     query.set("search", val);
//   //   } else {
//   //     query.delete("search");
//   //   }
//   //   query.delete("page");
//   //   navigate({ pathname: "/shop", search: query.toString() });
//   // };

//   const filteredSubcategories = subcategory.filter(
//     (sub) => sub.category_slug === selectedCategory
//   );

//   return (
//     <section className="shop py-80">
//       <div className={`side-overlay ${active ? "show" : ""}`}></div>
//       <div className="container container-lg">
//         <div className="row">
//           <div className="col-lg-3">
//             <div className={`shop-sidebar ${active ? "active" : ""}`}>
//               <button
//                 onClick={sidebarController}
//                 type="button"
//                 className="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 hover-text-white hover-border-main-600"
//               >
//                 <i className="ph ph-x" />
//               </button>
//               <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
//                 <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
//                   Florile Categorie
//                 </h6>
//                 <ul className="max-h-540 overflow-y-auto scroll-sm">
//                   <li className="mb-24">
//                     <Link
//                       to={`/shop`}
//                       className={`text-gray-900 hover-text-main-600 btn-reset ${
//                         !selectedCategory ? "font-bold text-main-600" : ""
//                       }`}
//                       style={{ cursor: "pointer" }}
//                     >
//                       Toate Categorie
//                     </Link>
//                     {/* <button
//                       onClick={handleAllCategoriesClick}
//                       className={`text-gray-900 hover-text-main-600 btn-reset ${
//                         !selectedCategory ? "font-bold text-main-600" : ""
//                       }`}
//                       style={{ cursor: "pointer" }}
//                     >
//                       Toate Categorie
//                     </button> */}
//                   </li>

//                   {category.map((cat) => (
//                     <li className="mb-24" key={cat.id}>
//                       <Link
//                         to={`/shop/${cat.slug}`}
//                         onClick={() => setPage(1)}
//                         className={`text-gray-900 hover-text-main-600 ${
//                           selectedCategory === cat.slug
//                             ? "font-bold text-main-600"
//                             : ""
//                         }`}
//                       >
//                         {cat.name}
//                       </Link>
//                       {/* Subcategory list */}
//                       {selectedCategory === cat.slug &&
//                         filteredSubcategories.length > 0 && (
//                           <ul className="ps-3 mt-2">
//                             {filteredSubcategories.map((sub) => (
//                               <li key={sub.id}>
//                                 <Link
//                                   to={`/shop/${cat.slug}${sub.slug}`}
//                                   onClick={() => setPage(1)}
//                                   className={`text-sm text-gray-700 hover-text-main-600 ${
//                                     selectedSubcategory === sub.slug
//                                       ? "font-bold text-main-600"
//                                       : ""
//                                   }`}
//                                 >
//                                   {sub.name}
//                                 </Link>
//                               </li>
//                             ))}
//                           </ul>
//                         )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Product list */}
//           <div className="col-lg-9">
//             <div className="flex-between mb-40">
//               <span>Se afișează {products.length} produse</span>
//               <div className="position-relative flex-align gap-16 flex-wrap">
//                 <div className="list-grid-btns flex-align gap-16">
//                   <button
//                     onClick={() => setGrid(true)}
//                     type="button"
//                     className={`w-44 h-44 flex-center border rounded-6 text-2xl list-btn border-gray-100 ${
//                       grid ? "border-main-600 text-white bg-main-600" : ""
//                     }`}
//                   >
//                     <i className="ph-bold ph-list-dashes" />
//                   </button>
//                   <button
//                     onClick={() => setGrid(false)}
//                     type="button"
//                     className={`w-44 h-44 flex-center border rounded-6 text-2xl grid-btn border-gray-100 ${
//                       !grid ? "border-main-600 text-white bg-main-600" : ""
//                     }`}
//                   >
//                     <i className="ph ph-squares-four" />
//                   </button>
//                 </div>

//                 <button
//                   onClick={sidebarController}
//                   type="button"
//                   className="w-44 h-44 d-lg-none d-flex flex-center border border-gray-100 rounded-6 text-2xl sidebar-btn"
//                 >
//                   <i className="ph-bold ph-funnel" />
//                 </button>
//               </div>
//             </div>

//             <div className={`list-grid-wrapper ${grid ? "list-view" : ""}`}>
//               {products.length === 0 && !loading && (
//                 <div className="text-center py-40">Nu s-au găsit produse</div>
//               )}

//               {products.map((product, index) => (
//                 <div
//                   className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
//                   key={`${product.product_id}-${index}`}
//                 >
//                   <Link
//                     to={`/product-details/${product.slug}`}
//                     className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
//                   >
//                     <img
//                       src={`${process.env.REACT_APP_BASE_URL}/uploads/products/${product.imageTitleKey}`}
//                       alt={product.product_name}
//                     />
//                     {!!product?.is_for_sale && (
//                       <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
//                         Best Sale
//                       </span>
//                     )}
//                     {!!product?.product_count && (
//                       <span className="product-card__badge bg-main-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
//                         Sold
//                       </span>
//                     )}
//                   </Link>

//                   <div className="product-card__content mt-16">
//                     <h2 className="title text-lg fw-semibold mt-12 mb-8">
//                       <Link
//                         to={`/product-details/${product.slug}`}
//                         className="link text-line-2"
//                       >
//                         {product.product_name}
//                       </Link>
//                     </h2>

//                     <p className="desc text-xs text-gray-500 mb-12 text-line-3">
//                       {product.product_description}
//                     </p>

//                     <div className="mb-12">
//                       <div className="product-card__price my-20">
//                         {!!product?.product_old_price && (
//                           <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
//                             {`${product.product_old_price} MDL`}
//                           </span>
//                         )}
//                         <span className="text-heading text-md fw-semibold ">
//                           {product.product_price &&
//                           product.product_price !== "0.00" &&
//                           product.product_price !== "0"
//                             ? `${product.product_price} MDL`
//                             : `${product.product_new_price} MDL`}
//                         </span>
//                       </div>
//                     </div>

//                     <p className="text-xs mb-8">
//                       Categorii:{" "}
//                       {Array.isArray(product.product_category) &&
//                       product.product_category.length > 0
//                         ? product.product_category
//                             .map((catId) => {
//                               const cat = category.find(
//                                 (c) => String(c.id) === String(catId)
//                               );
//                               return cat ? cat.name : "Fara Categorie";
//                             })
//                             .join(", ")
//                         : "Fara Categorie"}
//                     </p>

//                     <button
//                       type="button"
//                       className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
//                       onClick={() => addToCart(product, 1)}
//                     >
//                       <i className="ph ph-shopping-cart" />
//                       Adaugă in coş
//                     </button>
//                   </div>
//                 </div>
//               ))}

//               {/* <div ref={observerRef} style={{ height: "20px" }} /> */}
//               <div
//                 ref={observerRef}
//                 className="spinner"
//                 style={{ visibility: loading ? "visible" : "hidden" }}
//               ></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ShopSection;

//without category & subcategoria
// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import { useCart } from "../CartContext";

// const ShopSection = () => {
//   const { categorySlug = "", subcategorySlug = "" } = useParams();
//   const [searchParams] = useSearchParams();
//   const searchQuery = searchParams.get("search") || "";

//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   const observerRef = useRef(null);
//   const { addToCart } = useCart();

//   // Сбрасываем состояние при изменении категории/сабкатегории/поиска
//   useEffect(() => {
//     setProducts([]);
//     setPage(1);
//     setHasMore(true);
//   }, [categorySlug, subcategorySlug, searchQuery]);

//   const fetchProducts = useCallback(async () => {
//     if (loading || !hasMore) return;
//     setLoading(true);

//     // Собираем URL /api/product?page=X&perPage=8&category=...&subcategory=...&search=...
//     const url = new URL(`${process.env.REACT_APP_BASE_URL}/api/product`);
//     url.searchParams.set("page", page);
//     url.searchParams.set("perPage", 8);

//     // Вместо selectedCategory и selectedSubcategory из query теперь используем categorySlug/subcategorySlug
//     if (categorySlug) {
//       url.searchParams.set("category", categorySlug);
//     }
//     if (subcategorySlug) {
//       url.searchParams.set("subcategory", subcategorySlug);
//     }
//     if (searchQuery) {
//       url.searchParams.set("search", searchQuery);
//     }

//     try {
//       const res = await fetch(url.toString());
//       const data = await res.json();

//       if (Array.isArray(data.data) && data.data.length > 0) {
//         setProducts((prev) => [...prev, ...data.data]);
//         setPage((prev) => prev + 1);
//       } else {
//         setHasMore(false);
//       }
//     } catch (err) {
//       console.error("Ошибка загрузки продуктов", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [page, categorySlug, subcategorySlug, searchQuery, loading, hasMore]);

//   // При монтировании и при изменении page (после сброса) грузим товары
//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   // IntersectionObserver для бесконечного скролла
//   useEffect(() => {
//     const currentRef = observerRef.current;
//     if (!currentRef || loading || !hasMore) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && !loading && hasMore) {
//           fetchProducts();
//         }
//       },
//       { threshold: 1 }
//     );

//     observer.observe(currentRef);
//     return () => {
//       if (currentRef) observer.unobserve(currentRef);
//     };
//   }, [fetchProducts, loading, hasMore]);

//   return (
//     <section className="shop py-80">
//       <div className={`side-overlay ${active ? "show" : ""}`}></div>
//       <div className="container container-lg">
//         <div className="row">
//           <div className="col-lg-3">
//             <div className={`shop-sidebar ${active ? "active" : ""}`}>
//               <button
//                 onClick={sidebarController}
//                 type="button"
//                 className="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 hover-text-white hover-border-main-600"
//               >
//                 <i className="ph ph-x" />
//               </button>
//               <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
//                 <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
//                   Florile Categorie
//                 </h6>
//                 <ul className="max-h-540 overflow-y-auto scroll-sm">
//                   <li className="mb-24">
//                     <Link
//                       to={`/shop`}
//                       className={`text-gray-900 hover-text-main-600 btn-reset ${
//                         !selectedCategory ? "font-bold text-main-600" : ""
//                       }`}
//                       style={{ cursor: "pointer" }}
//                     >
//                       Toate Categorie
//                     </Link>
//                     {/* <button
//                       onClick={handleAllCategoriesClick}
//                       className={`text-gray-900 hover-text-main-600 btn-reset ${
//                         !selectedCategory ? "font-bold text-main-600" : ""
//                       }`}
//                       style={{ cursor: "pointer" }}
//                     >
//                       Toate Categorie
//                     </button> */}
//                   </li>

//                   {category.map((cat) => (
//                     <li className="mb-24" key={cat.id}>
//                       <Link
//                         to={`/shop/${cat.slug}`}
//                         onClick={() => setPage(1)}
//                         className={`text-gray-900 hover-text-main-600 ${
//                           selectedCategory === cat.slug
//                             ? "font-bold text-main-600"
//                             : ""
//                         }`}
//                       >
//                         {cat.name}
//                       </Link>
//                       {/* Subcategory list */}
//                       {selectedCategory === cat.slug &&
//                         filteredSubcategories.length > 0 && (
//                           <ul className="ps-3 mt-2">
//                             {filteredSubcategories.map((sub) => (
//                               <li key={sub.id}>
//                                 <Link
//                                   to={`/shop/${cat.slug}${sub.slug}`}
//                                   onClick={() => setPage(1)}
//                                   className={`text-sm text-gray-700 hover-text-main-600 ${
//                                     selectedSubcategory === sub.slug
//                                       ? "font-bold text-main-600"
//                                       : ""
//                                   }`}
//                                 >
//                                   {sub.name}
//                                 </Link>
//                               </li>
//                             ))}
//                           </ul>
//                         )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Product list */}
//           <div className="col-lg-9">
//             <div className="flex-between mb-40">
//               <span>Se afișează {products.length} produse</span>
//               <div className="position-relative flex-align gap-16 flex-wrap">
//                 <div className="list-grid-btns flex-align gap-16">
//                   <button
//                     onClick={() => setGrid(true)}
//                     type="button"
//                     className={`w-44 h-44 flex-center border rounded-6 text-2xl list-btn border-gray-100 ${
//                       grid ? "border-main-600 text-white bg-main-600" : ""
//                     }`}
//                   >
//                     <i className="ph-bold ph-list-dashes" />
//                   </button>
//                   <button
//                     onClick={() => setGrid(false)}
//                     type="button"
//                     className={`w-44 h-44 flex-center border rounded-6 text-2xl grid-btn border-gray-100 ${
//                       !grid ? "border-main-600 text-white bg-main-600" : ""
//                     }`}
//                   >
//                     <i className="ph ph-squares-four" />
//                   </button>
//                 </div>

//                 <button
//                   onClick={sidebarController}
//                   type="button"
//                   className="w-44 h-44 d-lg-none d-flex flex-center border border-gray-100 rounded-6 text-2xl sidebar-btn"
//                 >
//                   <i className="ph-bold ph-funnel" />
//                 </button>
//               </div>
//             </div>

//             <div className={`list-grid-wrapper ${grid ? "list-view" : ""}`}>
//               {products.length === 0 && !loading && (
//                 <div className="text-center py-40">Nu s-au găsit produse</div>
//               )}

//               {products.map((product, index) => (
//                 <div
//                   className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
//                   key={`${product.product_id}-${index}`}
//                 >
//                   <Link
//                     to={`/product-details/${product.slug}`}
//                     className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
//                   >
//                     <img
//                       src={`${process.env.REACT_APP_BASE_URL}/uploads/products/${product.imageTitleKey}`}
//                       alt={product.product_name}
//                     />
//                     {!!product?.is_for_sale && (
//                       <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
//                         Best Sale
//                       </span>
//                     )}
//                     {!!product?.product_count && (
//                       <span className="product-card__badge bg-main-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
//                         Sold
//                       </span>
//                     )}
//                   </Link>

//                   <div className="product-card__content mt-16">
//                     <h2 className="title text-lg fw-semibold mt-12 mb-8">
//                       <Link
//                         to={`/product-details/${product.slug}`}
//                         className="link text-line-2"
//                       >
//                         {product.product_name}
//                       </Link>
//                     </h2>

//                     <p className="desc text-xs text-gray-500 mb-12 text-line-3">
//                       {product.product_description}
//                     </p>

//                     <div className="mb-12">
//                       <div className="product-card__price my-20">
//                         {!!product?.product_old_price && (
//                           <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
//                             {`${product.product_old_price} MDL`}
//                           </span>
//                         )}
//                         <span className="text-heading text-md fw-semibold ">
//                           {product.product_price &&
//                           product.product_price !== "0.00" &&
//                           product.product_price !== "0"
//                             ? `${product.product_price} MDL`
//                             : `${product.product_new_price} MDL`}
//                         </span>
//                       </div>
//                     </div>

//                     <p className="text-xs mb-8">
//                       Categorii:{" "}
//                       {Array.isArray(product.product_category) &&
//                       product.product_category.length > 0
//                         ? product.product_category
//                             .map((catId) => {
//                               const cat = category.find(
//                                 (c) => String(c.id) === String(catId)
//                               );
//                               return cat ? cat.name : "Fara Categorie";
//                             })
//                             .join(", ")
//                         : "Fara Categorie"}
//                     </p>

//                     <button
//                       type="button"
//                       className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
//                       onClick={() => addToCart(product, 1)}
//                     >
//                       <i className="ph ph-shopping-cart" />
//                       Adaugă in coş
//                     </button>
//                   </div>
//                 </div>
//               ))}

//               {/* <div ref={observerRef} style={{ height: "20px" }} /> */}
//               <div
//                 ref={observerRef}
//                 className="spinner"
//                 style={{ visibility: loading ? "visible" : "hidden" }}
//               ></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ShopSection;
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useCart } from "../CartContext";

const ShopSection = () => {
  // Супер: вместо чтения из query теперь берём из params
  const {
    categorySlug: selectedCategory = "",
    subcategorySlug: selectedSubcategory = "",
  } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [grid, setGrid] = useState(false);
  const [active, setActive] = useState(false);

  const { addToCart } = useCart();
  const observerRef = useRef(null);

  // Сбросим список товаров, когда сменятся фильтры
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [selectedCategory, selectedSubcategory, searchQuery]);

  // Загрузка категорий и подкатегорий (для боковой панели)
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/category`)
      .then((res) => res.json())
      .then(setCategoryList)
      .catch((err) => console.error("Ошибка загрузки категорий", err));

    fetch(`${process.env.REACT_APP_BASE_URL}/api/subcategory`)
      .then((res) => res.json())
      .then(setSubcategoryList)
      .catch((err) => console.error("Ошибка загрузки подкатегорий", err));
  }, []);

  // Фильтрация подкатегорий по выбранной категории
  const filteredSubcategories = subcategoryList.filter(
    (sub) => sub.category_slug === selectedCategory
  );

  // Запрос товаров из API
  const fetchProducts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const url = new URL(`${process.env.REACT_APP_BASE_URL}/api/product`);
    url.searchParams.set("page", page);
    url.searchParams.set("perPage", 8);

    if (selectedCategory) {
      url.searchParams.set("category", selectedCategory);
    }
    if (selectedSubcategory) {
      url.searchParams.set("subcategory", selectedSubcategory);
    }
    if (searchQuery) {
      url.searchParams.set("search", searchQuery);
    }

    try {
      const res = await fetch(url.toString());
      const data = await res.json();

      if (Array.isArray(data.data) && data.data.length > 0) {
        setProducts((prev) => [...prev, ...data.data]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Ошибка загрузки продуктов", err);
    } finally {
      setLoading(false);
    }
  }, [
    page,
    selectedCategory,
    selectedSubcategory,
    searchQuery,
    loading,
    hasMore,
  ]);

  // Первичная загрузка и при изменении фильтров/страницы
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // IntersectionObserver для «ленивой» подгрузки
  useEffect(() => {
    const currentRef = observerRef.current;
    if (!currentRef || loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          fetchProducts();
        }
      },
      { threshold: 1 }
    );

    observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [fetchProducts, loading, hasMore]);

  const sidebarController = () => {
    setActive((prev) => !prev);
  };

  return (
    <section className="shop py-80">
      <div className={`side-overlay ${active ? "show" : ""}`}></div>
      <div className="container container-lg">
        <div className="row">
          {/* Сайдбар */}
          <div className="col-lg-3">
            <div className={`shop-sidebar ${active ? "active" : ""}`}>
              <button
                onClick={sidebarController}
                type="button"
                className="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 hover-text-white hover-border-main-600"
              >
                <i className="ph ph-x" />
              </button>
              <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                  Categorii Flori
                </h6>
                <ul className="max-h-540 overflow-y-auto scroll-sm">
                  <li className="mb-24">
                    <Link
                      to="/shop"
                      onClick={() => {
                        setPage(1);
                      }}
                      className={`text-gray-900 hover-text-main-600 btn-reset ${
                        !selectedCategory ? "font-bold text-main-600" : ""
                      }`}
                      style={{ cursor: "pointer" }}
                    >
                      Toate Categoriile
                    </Link>
                  </li>

                  {categoryList.map((cat) => (
                    <li className="mb-24" key={cat.id}>
                      <Link
                        to={`/shop/${cat.slug}`}
                        onClick={() => setPage(1)}
                        className={`text-gray-900 hover-text-main-600 ${
                          selectedCategory === cat.slug
                            ? "font-bold text-main-600"
                            : ""
                        }`}
                      >
                        {cat.name}
                      </Link>

                      {/* Список подкатегорий */}
                      {selectedCategory === cat.slug &&
                        filteredSubcategories.length > 0 && (
                          <ul className="ps-3 mt-2">
                            {filteredSubcategories.map((sub) => (
                              <li key={sub.id}>
                                <Link
                                  to={`/shop/${cat.slug}/${sub.slug}`}
                                  onClick={() => setPage(1)}
                                  className={`text-sm text-gray-700 hover-text-main-600 ${
                                    selectedSubcategory === sub.slug
                                      ? "font-bold text-main-600"
                                      : ""
                                  }`}
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Сетка товаров */}
          <div className="col-lg-9">
            <div className="flex-between mb-40">
              <span>Se afișează {products.length} produse</span>
              <div className="position-relative flex-align gap-16 flex-wrap">
                <div className="list-grid-btns flex-align gap-16">
                  <button
                    onClick={() => setGrid(true)}
                    type="button"
                    className={`w-44 h-44 flex-center border rounded-6 text-2xl list-btn border-gray-100 ${
                      grid ? "border-main-600 text-white bg-main-600" : ""
                    }`}
                  >
                    <i className="ph-bold ph-list-dashes" />
                  </button>
                  <button
                    onClick={() => setGrid(false)}
                    type="button"
                    className={`w-44 h-44 flex-center border rounded-6 text-2xl grid-btn border-gray-100 ${
                      !grid ? "border-main-600 text-white bg-main-600" : ""
                    }`}
                  >
                    <i className="ph ph-squares-four" />
                  </button>
                </div>

                <button
                  onClick={sidebarController}
                  type="button"
                  className="w-44 h-44 d-lg-none d-flex flex-center border border-gray-100 rounded-6 text-2xl sidebar-btn"
                >
                  <i className="ph-bold ph-funnel" />
                </button>
              </div>
            </div>

            <div className={`list-grid-wrapper ${grid ? "list-view" : ""}`}>
              {products.length === 0 && !loading && (
                <div className="text-center py-40">Nu s-au găsit produse</div>
              )}

              {products.map((product, index) => (
                <div
                  className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
                  key={`${product.product_id}-${index}`}
                >
                  <Link
                    to={`/product-details/${product.slug}`}
                    className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                  >
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/uploads/products/${product.imageTitleKey}`}
                      alt={product.product_name}
                    />
                    {!!product.is_for_sale && (
                      <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                        Cel mai vandut
                      </span>
                    )}
                    {!!product.product_count && (
                      <span className="product-card__badge bg-main-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                        Epuizat
                      </span>
                    )}
                  </Link>

                  <div className="product-card__content mt-16">
                    <h2 className="title text-lg fw-semibold mt-12 mb-8">
                      <Link
                        to={`/product-details/${product.slug}`}
                        className="link text-line-2"
                      >
                        {product.product_name}
                      </Link>
                    </h2>

                    <p className="desc text-xs text-gray-500 mb-12 text-line-3">
                      {product.product_description}
                    </p>

                    <div className="mb-12">
                      <div className="product-card__price my-20">
                        {!!product.product_old_price && (
                          <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                            {`${product.product_old_price} MDL`}
                          </span>
                        )}
                        <span className="text-heading text-md fw-semibold">
                          {product.product_price &&
                          product.product_price !== "0.00" &&
                          product.product_price !== "0"
                            ? `${product.product_price} MDL`
                            : `${product.product_new_price} MDL`}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs mb-8">
                      Categorii:{" "}
                      {Array.isArray(product.product_category) &&
                      product.product_category.length > 0
                        ? product.product_category
                            .map((catId) => {
                              const cat = categoryList.find(
                                (c) => String(c.id) === String(catId)
                              );
                              return cat ? cat.name : "Fara Categorie";
                            })
                            .join(", ")
                        : "Fara Categorie"}
                    </p>

                    <button
                      type="button"
                      className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                      onClick={() => addToCart(product, 1)}
                    >
                      <i className="ph ph-shopping-cart" />
                      Adaugă in coş
                    </button>
                  </div>
                </div>
              ))}

              {loading && <div className="text-center spinner"></div>}

              {/* <div
                ref={observerRef}
                className="spinner"
                style={{ visibility: loading ? "visible" : "hidden" }}
              ></div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
