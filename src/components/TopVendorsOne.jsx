import React from "react";
import { Link } from "react-router-dom";
import { useCategories } from "../context/CategoryContext"; // проверь путь
import { useProducts } from "../context/ProductContext"; // импорт контекста продуктов

const TopVendorsOne = () => {
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useProducts();

  if (categoriesLoading || productsLoading)
    return <div className="spinner"></div>;
  if (categoriesError) return <p>Ошибка категорий: {categoriesError}</p>;
  if (productsError) return <p>Ошибка продуктов: {productsError}</p>;

  return (
    <section className="top-vendors py-80">
      <div className="container container-lg">
        <div className="section-heading">
          <div className="flex-between flex-wrap gap-8">
            <h5 className="mb-0">Catega categorii</h5>
            <Link
              to="/shop"
              className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
            >
              Toate Categorie
            </Link>
          </div>
        </div>

        <div className="row gy-4 vendor-card-wrapper">
          {categories.map((item) => {
            if (!item.imageBackgroundKey) return null;

            return (
              <div className="col-xxl-3 col-lg-4 col-sm-6" key={item.id}>
                <div className="vendor-card text-center px-16 pb-24">
                  <div className="vendor-card__start">
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/uploads/categorie/${item.imageBackgroundKey}`}
                      alt={item.name}
                    />
                    <h6 className="title mt-32">{item.name}</h6>
                    <span className="text-heading text-sm d-block">
                      Livrare până la ora 19:15
                    </span>
                    <Link
                      to={`/shop/${item.slug}`}
                      className="btn btn-main-two rounded-pill py-6 px-16 text-12 mt-8"
                    >
                      Mai multe categorii
                    </Link>
                  </div>

                  <div className="vendor-card__list mt-22 flex-center flex-wrap gap-8">
                    {products
                      .filter((product) =>
                        product.product_category?.includes(String(item.id))
                      )
                      .map((product) => (
                        <div
                          className="vendor-card__item bg-white rounded-circle flex-center"
                          key={product.product_id}
                        >
                          <img
                            src={
                              product?.imageTitleKey
                                ? `${process.env.REACT_APP_BASE_URL}/uploads/products/${product.imageTitleKey}`
                                : ""
                            }
                            alt={product.product_name}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopVendorsOne;
