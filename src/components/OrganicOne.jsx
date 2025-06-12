import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useCart } from "../CartContext"; // проверь путь
import { useCategories } from "../context/CategoryContext"; // путь зависит от структуры
import { useProducts } from "../context/ProductContext"; // подключаем контекст продуктов

const OrganicOne = () => {
  const {
    categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useCategories();

  const { products, lengthSlider, loading: loadingProducts } = useProducts();
  const { addToCart } = useCart();
  const quantity = 1;

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: lengthSlider > 1 ? lengthSlider - 1 : 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 2500, settings: { slidesToShow: 4 } },
      { breakpoint: 1599, settings: { slidesToShow: 4 } },
      { breakpoint: 1399, settings: { slidesToShow: 4 } },
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
    <section className="organic-food py-80">
      <div className="container container-lg">
        <div className="section-heading">
          <div className="flex-between flex-wrap gap-8">
            <h5 className="mb-0">Sezonul florilor</h5>
            <div className="flex-align mr-point gap-16">
              <Link
                to="/shop"
                className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
              >
                Toate Sezon
              </Link>
            </div>
          </div>
        </div>

        <div className="organic-food__slider arrow-style-two">
          {loadingProducts || loadingCategories ? (
            <div className="spinner"></div>
          ) : errorCategories ? (
            <p>Ошибка загрузки категорий: {errorCategories}</p>
          ) : products.length === 0 ? (
            <p>Nu există produse cu categoria "Sezonul florilor"</p>
          ) : (
            <Slider {...settings}>
              {products.map(
                (product) =>
                  product.product_season !== null && (
                    <div key={product.product_id}>
                      <div className="product-card px-8 py-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                        <Link
                          to={`/product-details/${product.slug}`}
                          className="product-card__thumb flex-center"
                        >
                          <img
                            src={`${process.env.REACT_APP_BASE_URL}/uploads/products/${product.imageTitleKey}`}
                            alt={product.product_name}
                          />
                        </Link>
                        <div className="product-card__content mt-12">
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
                            <span className="text-xs fw-bold text-gray-500">
                              {product.product_rating}
                            </span> */}
                          {/* <span className="text-15 fw-bold text-warning-600 d-flex">
                              <i className="ph-fill ph-star" />
                            </span> */}
                          {/* </div> */}
                          <h6 className="title text-lg fw-semibold mt-12 mb-8">
                            <Link
                              to={`/product-details/${product.slug}`}
                              className="link text-line-2"
                            >
                              {product.product_name}
                            </Link>
                          </h6>
                          <div className="mt-8">
                            Categorie :
                            <span className="text-gray-900 text-xs fw-medium mt-8">
                              <span className="text-heading text-md fw-semibold ">
                                {product.product_category &&
                                product.product_category.length > 0
                                  ? product.product_category
                                      .map((catId) => {
                                        const cat = categories.find(
                                          (cat) =>
                                            String(cat.id) === String(catId)
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
                          <div className="flex-between gap-8 mt-24 flex-wrap">
                            <div className="product-card__price">
                              {!!product?.product_old_price && (
                                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                  {`${product.product_old_price} MDL`}
                                </span>
                              )}
                              <span className="text-heading text-md fw-semibold ">
                                <span>
                                  {product.product_price != null &&
                                  product.product_price !== "0.00"
                                    ? `${product.product_price} MDL`
                                    : `${product.product_new_price} MDL`}
                                </span>
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
                              Adaugă in coş
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrganicOne;
