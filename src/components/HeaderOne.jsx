import React, { useEffect, useState } from "react";
import query from "jquery";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext.js";
import { useCategories } from "../context/CategoryContext";

const HeaderOne = () => {
  const [scroll, setScroll] = useState(false);
  const { categories } = useCategories();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("1");
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [subcategory, setSubCategory] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/locations`)
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch((err) => console.error("Ошибка загрузки", err));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/subcategory`)
      .then((res) => res.json())
      .then((data) => setSubCategory(data))
      .catch((err) => console.error("Ошибка загрузки", err));
  }, []);

  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset < 150) {
        setScroll(false);
      } else if (window.pageYOffset > 150) {
        setScroll(true);
      }
      return () => (window.onscroll = null);
    };
    const selectElement = query(".js-example-basic-single");
    selectElement.select2();

    // Добавляем обработчик изменения категории
    selectElement.on("change", (e) => {
      setSelectedCategory(e.target.value);
    });

    return () => {
      if (selectElement.data("select2")) {
        selectElement.select2("destroy");
      }
    };
  }, []);

  const { cartItems } = useCart();

  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  // Mobile menu support
  const [menuActive, setMenuActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const handleMenuClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const handleMenuToggle = () => {
    setMenuActive(!menuActive);
  };

  // Search control support
  const [activeSearch, setActiveSearch] = useState(false);
  const handleSearchToggle = () => {
    setActiveSearch(!activeSearch);
  };

  // category control support
  const [activeCategory, setActiveCategory] = useState(false);
  const handleCategoryToggle = () => {
    setActiveCategory(!activeCategory);
  };
  const [activeIndexCat, setActiveIndexCat] = useState(null);

  // Обработчик поиска
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (selectedCategory === "1") {
        // Поиск по всем категориям
        navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      } else {
        // Поиск в конкретной категории
        const category = categories.find(
          (cat) => cat.id.toString() === selectedCategory
        );
        navigate(
          `/shop?search=${encodeURIComponent(
            category.name
          )}&search=${encodeURIComponent(searchQuery)}`
        );
      }
      setSearchQuery("");
    }
  };

  // Обработчик нажатия клавиши Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <>
      <div className="overlay" />
      <div
        className={`side-overlay ${(menuActive || activeCategory) && "show"}`}
      />
      {/* ==================== Search Box Start Here ==================== */}
      <form action="#" className={`search-box ${activeSearch && "active"}`}>
        <button
          onClick={handleSearchToggle}
          type="button"
          className="search-box__close position-absolute inset-block-start-0 inset-inline-end-0 m-16 w-48 h-48 border border-gray-100 rounded-circle flex-center text-white hover-text-gray-800 hover-bg-white text-2xl transition-1"
        >
          <i className="ph ph-x" />
        </button>
        <div className="container">
          <div className="position-relative">
            <input
              type="text"
              className="form-control py-16 px-24 text-xl rounded-pill pe-64"
              placeholder="Căutați un produs sau o marcă"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              type="submit"
              className="w-48 h-48 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8"
              onClick={handleSearch}
            >
              <i className="ph ph-magnifying-glass" />
            </button>
          </div>
        </div>
      </form>
      {/* ==================== Search Box End Here ==================== */}
      {/* ==================== Mobile Menu Start Here ==================== */}
      <div
        className={`mobile-menu scroll-sm d-lg-none d-block ${
          menuActive && "active"
        }`}
      >
        <button
          onClick={() => {
            handleMenuToggle();
            setActiveIndex(null);
          }}
          type="button"
          className="close-button"
        >
          <i className="ph ph-x" />{" "}
        </button>
        <div className="mobile-menu__inner">
          <Link to="/" className="mobile-menu__logo">
            <img
              src={
                process.env.REACT_APP_BASE_URL
                  ? `${process.env.REACT_APP_BASE_URL}/uploads/logo-flora.jpg`
                  : "https://flowers.vetro.md/uploads/logo-flora.jpg"
              }
              alt="Logo"
            />{" "}
          </Link>
          <div className="mobile-menu__menu">
            {/* Nav Menu Start */}

            <ul className="nav-menu flex-align nav-menu--mobile">
              {/* Home Menu */}
              <li
                onClick={() => handleMenuClick(0)}
                className={`on-hover-item nav-menu__item  ${
                  activeIndex === 0 ? "d-block" : ""
                }`}
              >
                <Link to="#" className="nav-menu__link">
                  Acasă
                </Link>
              </li>

              {/* Shop Menu */}
              <li
                onClick={() => handleMenuClick(1)}
                className={`on-hover-item nav-menu__item ${
                  activeIndex === 1 ? "d-block" : ""
                }`}
              >
                <Link to="#" className="nav-menu__link">
                  Shop
                </Link>
                <ul
                  className={`on-hover-dropdown common-dropdown nav-submenu scroll-sm ${
                    activeIndex === 1 ? "open" : ""
                  }`}
                >
                  <li className="common-dropdown__item nav-submenu__item">
                    <Link
                      to="/shop"
                      className="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                      onClick={() => setActiveIndex(null)}
                    >
                      {" "}
                      Shop
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Pages Menu */}
              <li
                onClick={() => handleMenuClick(2)}
                className={`on-hover-item nav-menu__item has-submenu ${
                  activeIndex === 2 ? "d-block" : ""
                }`}
              >
                {/* <span className="badge-notification bg-warning-600 text-white text-sm py-2 px-8 rounded-4">
                  New
                </span> */}
              </li>

              {/* Contact Us Menu */}
              <li className="nav-menu__item">
                <Link
                  to="/contact"
                  className="nav-menu__link"
                  onClick={() => setActiveIndex(null)}
                >
                  Contact
                </Link>
              </li>
            </ul>
            {/* Nav Menu End */}
          </div>
        </div>
      </div>
      {/* ==================== Mobile Menu End Here ==================== */}
      {/* ======================= Middle Top Start ========================= */}
      <div className="header-top bg-main-600 flex-between">
        <div className="container container-lg">
          <div className="flex-between flex-wrap gap-8">
            <ul className="flex-align flex-wrap d-none d-md-flex">
              <li className="border-right-item">
                <Link
                  to="/delivery"
                  className="text-white text-sm hover-text-decoration-underline"
                >
                  Livrare
                </Link>
              </li>
              <li className="border-right-item">
                <Link
                  to="/terms"
                  className="text-white text-sm hover-text-decoration-underline"
                >
                  Termeni și condiții
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* ======================= Middle Top End ========================= */}
      {/* ======================= Middle Header Start ========================= */}
      <header className="header-middle bg-color-one border-bottom border-gray-100">
        <div className="container container-lg">
          <nav className="header-inner flex-between">
            {/* Logo Start */}
            <div className="logo">
              <Link to="/" className="link">
                <img
                  src={
                    process.env.REACT_APP_BASE_URL
                      ? `${process.env.REACT_APP_BASE_URL}/uploads/logo-flora.jpg`
                      : "https://flowers.vetro.md/uploads/logo-flora.jpg"
                  }
                  alt="Logo"
                />
              </Link>
            </div>
            {/* Logo End  */}
            {/* form location Start */}
            <form
              onSubmit={handleSearch}
              className="flex-align flex-wrap form-location-wrapper"
            >
              <div className="search-category d-flex h-48 select-border-end-0 radius-end-0 search-form d-sm-flex d-none">
                <select
                  defaultValue={selectedCategory}
                  className="js-example-basic-single border border-gray-200 border-end-0"
                  name="state"
                >
                  <option value="1">Toate categoriile</option>
                  {categories.map((item, index) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className="search-form__wrapper position-relative">
                  <input
                    type="text"
                    className="search-form__input common-input py-13 ps-16 pe-18 rounded-end-pill pe-44"
                    placeholder="Căutați un produs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button
                    type="submit"
                    className="w-32 h-32 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8"
                  >
                    <i className="ph ph-magnifying-glass" />
                  </button>
                </div>
              </div>
              {/* <div className="location-box bg-white flex-align gap-8 py-6 px-16 rounded-pill border border-gray-100">
                <span className="text-gray-900 text-xl d-xs-flex d-none">
                  <i className="ph ph-map-pin" />
                </span>
                <div className="line-height-1">
                  <span className="text-gray-600 text-xs">Locația dvs.</span>
                  <div className="line-height-1">
                    <select
                      defaultValue={1}
                      className="js-example-basic-single border border-gray-200 border-end-0"
                      name="state"
                    >
                      {locations.map((location, index) => (
                        <option value={1} key={index}>
                          {location.region}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div> */}
            </form>
            {/* form location start */}
            {/* Header Middle Right start */}
            <div className="header-right flex-align d-lg-block d-none">
              <div className="flex-align flex-wrap gap-12">
                <button
                  type="button"
                  className="search-icon flex-align d-lg-none d-flex gap-4 item-hover"
                >
                  <span className="text-2xl text-gray-700 d-flex position-relative item-hover__text">
                    <i className="ph ph-magnifying-glass" />
                  </span>
                </button>
                <Link to="/cart" className="flex-align gap-4 item-hover">
                  <span className="text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text">
                    <i className="ph ph-shopping-cart-simple" />
                    <span className="w-16 h-16 flex-center rounded-circle bg-main-600 text-white text-xs position-absolute top-n6 end-n4">
                      {cartCount}
                    </span>
                  </span>
                  <span className="text-md text-gray-500 item-hover__text d-none d-lg-flex">
                    Coş
                  </span>
                </Link>
              </div>
            </div>

            {/* Header Middle Right End  */}
          </nav>
        </div>
      </header>
      {/* ======================= Middle Header End ========================= */}
      {/* ==================== Header Start Here ==================== */}
      <header
        className={`header bg-white border-bottom border-gray-100 ${
          scroll && "fixed-header"
        }`}
      >
        <div className="container container-lg">
          <nav className="header-inner d-flex justify-content-between gap-8">
            <div className="flex-align menu-category-wrapper">
              {/* Category Dropdown Start */}
              <div className="category on-hover-item">
                <button
                  onClick={handleCategoryToggle}
                  type="button"
                  className="category__button flex-align gap-8 fw-medium p-16 border-end border-start border-gray-100 text-heading"
                >
                  <span className="icon text-2xl d-xs-flex ">
                    <i className="ph ph-dots-nine" />
                  </span>
                  <span className="d-sm-flex d-none">Toate categoriile</span>
                  <span className="arrow-icon text-xl d-flex">
                    <i className="ph ph-caret-down" />
                  </span>
                </button>
                <div
                  className={`responsive-dropdown cat on-hover-dropdown common-dropdown nav-submenu p-0 submenus-submenu-wrapper ${
                    activeCategory && "active"
                  }`}
                >
                  <button
                    onClick={() => {
                      handleCategoryToggle();
                      setActiveIndexCat(null);
                    }}
                    type="button"
                    className="close-responsive-dropdown rounded-circle text-xl position-absolute inset-inline-end-0 inset-block-start-0 mt-4 me-8 d-lg-none d-flex"
                  >
                    {" "}
                    <i className="ph ph-x" />{" "}
                  </button>
                  {/* Logo Start */}
                  <div className="logo px-16 d-lg-none d-block">
                    <Link to="/" className="link">
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
                  {/* Logo End */}
                  <ul className="scroll-sm p-0 py-8 w-300 max-h-400 overflow-y-auto">
                    {categories.map((item) => (
                      <li
                        key={item.id}
                        className={`has-submenus-submenu ${
                          activeIndexCat === 1 ? "active" : ""
                        }`}
                      >
                        <Link
                          to={`/shop/${item.slug}`}
                          className={`text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0
                          `}
                        >
                          <span>{item.name}</span>
                          {!!item.is_for_subcategory && (
                            <span className="icon text-md d-flex ms-auto">
                              <i className="ph ph-caret-right" />
                            </span>
                          )}
                        </Link>

                        {!!item.is_for_subcategory && (
                          <div
                            className={`submenus-submenu py-16 ${
                              activeIndexCat === 0 ? "open" : ""
                            }`}
                          >
                            <h6 className="text-lg px-16 submenus-submenu__title">
                              Subcategory
                            </h6>
                            <ul className="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
                              {subcategory
                                .filter(
                                  (subItem) =>
                                    subItem.parent_category === item.id
                                )
                                .map((subItem) => (
                                  <li key={subItem.id}>
                                    <Link
                                      to={`/shop/${item.slug}/${subItem.slug}`}
                                    >
                                      {subItem.name}
                                      {/* {subItem.slug} */}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Category Dropdown End  */}
              {/* Menu Start  */}
              <div className="header-menu d-lg-block d-none">
                {/* Nav Menu Start */}
                <ul className="nav-menu flex-align ">
                  <li className="on-hover-item nav-menu__item ">
                    <Link to="/" className="nav-menu__link">
                      Acasă
                    </Link>
                  </li>
                  <li className="on-hover-item nav-menu__item ">
                    <Link to="/shop" className="nav-menu__link">
                      Shop
                    </Link>
                  </li>

                  <li className="nav-menu__item">
                    <NavLink
                      to="/contact"
                      className={(navData) =>
                        navData.isActive
                          ? "nav-menu__link activePage"
                          : "nav-menu__link"
                      }
                    >
                      Contact
                    </NavLink>
                  </li>
                </ul>
                {/* Nav Menu End */}
              </div>
              {/* Menu End  */}
            </div>
            {/* Header Right start */}
            <div className="header-right flex-align">
              <a
                href="tel:+37379980190"
                className="bg-main-600 text-white p-12 h-100 hover-bg-main-800 flex-align gap-8 text-lg d-lg-flex d-none"
              >
                <div className="d-flex text-32">
                  <i className="ph ph-phone-call" />
                </div>
                0 799 80 190
              </a>

              <div className="me-16 d-lg-none d-block">
                <div className="flex-align flex-wrap gap-12">
                  <button
                    onClick={handleSearchToggle}
                    type="button"
                    className="search-icon flex-align d-lg-none d-flex gap-4 item-hover"
                  >
                    <span className="text-2xl text-gray-700 d-flex position-relative item-hover__text">
                      <i className="ph ph-magnifying-glass" />
                    </span>
                  </button>

                  <Link to="/cart" className="flex-align gap-4 item-hover">
                    <span className="text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text">
                      <i className="ph ph-shopping-cart-simple" />
                      <span className="w-16 h-16 flex-center rounded-circle bg-main-600 text-white text-xs position-absolute top-n6 end-n4">
                        {cartCount}
                      </span>
                    </span>
                    <span className="text-md text-gray-500 item-hover__text d-none d-lg-flex">
                      Cart
                    </span>
                  </Link>
                </div>
              </div>
              <button
                onClick={handleMenuToggle}
                type="button"
                className="toggle-mobileMenu d-lg-none ms-3n text-gray-800 text-4xl d-flex"
              >
                {" "}
                <i className="ph ph-list" />{" "}
              </button>
            </div>
            {/* Header Right End  */}
          </nav>
        </div>
      </header>
      {/* ==================== Header End Here ==================== */}
    </>
  );
};

export default HeaderOne;
