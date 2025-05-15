import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
const FeatureOne = () => {
  const [lengthSlider, setLengthSlider] = useState(0);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/category`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.length);
        if (data && data.length > 1) {
          setLengthSlider(data.length);
        }
        setCategory(data);
      })
      .catch((err) => console.error("Ошибка загрузки категорий", err));
  }, []);
  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <button
        type="button"
        onClick={onClick}
        className={` ${className} slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
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
        className={`${className} slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
      >
        <i className="ph ph-caret-left" />
      </button>
    );
  }
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: lengthSlider > 1 ? lengthSlider - 1 : 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1699,
        settings: {
          slidesToShow: 9,
        },
      },
      {
        breakpoint: 1599,
        settings: {
          slidesToShow: 8,
        },
      },
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 424,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 359,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="feature" id="featureSection">
      <div className="container container-lg">
        <div className="position-relative arrow-center">
          <div className="flex-align">
            <button
              type="button"
              id="feature-item-wrapper-prev"
              className="slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1"
            >
              <i className="ph ph-caret-left" />
            </button>
            <button
              type="button"
              id="feature-item-wrapper-next"
              className="slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1"
            >
              <i className="ph ph-caret-right" />
            </button>
          </div>
          <div className="feature-item-wrapper">
            <Slider {...settings}>
              {category.map((item, index) => (
                <div className="feature-item text-center" key={item.id}>
                  <div className="feature-item__thumb rounded-circle">
                    <Link to="/shop" className="w-100 h-100 flex-center">
                      {/* <img
                        src={
                          item.image?.path
                            ? `${process.env.REACT_APP_BASE_URL}/uploads/${item.image.path}`
                            : ""
                        }
                        alt=""
                      /> */}
                      <img
                        src={
                          item.image?.path
                            ? `https://22fe0b98-98dc-4698-bc7f-6e4b58d9167f-00-3knz5siaeg7wa.worf.replit.dev/uploads/${item.image.path}`
                            : ""
                        }
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="feature-item__content mt-16">
                    <h6 className="text-lg mb-8">
                      <Link to="/shop" className="text-inherit">
                        {item.name}
                      </Link>
                    </h6>
                    {/* <span className="text-sm text-gray-400">125+ Products</span> */}
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

export default FeatureOne;
