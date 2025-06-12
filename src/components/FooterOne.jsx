import React from "react";
import { Link } from "react-router-dom";
import { useCategories } from "../context/CategoryContext";
const FooterOne = () => {
  const { categories } = useCategories();

  // const handleCategoryToggle = () => {
  //   setActiveCategory(!activeCategory);
  // };
  return (
    <footer className="footer py-40">
      <img
        src="assets/images/bg/body-bottom-bg.png"
        alt="BG"
        className="body-bottom-bg"
      />
      <div className="container container-lg">
        <div className="footer-item-wrapper d-flex align-items-start flex-wrap">
          <div className="footer-item">
            <div className="footer-item__logo">
              <Link to="/">
                {" "}
                <img
                  src={
                    process.env.REACT_APP_BASE_URL
                      ? `${process.env.REACT_APP_BASE_URL}/uploads/logo-flora.jpg`
                      : "https://flowers.vetro.md/uploads/logo-flora.jpg"
                  }
                  alt="Logo"
                />{" "}
              </Link>
            </div>

            <div className="flex-align gap-16 mb-16">
              <span className="w-32 h-32 flex-center rounded-circle bg-main-600 text-white text-md flex-shrink-0">
                <i className="ph-fill ph-map-pin" />
              </span>
              <span className="text-md text-gray-900 ">
                Livrare toata Moldova
              </span>
            </div>
            <div className="flex-align gap-16 mb-16">
              <span className="w-32 h-32 flex-center rounded-circle bg-main-600 text-white text-md flex-shrink-0">
                <i className="ph-fill ph-phone-call" />
              </span>
              <div className="flex-align gap-16 flex-wrap">
                <a
                  href="tel:+37379980190"
                  className="text-md text-gray-900 hover-text-main-600"
                >
                  0 799 80 190
                </a>
              </div>
            </div>
            <div>
              <a
                href="https://www.facebook.com/people/Paradis-Florra/61565943072098/"
                target="_blank"
                rel="noreferrer"
                className="w-44 h-44 flex-center bg-main-100 text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"
              >
                <i className="ph-fill ph-facebook-logo" />
              </a>
            </div>
          </div>
          <div className="footer-item">
            <h6 className="footer-item__title">Informaţii</h6>
            <ul className="footer-menu">
              <li className="mb-16">
                <Link to="/" className="text-gray-600 hover-text-main-600">
                  Acasă
                </Link>
              </li>
              <li className="mb-16">
                <Link to="/shop" className="text-gray-600 hover-text-main-600">
                  Magazin
                </Link>
              </li>
              <li className="mb-16">
                <Link
                  to="/contact"
                  className="text-gray-600 hover-text-main-600"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-item">
            <h6 className="footer-item__title">Support</h6>
            <ul className="footer-menu">
              <li className="mb-16">
                <Link
                  to="/delivery"
                  className="text-gray-600 hover-text-main-600"
                >
                  Livrare
                </Link>
              </li>
              <li className="mb-16">
                <Link to="/terms" className="text-gray-600 hover-text-main-600">
                  Termeni și condiții
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-item">
            <h6 className="footer-item__title">Categorie</h6>
            <ul className="d-flex flex-wrap gap-10">
              {categories.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/shop/${item.slug}`}
                    className={`text-gray-500 text-15 
                          `}
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterOne;
