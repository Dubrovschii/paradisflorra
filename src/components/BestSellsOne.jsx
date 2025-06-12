import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCategories } from "../context/CategoryContext";
import { useProducts } from "../context/ProductContext";

// Вспомогательная функция
const getSaleCountdown = (saleStartDate, dateForSale) => {
  if (!saleStartDate || !dateForSale) return null;

  const start = new Date(saleStartDate);
  const end = new Date(start.getTime() + dateForSale * 24 * 60 * 60 * 1000);
  const now = new Date();
  const diff = end - now;

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    total: diff,
  };
};

const ProductTimer = ({ sale_start_date, date_for_sale }) => {
  const [timeLeft, setTimeLeft] = useState(() =>
    getSaleCountdown(sale_start_date, date_for_sale)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const countdown = getSaleCountdown(sale_start_date, date_for_sale);
      setTimeLeft(countdown);
    }, 1000);

    return () => clearInterval(interval);
  }, [sale_start_date, date_for_sale]);

  if (!timeLeft)
    return <div className="countdown ended">Promoția s-a încheiat</div>;

  return (
    <div className="countdown">
      <ul className="countdown-list style-three flex-align flex-wrap">
        {timeLeft.days !== 0 && (
          <li className="countdown-list__item">
            {timeLeft.days} {timeLeft.days === 1 ? "Zi" : "Zile"}
          </li>
        )}
        <li className="countdown-list__item">
          {timeLeft.hours} {timeLeft.hours === 1 ? "Oră" : "Ore"}
        </li>
        <li className="countdown-list__item">{timeLeft.minutes} Min</li>
        <li className="countdown-list__item">{timeLeft.seconds} Sec</li>
      </ul>
    </div>
  );
};

const BestSellsOne = () => {
  const { categories, loading: loadingCategories, error } = useCategories();
  const { products, loading: loadingProducts } = useProducts();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (
        !product.is_for_sale ||
        !product.sale_start_date ||
        !product.date_for_sale
      ) {
        return false;
      }
      return (
        getSaleCountdown(product.sale_start_date, product.date_for_sale) !==
        null
      );
    });
  }, [products]);

  const [rightTimer, setRightTimer] = useState(null);

  useEffect(() => {
    if (filteredProducts.length === 0) return;

    const activeSales = filteredProducts
      .map((product) => {
        const countdown = getSaleCountdown(
          product.sale_start_date,
          product.date_for_sale
        );
        return countdown ? { countdown, product } : null;
      })
      .filter(Boolean)
      .sort((a, b) => a.countdown.total - b.countdown.total);

    if (activeSales.length === 0) return;

    const updateTimer = () => {
      const updated = getSaleCountdown(
        activeSales[0].product.sale_start_date,
        activeSales[0].product.date_for_sale
      );
      if (updated) setRightTimer(updated);
    };

    updateTimer(); // сразу обновим
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [filteredProducts]);

  if (loadingCategories || loadingProducts)
    return <div className="spinner"></div>;
  if (error) return <div>Error loading: {error}</div>;

  return (
    <section className="best sells pt-40">
      <div className="container">
        <div className="section-heading">
          <h5>Reduceri</h5>
        </div>
        <div className="row g-12">
          <div className="col-xxl-8">
            <div className="row gy-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <div className="col-md-6" key={product.id || index}>
                    <div className="product-card style-two h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2 flex-align gap-16">
                      <div>
                        {product.is_for_sale && (
                          <span className="product-card__badge bg-primary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0">
                            Cel mai vandut
                          </span>
                        )}

                        <Link
                          to={`/product-details/${product.slug}`}
                          className="product-card__thumb flex-center"
                        >
                          {product.imageTitleKey ? (
                            <img
                              src={`${process.env.REACT_APP_BASE_URL}/uploads/products/${product.imageTitleKey}`}
                              alt={product.product_name}
                            />
                          ) : (
                            <div className="no-image-placeholder">
                              Nui imagine
                            </div>
                          )}
                        </Link>
                        <ProductTimer
                          sale_start_date={product.sale_start_date}
                          date_for_sale={product.date_for_sale}
                        />
                      </div>
                      <div className="product-card__content">
                        <div className="product-card__price my-20">
                          {product.product_old_price && (
                            <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                              {product.product_old_price} MDL
                            </span>
                          )}
                          <span className="text-heading text-md fw-semibold">
                            {product.product_price &&
                            Number(product.product_price) > 0
                              ? `${product.product_price} MDL`
                              : product.product_new_price
                              ? `${product.product_new_price} MDL`
                              : "Vă rugăm să verificați prețul"}
                          </span>
                        </div>
                        {/* <div className="flex-align gap-6">
                          <span className="text-xs fw-bold text-gray-600">
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
                        <div className="flex-align gap-4 mt-8 flex-wrap">
                          <span className="text-main-600 text-xs d-flex">
                            Categorie :
                          </span>
                          <span className="text-gray-900 text-xs fw-medium">
                            <span className="text-heading text-xs fw-semibold">
                              {product.product_category
                                ? (Array.isArray(product.product_category)
                                    ? product.product_category
                                    : [product.product_category]
                                  )
                                    .map((catId) => {
                                      const cat = categories.find(
                                        (c) => String(c.id) === String(catId)
                                      );
                                      return cat ? cat.name : "Fara Categorie";
                                    })
                                    .join(", ")
                                : "Fara Categorie"}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Nu există produse la reducere</p>
              )}
            </div>
          </div>

          {/* Правый блок с таймером */}
          <div className="col-xxl-4">
            <div className="position-relative rounded-16 bg-light-purple overflow-hidden p-28 z-1 text-center">
              <div>
                <img
                  src="assets/images/bg/special-snacks.png"
                  alt="Special Snacks background"
                  className="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 cover-img"
                />
                <div className="d-xxl-block d-none">
                  <img
                    src="https://flowers.vetro.md/uploads/promoslider/12/1748445129119-buchet-baner.png"
                    alt="Special Snacks"
                  />
                </div>
              </div>
              <div className="py-xl-4">
                <h4 className="mb-8">Oferte speciale</h4>
                {rightTimer ? (
                  <div className="countdown my-32" id="countdown5">
                    <ul className="countdown-list style-two flex-center flex-wrap">
                      {rightTimer.days !== 0 && (
                        <li className="countdown-list__item text-heading flex-align gap-4 text-sm fw-medium colon-white">
                          {rightTimer.days}{" "}
                          {rightTimer.days === 1 ? "Zi" : "Zile"}
                        </li>
                      )}
                      <li className="countdown-list__item text-heading flex-align gap-4 text-sm fw-medium colon-white">
                        {rightTimer.hours}{" "}
                        {rightTimer.hours === 1 ? "Oră" : "Ore"}
                      </li>
                      <li className="countdown-list__item text-heading flex-align gap-4 text-sm fw-medium colon-white">
                        {rightTimer.minutes} Min
                      </li>
                      <li className="countdown-list__item text-heading flex-align gap-4 text-sm fw-medium colon-white">
                        {rightTimer.seconds} Sec
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="countdown ended text-heading text-sm fw-medium">
                    Promoția s-a încheiat
                  </div>
                )}
                <Link
                  to="/shop"
                  className="mt-16 btn btn-main-two fw-medium d-inline-flex align-items-center rounded-pill gap-8"
                >
                  Cumpără acum
                  <span className="icon text-xl d-flex">
                    <i className="ph ph-arrow-right" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellsOne;
