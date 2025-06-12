import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useCategories } from "../context/CategoryContext";
import { useProducts } from "../context/ProductContext";

const ShortProductOne = () => {
  const { categories, loading: loadingCategories, error } = useCategories();
  const { products, loading: loadingProducts, setProducts } = useProducts();

  const fetchAllProducts = async () => {
    setProducts([]); // Очистим перед загрузкой
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

      setProducts(allProducts);
    } catch (error) {
      console.error("Ошибка загрузки продуктов", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

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

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 768, settings: { arrows: false } },
      { breakpoint: 575, settings: { arrows: true } },
    ],
  };

  if (loadingCategories || loadingProducts)
    return <div className="spinner"></div>;
  if (error) return <div>Error loading : {error}</div>;

  return (
    <div className="short-product pt-80 pb-80">
      <div className="container container-lg">
        <div className="row gy-4">
          {categories.slice(0, 4).map((category, index) => {
            const filtered = products.filter((p) =>
              p.product_category?.includes(String(category.id))
            );

            const slides = [];
            for (let i = 0; i < filtered.length && slides.length < 2; i += 2) {
              slides.push(filtered.slice(i, i + 2));
            }

            return (
              <div
                className="col-xxl-3 col-lg-4 col-sm-6"
                key={category.id || index}
              >
                <div className="p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                  <div className="p-16 bg-main-50 rounded-16 mb-32">
                    <h6 className="underlined-line position-relative mb-0 pb-16 d-inline-block">
                      {category.name}
                    </h6>
                  </div>

                  <div className="short-product-list arrow-style-two">
                    <Slider {...settings}>
                      {slides.map((group, slideIndex) => (
                        <div key={slideIndex}>
                          {group.map((product, idx) => (
                            <div
                              className="flex-align gap-16 mb-40"
                              key={product.product_id || idx}
                            >
                              <div className="w-90 h-90 rounded-12 border border-gray-100 flex-shrink-0">
                                <Link
                                  to={`/product-details/${product.slug}`}
                                  className="link"
                                >
                                  <img
                                    src={`${process.env.REACT_APP_BASE_URL}/uploads/products/${product.imageTitleKey}`}
                                    alt={product.product_name}
                                  />
                                </Link>
                              </div>
                              <div className="product-card__content mt-12">
                                {/* <div className="flex-align gap-6">
                                  <span className="text-xs fw-bold text-gray-500">
                                    {product.product_rating}
                                  </span>
                                </div> */}
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
                                <h6 className="title text-lg fw-semibold mt-8 mb-8">
                                  <Link
                                    to={`/product-details/${product.slug}`}
                                    className="link text-line-1"
                                  >
                                    {product.product_name}
                                  </Link>
                                </h6>
                                <div className="product-card__price">
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
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShortProductOne;
