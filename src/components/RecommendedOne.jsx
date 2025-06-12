import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import { useCategories } from "../context/CategoryContext"; // импорт хука

const RecommendedOne = () => {
  const { categories, loading: loadingCategories, error } = useCategories();

  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const { addToCart } = useCart();

  const fetchAllProducts = async () => {
    setLoadingProducts(true);
    let allProducts = [];
    let page = 1;
    const perPage = 10;
    let totalPages = 1;

    try {
      while (page <= totalPages) {
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/product?page=${page}&perPage=${perPage}`
        );
        const data = await res.json();

        if (!data || !data.data) break;

        allProducts = allProducts.concat(data.data);

        if (data.total !== undefined && data.perPage !== undefined) {
          totalPages = Math.ceil(data.total / data.perPage);
        } else {
          break;
        }
        page++;
      }
    } catch (error) {
      console.error("Ошибка загрузки продуктов", error);
    }
    setProducts(allProducts);
    setLoadingProducts(false);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => {
          const categoriesOfProduct = Array.isArray(product.product_category)
            ? product.product_category.map(String)
            : [String(product.product_category)];
          return categoriesOfProduct.includes(String(activeCategory));
        });

  if (error) {
    return <p className="text-center text-red-600">Erroare: {error}</p>;
  }

  return (
    <section className="recommended">
      <div className="container container-lg">
        <div className="section-heading flex-between flex-wrap gap-16">
          <h5 className="mb-0">Recomandate pentru tine</h5>
          <ul className="nav common-tab nav-pills" role="tablist">
            <li className="nav-item" role="presentation" key="all">
              <button
                className={`nav-link ${
                  activeCategory === "all" ? "active" : ""
                }`}
                type="button"
                onClick={() => setActiveCategory("all")}
              >
                Toate
              </button>
            </li>

            {loadingCategories ? (
              <li className="nav-item" role="presentation" key="loading">
                <button className="nav-link disabled" type="button" disabled>
                  Loading...
                </button>
              </li>
            ) : (
              categories.map((item) => (
                <li className="nav-item" role="presentation" key={item.id}>
                  <button
                    className={`nav-link ${
                      activeCategory === String(item.id) ? "active" : ""
                    }`}
                    type="button"
                    onClick={() => setActiveCategory(String(item.id))}
                  >
                    {item.name}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>

        {loadingProducts ? (
          <div className="spinner"></div>
        ) : products.length === 0 ? (
          <p>Nu există produse cu categoria "Produse similare"</p>
        ) : (
          <div className="tab-content mt-4">
            <div className="tab-pane fade show active">
              <div className="row g-12">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      className="col-xxl-2 col-lg-3 col-sm-4 col-12"
                      key={product.product_id}
                    >
                      <div className="product-card h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                        {!!product?.is_for_sale && (
                          <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                            Best Sale
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
                          <h6 className="title text-md fw-semibold mt-12 mb-8">
                            <Link
                              to={`/product-details/${product.slug}`}
                              className="link text-line-2"
                            >
                              {product.product_name}
                            </Link>
                          </h6>
                          <div className="flex-align gap-4 mt-8 flex-wrap">
                            <span className="text-main-600 text-xs d-flex">
                              Categorie :
                            </span>
                            <span className="text-gray-900 text-xs fw-medium ">
                              <span className="text-heading product_category text-xs fw-semibold ">
                                {product.product_category
                                  ? (Array.isArray(product.product_category)
                                      ? product.product_category
                                      : [product.product_category]
                                    )
                                      .map((catId) => {
                                        const cat = categories.find(
                                          (c) => String(c.id) === String(catId)
                                        );
                                        return cat
                                          ? cat.name
                                          : "Fara Categorie";
                                      })
                                      .join(", ")
                                  : "Fara Categorie"}
                              </span>
                            </span>
                          </div>
                          <div className="product-card__content mt-12">
                            <div className="product-card__price my-20">
                              {!!product?.product_old_price && (
                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                  {`${product.product_old_price} MDL`}
                                </span>
                              )}
                              <span className="text-heading text-md fw-semibold ">
                                {product.product_price &&
                                product.product_price !== "0.00" &&
                                product.product_price !== "0"
                                  ? `${product.product_price} MDL`
                                  : `${product.product_new_price} MDL`}
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
                                {product.product_rating || "No rating"}
                              </span> */}
                            {/* <span className="text-15 fw-bold text-warning-600 d-flex">
                                <i className="ph-fill ph-star" />
                              </span> */}
                            {/* </div> */}
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
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center w-100 mt-4">
                    Nu există produse în această categorie.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecommendedOne;
