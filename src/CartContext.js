// import React, { createContext, useContext, useState, useEffect } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState(() => {
//     const saved = localStorage.getItem("cart");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // Состояния для модалки
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [modalType, setModalType] = useState(""); // "success" или "error"

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (product, quantity = 1) => {
//     if (!product || !product.product_id) return;

//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find(
//         (item) => item.product_id === product.product_id
//       );

//       if (existingItem) {
//         return prevItems.map((item) =>
//           item.product_id === product.product_id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }

//       return [...prevItems, { ...product, quantity }];
//     });

//     setModalMessage(`Produsul "${product.product_name}" a fost adăugat în coș!`);
//     setModalType("success");
//     setModalOpen(true);
//   };

//   const removeFromCart = (productId) => {
//     setCartItems((prevItems) =>
//       prevItems.filter((item) => item.product_id !== productId)
//     );
//   };

//   const setItemQuantity = (productId, newQuantity) => {
//     if (newQuantity <= 0) {
//       removeFromCart(productId);
//       return;
//     }

//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.product_id === productId
//           ? { ...item, quantity: newQuantity }
//           : item
//       )
//     );
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   // Компонент модалки
//   const ModalComponent = ({ visible, message, type, onClose }) => {
//     if (!visible) return null;

//     return (
//       <div
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100vw",
//           height: "100vh",
//           backgroundColor: "rgba(0,0,0,0.5)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           zIndex: 9999,
//         }}
//         onClick={onClose}
//       >
//         <div
//           onClick={(e) => e.stopPropagation()}
//           style={{
//             backgroundColor: "#fff",
//             padding: 20,
//             borderRadius: 8,
//             minWidth: 300,
//             textAlign: "center",
//             boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
//           }}
//         >
//           <h2 style={{ color: type === "success" ? "green" : "red" }}>
//             {type === "success" ? "Succes" : "Eroare"}
//           </h2>
//           <p>{message}</p>
//           <button
//             onClick={onClose}
//             style={{
//               marginTop: 15,
//               padding: "8px 20px",
//               cursor: "pointer",
//               borderRadius: 4,
//               border: "none",
//               backgroundColor: type === "success" ? "green" : "red",
//               color: "#fff",
//             }}
//           >
//             Închide
//           </button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <CartContext.Provider
//       value={{ 
//         cartItems, 
//         addToCart, 
//         removeFromCart, 
//         setItemQuantity, 
//         clearCart 
//       }}
//     >
//       {children}

//       {/* Встраиваем модалку в контекст */}
//       <ModalComponent
//         visible={modalOpen}
//         message={modalMessage}
//         type={modalType}
//         onClose={() => setModalOpen(false)}
//       />
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Состояния для модалки
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // "success" или "error"

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {

    if (!product || !product.product_id) return;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product_id === product.product_id
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // Добавляем продукт в корзину (включая slug, если он есть)
      return [...prevItems, { ...product, quantity }];
    });

    setModalMessage(`Produsul "${product.product_name}" a fost adăugat în coș!`);
    setModalType("success");
    setModalOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product_id !== productId)
    );
  };

  const setItemQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product_id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Компонент модалки
  const ModalComponent = ({ visible, message, type, onClose }) => {
    if (!visible) return null;

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 8,
            minWidth: 300,
            textAlign: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          <h2 style={{ color: type === "success" ? "green" : "red" }}>
            {type === "success" ? "Succes" : "Eroare"}
          </h2>
          <p>{message}</p>
          <button
            onClick={onClose}
            style={{
              marginTop: 15,
              padding: "8px 20px",
              cursor: "pointer",
              borderRadius: 4,
              border: "none",
              backgroundColor: type === "success" ? "green" : "red",
              color: "#fff",
            }}
          >
            Închide
          </button>
        </div>
      </div>
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        setItemQuantity,
        clearCart,
      }}
    >
      {children}

      {/* Встраиваем модалку в контекст */}
      <ModalComponent
        visible={modalOpen}
        message={modalMessage}
        type={modalType}
        onClose={() => setModalOpen(false)}
      />
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
