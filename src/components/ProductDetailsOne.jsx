import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { getCountdown } from "../helper/Countdown";
import Modal from "../components/Modal.jsx";
import { useCart } from "../CartContext"; // проверь путь

const getSaleCountdown = (saleStartDate, dateForSale) => {
  if (!saleStartDate || !dateForSale) return null;

  const start = new Date(saleStartDate);
  const end = new Date(start.getTime() + dateForSale * 24 * 60 * 60 * 1000);
  const now = new Date();

  const diff = end - now;
  if (diff <= 0) {
    return null;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
};

const ProductTimer = ({ sale_start_date, date_for_sale }) => {
  const [timeLeft, setTimeLeft] = useState(() =>
    getSaleCountdown(sale_start_date, date_for_sale)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getSaleCountdown(sale_start_date, date_for_sale));
    }, 1000);

    return () => clearInterval(interval);
  }, [sale_start_date, date_for_sale]);

  if (!timeLeft) {
    return <div className="countdown ended">Promoția s-a încheiat</div>;
  }

  return (
    <div className="countdown" id="countdown11">
      <ul className="countdown-list flex-align flex-wrap">
        <li className="countdown-list__item text-heading flex-align gap-4 text-xs fw-medium w-28 h-28 rounded-4 border border-main-600 p-0 flex-center">
          {timeLeft.days} <span className="days" />
        </li>
        <li className="countdown-list__item text-heading flex-align gap-4 text-xs fw-medium w-28 h-28 rounded-4 border border-main-600 p-0 flex-center">
          {timeLeft.hours}
          <span className="hours" />
        </li>
        <li className="countdown-list__item text-heading flex-align gap-4 text-xs fw-medium w-28 h-28 rounded-4 border border-main-600 p-0 flex-center">
          {timeLeft.minutes}
          <span className="minutes" />
        </li>
        <li className="countdown-list__item text-heading flex-align gap-4 text-xs fw-medium w-28 h-28 rounded-4 border border-main-600 p-0 flex-center">
          {timeLeft.seconds}
          <span className="seconds" />
        </li>
      </ul>
    </div>
  );
};

const ProductDetailsOne = ({ onSetProduct }) => {
  const [rightTimer, setRightTimer] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [timeLeft, setTimeLeft] = useState(getCountdown());

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/category`)
      .then((res) => res.json())
      .then((data) => setCategory(data))
      .catch((err) => console.error("Ошибка загрузки категории", err));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/subcategory`)
      .then((res) => res.json())
      .then((data) => setSubCategory(data))
      .catch((err) => console.error("Ошибка загрузки сабкатегории", err));
  }, []);

  const [productImages, setProductImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (productImages.length > 0) {
      setMainImage(productImages[0]);
    }
  }, [productImages]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/product-details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        if (onSetProduct) onSetProduct(data);

        const titleImage = data.imageTitleKey;
        const sliderImages = data.imageSliderKey || [];

        const filteredSliderImages = sliderImages.filter(
          (img) => img !== titleImage
        );

        const finalImages = titleImage
          ? [titleImage, ...filteredSliderImages]
          : filteredSliderImages;

        setProductImages(finalImages);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки товара:", err);
        setIsLoading(false); // Важно: установка в блоке catch тоже
      });
  }, [id, onSetProduct]);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const deadline = new Date().getTime() + 12 * 60 * 60 * 1000;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = deadline - now;
      if (diff <= 0) {
        clearInterval(interval);
        setRightTimer({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setRightTimer({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [quantity, setQuantity] = useState(1);
  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () =>
    setQuantity(quantity > 1 ? quantity - 1 : quantity);

  const settingsThumbs = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    focusOnSelect: true,
  };

  // Функции для изменения количества

  // В месте вывода цены добавь вычисление total
  const totalPrice =
    product && product.product_price
      ? (parseFloat(product.product_price) * quantity).toFixed(2)
      : null;
  const handleWhatsAppClick = (product) => {
    const phone = "37379980190";
    const message = `Salut! Sunt interesat de produsul: ${product.product_name}.\nLink: ${window.location.href}`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { addToCart } = useCart();
  if (isLoading) {
    return <div className="spinner"></div>;
  }
  return (
    <section className="product-details py-80">
      <div className="container container-lg">
        <div className="row gy-4">
          <div className="col-lg-12">
            <div className="row gy-4">
              <div className="col-xl-6">
                <div className="product-details__left">
                  <div className="product-details__thumb-slider border border-gray-100 rounded-16">
                    <div className="">
                      {product ? (
                        mainImage ? (
                          <div className="product-details__thumb flex-center h-100">
                            <img
                              src={`${process.env.REACT_APP_BASE_URL}/uploads/products/${mainImage}`}
                              alt="Main Product"
                            />
                          </div>
                        ) : (
                          <div className="product-details__thumb flex-center h-100">
                            <img
                              src={`${process.env.REACT_APP_BASE_URL}/uploads/products/${product.imageTitleKey}`}
                              alt={product.product_name}
                            />
                          </div>
                        )
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-24">
                    <div className="product-details__images-slider">
                      <Slider {...settingsThumbs}>
                        {productImages.map((image, index) => (
                          <div
                            className="center max-w-120 max-h-120 h-100 flex-center border border-gray-100 rounded-16 p-8"
                            key={index}
                            onClick={() => setMainImage(image)}
                          >
                            <img
                              className="thum"
                              src={`${process.env.REACT_APP_BASE_URL}/uploads/products/${image}`}
                              alt={`Thumbnail ${index}`}
                            />
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                {product ? (
                  <div className="product-details__content">
                    <h5 className="mb-12">{product.product_name}</h5>
                    <div className="flex-align flex-wrap gap-12">
                      {/* <div className="flex-align gap-12 flex-wrap">
                        <div className="flex-align gap-8">
                          <span className="text-sm fw-medium text-neutral-600 flex-align">
                            {product.product_rating}{" "}
                          </span>
                        </div>
                      </div> */}
                    </div>
                    <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />
                    {/* <span className="text-heading text-md fw-semibold">
                      {product.product_category &&
                      product.product_category.length > 0
                        ? product.product_category
                            .map((catId) => {
                              const cat = category.find(
                                (c) => String(c.id) === String(catId)
                              );
                              return cat
                                ? `Categorie: ${cat.name} `
                                : "Fara Categorie";
                            })
                            .join(", ")
                        : "Fara Categorie"}
                    </span> */}
                    <span className="text-heading text-md fw-semibold">
                      {product.product_category &&
                      product.product_category.length > 0
                        ? (() => {
                            const categories = product.product_category
                              .map((catId) =>
                                category.find(
                                  (c) => String(c.id) === String(catId)
                                )
                              )
                              .filter(Boolean); // убираем null'ы, если категория не найдена

                            if (categories.length === 0)
                              return "Fara Categorie";

                            return (
                              <>
                                <span className="me-1">Categorie:</span>
                                {categories.map((cat, index) => (
                                  <div key={cat.id}>
                                    <Link
                                      to={`/shop/${cat.slug}`}
                                      className="text-gray-500 text-15  flex-align gap-4 rounded-0"
                                    >
                                      {cat.name}
                                    </Link>
                                  </div>
                                ))}
                              </>
                            );
                          })()
                        : "Fara Categorie"}
                    </span>

                    <div className="mt-32 flex-align flex-wrap gap-32">
                      <div className="flex-align gap-8">
                        <div className="product-card__price my-20">
                          <h4 className="mb-0">
                            {" "}
                            {product.product_price !== null &&
                            product.product_price !== "0.00"
                              ? `${product.product_price} MDL`
                              : `${product.product_new_price} MDL`}
                          </h4>
                        </div>
                        {!!product?.product_old_price && (
                          <span className="text-md text-gray-500">
                            {" "}
                            {`${product.product_old_price} MDL`}
                          </span>
                        )}
                      </div>
                    </div>
                    <h4 className="mt-10 mb-16 text-gray-700 text-md">
                      Total: {totalPrice} MDL
                    </h4>
                    <span className="mt-20 pt-20 text-gray-700 border-top border-gray-100 d-block" />
                    {product?.is_for_sale === 1 && (
                      <div className="flex-align flex-wrap gap-16 bg-color-one rounded-8 py-16 px-24">
                        <div className="flex-align gap-16">
                          <span className="text-main-600 text-sm">
                            Ofertă specială:
                          </span>
                        </div>

                        <ProductTimer
                          sale_start_date={product.sale_start_date}
                          date_for_sale={product.date_for_sale}
                        />

                        <span className="text-gray-900 text-xs">
                          Rămâne până la sfârșitul ofertei
                        </span>
                      </div>
                    )}

                    <div className="mb-10">
                      <div className="mt-12">
                        <div
                          className="progress w-100 bg-color-three rounded-pill h-4"
                          role="progressbar"
                          aria-label="Basic example"
                          aria-valuenow={
                            product.product_count > 0
                              ? (product.product_sold / product.product_count) *
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
                          Vândut: {product.product_sold}/{product.product_count}
                        </span>
                      </div>

                      <span className="text-sm text-gray-700 mt-8">
                        Disponibil doar:{product.product_count}
                      </span>
                    </div>
                    <span className="text-gray-900 d-block mb-8">
                      Cantitate:
                    </span>
                    <div className="flex-between gap-16 flex-wrap">
                      <div className="flex-align flex-wrap gap-16">
                        <div className="border border-gray-100 rounded-pill py-9 px-16 flex-align">
                          <button
                            onClick={decrementQuantity}
                            type="button"
                            className="quantity__minus p-4 text-gray-700 hover-text-main-600 flex-center"
                          >
                            <i className="ph ph-minus" />
                          </button>
                          <input
                            type="number"
                            className="quantity__input border-0 text-center w-32"
                            value={quantity}
                            readOnly
                          />
                          <button
                            onClick={incrementQuantity}
                            type="button"
                            className="quantity__plus p-4 text-gray-700 hover-text-main-600 flex-center"
                          >
                            <i className="ph ph-plus" />
                          </button>
                        </div>

                        {/* Лучше использовать button для действий */}
                        <button
                          type="button"
                          className="btn btn-main rounded-pill flex-align d-inline-flex gap-8 px-48"
                          onClick={() => {
                            addToCart(product, quantity);
                            openModal();
                          }}
                        >
                          <i className="ph ph-shopping-cart" />
                          Adaugă in coş
                        </button>
                      </div>

                      <div className="flex-align gap-12">
                        <Link
                          href="#"
                          className="btn btn-main rounded-pill"
                          onClick={(e) => {
                            e.preventDefault();
                            handleWhatsAppClick(product);
                          }}
                        >
                          Order on WhatsApp
                        </Link>
                      </div>
                    </div>

                    <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />
                  </div>
                ) : (
                  <p>ceva nu a mers bine...</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-80">
          <div className="product-dContent border rounded-24">
            <div className="product-dContent__header border-bottom border-gray-100 flex-between flex-wrap gap-16">
              <ul
                className="nav common-tab nav-pills mb-3"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-description-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-description"
                    type="button"
                    role="tab"
                    aria-controls="pills-description"
                    aria-selected="true"
                  >
                    Descriere
                  </button>
                </li>
                {/* <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-reviews-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-reviews"
                    type="button"
                    role="tab"
                    aria-controls="pills-reviews"
                    aria-selected="false"
                  >
                    Recenzii
                  </button>
                </li> */}
              </ul>
            </div>
            <div className="product-dContent__box">
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-description"
                  role="tabpanel"
                  aria-labelledby="pills-description-tab"
                  tabIndex={0}
                >
                  <div className="mb-40">
                    <h6 className="mb-24">Descriere produs</h6>
                    {product?.product_descr}
                  </div>

                  {product && product.product_more_details !== null && (
                    <div className="mb-0">
                      <h6 className="mb-24">Mai multe detalii</h6>
                      <ul className="mt-32">
                        {product.product_more_details.map((item, index) => (
                          <li
                            key={index}
                            className="text-gray-400 mb-14 flex-align gap-14"
                          >
                            <span className="w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle">
                              <i className="ph ph-check" />
                            </span>
                            <span className="text-gray-500">{item} </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-reviews"
                  role="tabpanel"
                  aria-labelledby="pills-reviews-tab"
                  tabIndex={0}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        relatedProducts={Array.isArray(product) ? product : []}
      />
    </section>
  );
};

export default ProductDetailsOne;
