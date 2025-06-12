import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

const Modal = ({ isOpen, onClose }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/category`)
      .then((res) => res.json())
      .then((data) => setCategories(data.data || data))
      .catch((err) => console.error("Ошибка загрузки категорий:", err));
  }, []);

  useEffect(() => {
    if (!isOpen || categories.length === 0) return;

    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        const baseUrl = `${process.env.REACT_APP_BASE_URL}/api/product`;
        let allProducts = [];
        let currentPage = 1;
        let totalPages = 1;

        while (currentPage <= totalPages) {
          const url = new URL(baseUrl);
          url.searchParams.append("page", currentPage);
          url.searchParams.append("perPage", 10);

          const response = await fetch(url.toString());
          const data = await response.json();

          if (!data || !Array.isArray(data.data)) {
            throw new Error("Неверный формат ответа API");
          }

          allProducts = allProducts.concat(data.data);
          totalPages = data.totalPages || 1;
          currentPage++;
        }
        const categoriesMap = {};
        categories.forEach((cat) => {
          const key = cat.id || cat.category_id;
          const name = cat.name || cat.category_name;
          if (key != null && name != null) {
            categoriesMap[key] = name;
          }
        });
        const productsWithCategoryNames = allProducts.map((product) => {
          let categoryObjects = [];
          if (Array.isArray(product.product_category)) {
            categoryObjects = product.product_category.map((catId) => ({
              id: catId,
              name: categoriesMap[catId] || "Unknown Category",
            }));
          }
          return {
            ...product,
            product_category: categoryObjects,
          };
        });

        const filtered = productsWithCategoryNames.filter((product) =>
          product.product_category.some(
            (cat) =>
              cat.name.toLowerCase() === "DULCIURI / TORTURI / BOMBOANE" ||
              "BALOANE/ CIFRĂ/ HELIUM"
          )
        );

        setProducts(filtered);
      } catch (error) {
        console.error("Ошибка загрузки продуктов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, [isOpen, categories]);

  if (!isOpen) return null;

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1599, settings: { slidesToShow: 4 } },
      { breakpoint: 1399, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 575, settings: { slidesToShow: 2 } },
      { breakpoint: 424, settings: { slidesToShow: 1 } },
    ],
  };
  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
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
  return (
    <div className="modal-backdrop modal-custom" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {loading ? (
          <div className="spinner"></div>
        ) : products.length === 0 ? (
          <p>Nu există produse cu categoria "Produse similare"</p>
        ) : (
          <section className="new-arrival pt-80">
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
                <Slider {...settings}>
                  {products.map((product) => (
                    <div key={product.product_id} className="p-2">
                      <div className="product-card h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
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
                          <div className="mt-8">
                            <span className="text-main-600 text-xs d-flex">
                              <span className="text-gray-900 text-xs fw-medium">
                                Categorie :
                              </span>
                            </span>
                            <span className="text-gray-900 text-xs fw-medium">
                              <span className="text-heading text-md fw-semibold">
                                {product.product_category
                                  .map((cat) => cat.name)
                                  .join(", ")}
                              </span>
                            </span>
                          </div>

                          <div className="flex-align gap-4">
                            {!!product?.is_for_sale && (
                              <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                                Cel mai vandut
                              </span>
                            )}
                          </div>

                          <div className="product-card__price my-20">
                            {!!product?.product_old_price && (
                              <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                {`${product.product_old_price} MDL`}
                              </span>
                            )}

                            <span className="text-heading text-md fw-semibold">
                              {product.product_price != null &&
                              product.product_price !== "0.00"
                                ? `${product.product_price} MDL`
                                : `${product.product_new_price} MDL`}
                            </span>
                          </div>

                          <div className="flex-align gap-6">
                            <span className="text-xs fw-bold text-gray-600">
                              {product.rating || "0.0"}
                            </span>
                            <span className="text-15 fw-bold text-warning-600 d-flex">
                              <i className="ph-fill ph-star" />
                            </span>
                            <span className="text-xs fw-bold text-gray-600">
                              ({product.reviews_count || "0"})
                            </span>
                          </div>
                          <button
                            type="button"
                            className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                            onClick={() => {
                              addToCart(product, quantity);
                            }}
                          >
                            <i className="ph ph-shopping-cart" />
                            Adaugă în coș
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </section>
        )}
        <button onClick={onClose} className="modal-close-btn">
          ×
        </button>
      </div>
    </div>
  );
};

export default Modal;
