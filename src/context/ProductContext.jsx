import React, { createContext, useState, useEffect, useContext } from "react";

// Создаем контекст
const ProductContext = createContext();

// Провайдер контекста
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [lengthSlider, setLengthSlider] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_BASE_URL}/api/product`)
      .then((res) => res.json())
      .then((data) => {
        const productsArray = data?.data || [];

        const seasonalProducts = productsArray.filter(
          (product) => product.product_season !== null
        );

        setLengthSlider(seasonalProducts.length);
        setProducts(productsArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки продуктов", err);
        setLoading(false);
      });
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, lengthSlider, setProducts, loading }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts должен использоваться внутри ProductProvider");
  }
  return context;
};
