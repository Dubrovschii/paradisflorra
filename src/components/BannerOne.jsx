import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Slider from "react-slick";

const BannerOne = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((res) => res.json())
      .then((data) => setSlides(data))
      .catch((err) => console.error("Ошибка загрузки слайдов", err));
  }, []);

  const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <button
        onClick={onClick}
        className={`${className} slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
      >
        <i className="ph ph-caret-right" />
      </button>
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <button
        onClick={onClick}
        className={`${className} slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
      >
        <i className="ph ph-caret-left" />
      </button>
    );
  };

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="banner">
      <div className="container container-lg">
        <div className="banner-item rounded-24 overflow-hidden position-relative arrow-center">
          <a
            href="#featureSection"
            className="scroll-down w-84 h-84 text-center flex-center bg-main-600 rounded-circle border border-5 text-white border-white position-absolute start-50 translate-middle-x bottom-0 hover-bg-main-800"
          >
            <span className="icon line-height-0">
              <i className="ph ph-caret-double-down" />
            </span>
          </a>

          <img
            src="/assets/images/bg/banner-bg.png"
            alt=""
            className="banner-img position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 z-n1 object-fit-cover rounded-24"
          />

          <div className="banner-slider">
            <Slider {...settings}>
              {slides.map((slide, index) => (
                <div className="banner-slider__item" key={slide.id}>
                  <div className="banner-slider__inner flex-between position-relative">
                    <div className="banner-item__content">
                      <h1 className="banner-item__title">
                        {slide.slider_title}
                      </h1>
                      <p className="banner-item__descr">{slide.slider_descr}</p>
                      {slide.slider_link && (
                        <a
                          href={slide.slider_link}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-main d-inline-flex align-items-center rounded-pill gap-8"
                        >
                          {slide.slider_link_text || "Подробнее"}{" "}
                          {/* <span className="icon text-xl d-flex">
                            <i className="ph ph-shopping-cart-simple" />
                          </span> */}
                        </a>
                      )}
                    </div>
                    <div className="banner-item__thumb">
                      <img
                        src={
                          slide.slider_img?.path
                            ? `http://localhost:3001/uploads/${slide.slider_img.path}`
                            : ""
                        }
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerOne;
