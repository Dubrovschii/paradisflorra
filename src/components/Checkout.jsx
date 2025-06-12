// import React, { useState, useEffect } from "react";
// import { useCart } from "../CartContext";
// const Checkout = () => {
//   const [selectedPayment, setSelectedPayment] = useState("payment1");
//   const { cartItems, clearCart } = useCart();
//   const [locations, setLocations] = useState([]);

//   useEffect(() => {
//     fetch(`${process.env.REACT_APP_BASE_URL}/api/locations`)
//       .then((res) => res.json())
//       .then((data) => setLocations(data))
//       .catch((err) => console.error("Ошибка загрузки", err));
//   }, []);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     city: "",
//     region: "",
//     street: "",
//     houseNumber: "",
//     apartment: "",
//     notes: "",
//   });

//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [modalType, setModalType] = useState("");

//   const handlePaymentChange = (event) => {
//     setSelectedPayment(event.target.id);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => {
//       const price = Number(item.product_new_price || item.product_price || 0);
//       return total + price * item.quantity;
//     }, 0);
//   };

//   const formattedTotal = calculateTotal().toFixed(2);

//   const validateForm = () => {
//     if (!formData.firstName.trim()) {
//       setModalMessage("Completați câmpul Numele");
//       setModalType("error");
//       setModalOpen(true);
//       return false;
//     }
//     const phoneDigits = formData.phone.replace(/\D/g, "");
//     if (phoneDigits.length < 6) {
//       setModalMessage("Introduceți un număr de telefon valid (minim 6 cifre)");
//       setModalType("error");
//       setModalOpen(true);
//       return false;
//     }
//     if (!formData.city.trim()) {
//       setModalMessage("Completați câmpul Oraș");
//       setModalType("error");
//       setModalOpen(true);
//       return false;
//     }
//     if (cartItems.length === 0) {
//       setModalMessage("Coșul este gol");
//       setModalType("error");
//       setModalOpen(true);
//       return false;
//     }
//     return true;
//   };

//   const placeOrder = async () => {
//     if (!validateForm()) return;

//     const orderData = {
//       first_name: formData.firstName,
//       last_name: formData.lastName,
//       phone: formData.phone,
//       email: formData.email,
//       city: formData.city,
//       district: formData.region,
//       street: formData.street,
//       house_number: formData.houseNumber,
//       apartment: formData.apartment,
//       notes: formData.notes,
//       payment_method: selectedPayment,
//       total_price: formattedTotal,
//       items: cartItems.map((item) => ({
//         product_id: item.product_id,
//         product_name: item.product_name,
//         quantity: item.quantity,
//         price: Number(item.product_new_price || item.product_price || 0),
//       })),
//     };

//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_BASE_URL}/api/orders`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(orderData),
//         }
//       );

//       if (!response.ok) throw new Error("Eroare la trimiterea comenzii");

//       const data = await response.json();

//       setModalMessage(
//         "Comandă creată cu succes! Număr comandă: " + data.orderId
//       );
//       setModalType("success");
//       setModalOpen(true);

//       clearCart();
//       setFormData({
//         firstName: "",
//         lastName: "",
//         phone: "",
//         email: "",
//         city: "",
//         region: "",
//         street: "",
//         houseNumber: "",
//         apartment: "",
//         notes: "",
//       });
//     } catch (error) {
//       setModalMessage("Eroare: " + error.message);
//       setModalType("error");
//       setModalOpen(true);
//     }
//   };

//   const ModalComponent = ({ message, type, onClose }) => (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         backgroundColor: "rgba(0,0,0,0.5)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         zIndex: 9999,
//       }}
//       onClick={onClose}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           backgroundColor: "#fff",
//           padding: 20,
//           borderRadius: 8,
//           minWidth: 300,
//           textAlign: "center",
//           boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
//         }}
//       >
//         <h2 style={{ color: type === "success" ? "green" : "red" }}>
//           {type === "success" ? "Succes" : "Eroare"}
//         </h2>
//         <p>{message}</p>
//         <button
//           onClick={onClose}
//           style={{
//             marginTop: 15,
//             padding: "8px 20px",
//             cursor: "pointer",
//             borderRadius: 4,
//             border: "none",
//             backgroundColor: type === "success" ? "green" : "red",
//             color: "#fff",
//           }}
//         >
//           Închide
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {modalOpen && (
//         <ModalComponent
//           message={modalMessage}
//           type={modalType}
//           onClose={() => setModalOpen(false)}
//         />
//       )}
//       <section className="checkout py-80">
//         <div className="container container-lg">
//           <div className="row">
//             <div className="col-xl-9 col-lg-8">
//               <form action="#" className="pe-xl-5">
//                 <div className="row gy-3">
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="text"
//                       name="firstName"
//                       className="common-input border-gray-100"
//                       placeholder="Numele"
//                       onChange={handleInputChange}
//                       value={formData.firstName}
//                     />
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="text"
//                       name="lastName"
//                       className="common-input border-gray-100"
//                       placeholder="Prenumele"
//                       onChange={handleInputChange}
//                       value={formData.lastName}
//                     />
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="text"
//                       name="phone"
//                       className="common-input border-gray-100"
//                       placeholder="Phone"
//                       onChange={handleInputChange}
//                       value={formData.phone}
//                     />
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="text"
//                       name="email"
//                       className="common-input border-gray-100"
//                       placeholder="Email Address"
//                       onChange={handleInputChange}
//                       value={formData.email}
//                     />
//                   </div>

//                   <div className="col-12 col-sm-6">
//                     <div className="common-input border-gray-100">
//                       <select
//                         name="city"
//                         className="select2-field"
//                         onChange={handleInputChange}
//                         value={formData.city}
//                       >
//                         <option value="">Selectează un oraș</option>
//                         {locations.map((location, index) => (
//                           <option value={location.region} key={index}>
//                             {location.region}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="text"
//                       name="region"
//                       className="common-input border-gray-100"
//                       placeholder="Raionul"
//                       onChange={handleInputChange}
//                       value={formData.region}
//                     />
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="text"
//                       name="street"
//                       className="common-input border-gray-100"
//                       placeholder="Strada"
//                       onChange={handleInputChange}
//                       value={formData.street}
//                     />
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="text"
//                       name="houseNumber"
//                       className="common-input border-gray-100"
//                       placeholder="Numerul din casa"
//                       onChange={handleInputChange}
//                       value={formData.houseNumber}
//                     />
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="text"
//                       name="apartment"
//                       className="common-input border-gray-100"
//                       placeholder="Apartment"
//                       onChange={handleInputChange}
//                       value={formData.apartment}
//                     />
//                   </div>
//                   <div className="col-12">
//                     <textarea
//                       name="notes"
//                       className="common-input border-gray-100"
//                       placeholder="Note despre comanda dvs., de exemplu, note speciale pentru livrare."
//                       onChange={handleInputChange}
//                       value={formData.notes}
//                     />
//                   </div>
//                 </div>
//               </form>
//             </div>
//             <div className="col-xl-3 col-lg-4">
//               <div className="checkout-sidebar">
//                 <div className="bg-color-three rounded-8 p-24 text-center">
//                   <span className="text-gray-900 text-xl fw-semibold">
//                     Comenzile dumneavoastră
//                   </span>
//                 </div>
//                 <div className="border border-gray-100 rounded-8 px-24 py-40 mt-24">
//                   <div className="mb-32 pb-32 border-bottom border-gray-100 flex-between gap-8">
//                     <span className="text-gray-900 fw-medium text-xl font-heading-two">
//                       Produse
//                     </span>
//                     <span className="text-gray-900 fw-medium text-xl font-heading-two">
//                       Subtotal
//                     </span>
//                   </div>
//                   {cartItems.map((item, index) => {
//                     const price = Number(
//                       item.product_new_price || item.product_price || 0
//                     );
//                     return (
//                       <div
//                         className="flex-between gap-24 mb-32"
//                         key={`${item.product_name}-${index}`}
//                       >
//                         <div className="flex-align gap-12">
//                           <span className="text-gray-900 fw-normal text-md font-heading-two w-144">
//                             {item.product_name}
//                           </span>
//                           <span className="text-gray-900 fw-normal text-md font-heading-two">
//                             <i className="ph-bold ph-x" />
//                           </span>
//                           <span className="text-gray-900 fw-semibold text-md font-heading-two">
//                             {item.quantity}
//                           </span>
//                         </div>
//                         <span className="text-gray-900 fw-bold text-md font-heading-two">
//                           {(price * item.quantity).toFixed(2)}
//                         </span>
//                       </div>
//                     );
//                   })}

//                   <div className="border-top border-gray-100 pt-30 mt-30">
//                     <div className="mb-32 flex-between gap-8">
//                       <span className="text-gray-900 font-heading-two text-xl fw-semibold">
//                         Subtotal
//                       </span>
//                       <span className="text-gray-900 font-heading-two text-md fw-bold">
//                         {formattedTotal}MDL
//                       </span>
//                     </div>
//                     <div className="mb-0 flex-between gap-8">
//                       <span className="text-gray-900 font-heading-two text-xl fw-semibold">
//                         Total
//                       </span>
//                       <span className="text-gray-900 font-heading-two text-md fw-bold">
//                         {formattedTotal}MDL
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-32 pt-32 border-top border-gray-100">
//                   <p className="text-gray-500">
//                     Datele dumneavoastră personale vor fi utilizate pentru a
//                     procesa comanda dumneavoastră...
//                   </p>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={placeOrder}
//                   className="btn btn-main mt-40 py-18 w-100 rounded-8 mt-56"
//                 >
//                   Plasați comanda
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Checkout;

// import React, { useState, useEffect } from "react";
// import { useCart } from "../CartContext";
// import query from "jquery";

// const Checkout = () => {
//   const [selectedPayment, setSelectedPayment] = useState("payment1");
//   const { cartItems, clearCart } = useCart();
//   const [locations, setLocations] = useState([]);
//   const [deliveryInfo, setDeliveryInfo] = useState([]); // массив объектов доставки для выбранного города
//   const [deliveryPrice, setDeliveryPrice] = useState(0); // выбранная стоимость доставки
//   const [selectedLocation, setSelectedLocation] = useState("1");

//   useEffect(() => {
//     fetch(`${process.env.REACT_APP_BASE_URL}/api/locations`)
//       .then((res) => res.json())
//       .then((data) => setLocations(data))
//       .catch((err) => console.error("Ошибка загрузки", err));
//   }, []);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     city: "",
//     region: "",
//     street: "",
//     houseNumber: "",
//     apartment: "",
//     notes: "",
//   });

//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [modalType, setModalType] = useState("");

//   const handlePaymentChange = (event) => {
//     setSelectedPayment(event.target.id);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     if (name === "city") {
//       if (value) {
//         fetch(
//           `${
//             process.env.REACT_APP_BASE_URL
//           }/api/delivery?city=${encodeURIComponent(value)}`
//         )
//           .then((res) => {
//             if (!res.ok) throw new Error("Ошибка получения доставки");
//             return res.json();
//           })
//           .then((data) => {
//             // data — массив объектов { Id, district, location, price }
//             setDeliveryInfo(data);
//             // сбросить предыдущий регион и стоимость доставки
//             setFormData((prev) => ({ ...prev, region: "" }));
//             setDeliveryPrice(0);
//           })
//           .catch((err) => {
//             console.error("Ошибка загрузки данных доставки:", err);
//             setDeliveryInfo([]);
//             setFormData((prev) => ({ ...prev, region: "" }));
//             setDeliveryPrice(0);
//           });
//       } else {
//         setDeliveryInfo([]);
//         setFormData((prev) => ({ ...prev, region: "" }));
//         setDeliveryPrice(0);
//       }
//     }

//     if (name === "region") {
//       // найти объект доставки по выбранному location (value)
//       const selected = deliveryInfo.find((item) => item.location === value);
//       if (selected) {
//         setDeliveryPrice(selected.price);
//       } else {
//         setDeliveryPrice(0);
//       }
//     }
//   };
//   useEffect(() => {
//     const selectElement = query(".js-example-basic-single");
//     selectElement.select2();

//     // Добавляем обработчик изменения категории
//     selectElement.on("change", (e) => {
//       setSelectedLocation(e.target.value);
//       handleInputChange();
//     });

//     return () => {
//       if (selectElement.data("select2")) {
//         selectElement.select2("destroy");
//       }
//     };
//   }, []);
//   const calculateProductsTotal = () => {
//     return cartItems.reduce((total, item) => {
//       const price = Number(item.product_new_price || item.product_price || 0);
//       return total + price * item.quantity;
//     }, 0);
//   };

//   const productsTotal = calculateProductsTotal();
//   const totalWithDelivery = (productsTotal + deliveryPrice).toFixed(2);

//   const validateForm = () => {
//     if (!formData.firstName.trim()) {
//       setModalMessage("Completați câmpul Numele");
//       setModalType("error");
//       setModalOpen(true);
//       return false;
//     }
//     const phoneDigits = formData.phone.replace(/\D/g, "");
//     if (phoneDigits.length < 6) {
//       setModalMessage("Introduceți un număr de telefon valid (minim 6 cifre)");
//       setModalType("error");
//       setModalOpen(true);
//       return false;
//     }
//     if (!formData.city.trim()) {
//       setModalMessage("Completați câmpul Oraș");
//       setModalType("error");
//       setModalOpen(true);
//       return false;
//     }
//     if (!formData.region.trim()) {
//       setModalMessage("Selectați un raion");
//       setModalType("error");
//       setModalOpen(true);
//       return false;
//     }
//     if (cartItems.length === 0) {
//       setModalMessage("Coșul este gol");
//       setModalType("error");
//       setModalOpen(true);
//       return false;
//     }
//     return true;
//   };

//   const placeOrder = async () => {
//     if (!validateForm()) return;

//     const orderData = {
//       first_name: formData.firstName,
//       last_name: formData.lastName,
//       phone: formData.phone,
//       email: formData.email,
//       city: formData.city,
//       district: formData.region,
//       street: formData.street,
//       house_number: formData.houseNumber,
//       apartment: formData.apartment,
//       notes: formData.notes,
//       payment_method: selectedPayment,
//       total_price: totalWithDelivery,
//       items: cartItems.map((item) => ({
//         product_id: item.product_id,
//         product_name: item.product_name,
//         quantity: item.quantity,
//         price: Number(item.product_new_price || item.product_price || 0),
//       })),
//       delivery_price: deliveryPrice,
//     };

//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_BASE_URL}/api/orders`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(orderData),
//         }
//       );

//       if (!response.ok) throw new Error("Eroare la trimiterea comenzii");

//       const data = await response.json();

//       setModalMessage(
//         "Comandă creată cu succes! Număr comandă: " + data.orderId
//       );
//       setModalType("success");
//       setModalOpen(true);

//       clearCart();
//       setFormData({
//         firstName: "",
//         lastName: "",
//         phone: "",
//         email: "",
//         city: "",
//         region: "",
//         street: "",
//         houseNumber: "",
//         apartment: "",
//         notes: "",
//       });
//       setDeliveryInfo([]);
//       setDeliveryPrice(0);
//     } catch (error) {
//       setModalMessage("Eroare: " + error.message);
//       setModalType("error");
//       setModalOpen(true);
//     }
//   };

//   const ModalComponent = ({ message, type, onClose }) => (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         backgroundColor: "rgba(0,0,0,0.5)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         zIndex: 9999,
//       }}
//       onClick={onClose}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           backgroundColor: "#fff",
//           padding: 20,
//           borderRadius: 8,
//           minWidth: 300,
//           textAlign: "center",
//           boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
//         }}
//       >
//         <h2 style={{ color: type === "success" ? "green" : "red" }}>
//           {type === "success" ? "Succes" : "Eroare"}
//         </h2>
//         <p>{message}</p>
//         <button
//           onClick={onClose}
//           style={{
//             marginTop: 15,
//             padding: "8px 20px",
//             cursor: "pointer",
//             borderRadius: 4,
//             border: "none",
//             backgroundColor: type === "success" ? "green" : "red",
//             color: "#fff",
//           }}
//         >
//           Închide
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {modalOpen && (
//         <ModalComponent
//           message={modalMessage}
//           type={modalType}
//           onClose={() => setModalOpen(false)}
//         />
//       )}
//       <section className="checkout py-80">
//         <div className="container container-lg">
//           <div className="row">
//             <div className="col-xl-9 col-lg-8">
//               <form action="#" className="pe-xl-5">
//                 <div className="row gy-3">
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="text"
//                       name="firstName"
//                       className="common-input border-gray-100"
//                       placeholder="Numele"
//                       onChange={handleInputChange}
//                       value={formData.firstName}
//                     />
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="text"
//                       name="lastName"
//                       className="common-input border-gray-100"
//                       placeholder="Prenumele"
//                       onChange={handleInputChange}
//                       value={formData.lastName}
//                     />
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="text"
//                       name="phone"
//                       className="common-input border-gray-100"
//                       placeholder="Phone"
//                       onChange={handleInputChange}
//                       value={formData.phone}
//                     />
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="text"
//                       name="email"
//                       className="common-input border-gray-100"
//                       placeholder="Email Address"
//                       onChange={handleInputChange}
//                       value={formData.email}
//                     />
//                   </div>

//                   <div className="col-12 col-sm-6 flex-align flex-wrap col-12 col-sm-6">
//                     <div className="location-box  checkout-location-box bg-white flex-align gap-8   border border-gray-100">
//                       <select
//                         name="city"
//                         className="select2-field"
//                         defaultValue={selectedLocation}
//                         value={formData.city}
//                       >
//                         <option value="">Selectează un oraș</option>
//                         {locations.map((location, index) => (
//                           <option value={location.region} key={index}>
//                             {location.region}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="col-12 col-sm-6 ">
//                     <div className="common-input border-gray-100">
//                       {deliveryInfo.length > 0 ? (
//                         <select
//                           name="region"
//                           className="common-input border-gray-100"
//                           value={formData.region}
//                           onChange={handleInputChange}
//                         >
//                           <option value="">Selectați raionul</option>
//                           {deliveryInfo.map((item) => (
//                             <option key={item.Id} value={item.location}>
//                               {item.location} — {item.price} MDL
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         <input
//                           type="text"
//                           name="region"
//                           className="common-input border-gray-100"
//                           placeholder="Raionul"
//                           onChange={handleInputChange}
//                           value={formData.region}
//                         />
//                       )}
//                     </div>
//                   </div>
//                   <form
//                     className="flex-align flex-wrap col-12 col-sm-6"
//                     onSubmit={(e) => e.preventDefault()}
//                   >
//                     <div className="location-box  checkout-location-box bg-white flex-align gap-8   border border-gray-100">
//                       <select
//                         name="city"
//                         onChange={handleInputChange}
//                         className="js-example-basic-single border border-gray-200 border-end-0"
//                         value={formData.city}
//                       >
//                         <option value="">Selectează un oraș</option>
//                         {locations.map((location, index) => (
//                           <option value={location.region} key={index}>
//                             {location.region}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </form>
//                   <form className="flex-align flex-wrap col-12 col-sm-6">
//                     <div className="location-box checkout-location-box bg-white flex-align gap-8 py-6 px-16  border border-gray-100">
//                       {deliveryInfo.length > 0 ? (
//                         <select
//                           name="region"
//                           className="select2-field"
//                           onChange={handleInputChange}
//                           value={formData.region}
//                         >
//                           <option value="">Selectați raionul</option>
//                           {deliveryInfo.map((item) => (
//                             <option key={item.Id} value={item.location}>
//                               {item.location} — {item.price} MDL
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         <select
//                           name="region"
//                           className="select2-field"
//                           onChange={handleInputChange}
//                           value={formData.region}
//                         >
//                           <option value="">Raionul</option>
//                         </select>
//                       )}
//                     </div>
//                   </form>
//                   {/* <div className="col-12 col-sm-6">
//                     <div className="common-input border-gray-100">
//                       <select
//                         name="city"
//                         className="select2-field"
//                         onChange={handleInputChange}
//                         value={formData.city}
//                       >
//                         <option value="">Selectează un oraș</option>
//                         {locations.map((location, index) => (
//                           <option value={location.region} key={index}>
//                             {location.region}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div> */}

//                   {/* <div className="col-12 col-sm-6">
//                     <div className="common-input border-gray-100">
//                       {deliveryInfo.length > 0 ? (
//                         <select
//                           name="region"
//                           className="select2-field"
//                           onChange={handleInputChange}
//                           value={formData.region}
//                         >
//                           <option value="">Selectați raionul</option>
//                           {deliveryInfo.map((item) => (
//                             <option key={item.Id} value={item.location}>
//                               {item.location} — {item.price} MDL
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         <select
//                           name="region"
//                           className="select2-field"
//                           onChange={handleInputChange}
//                           value={formData.region}
//                         >
//                           <option value="">Raionul</option>
//                         </select>
//                       )}
//                     </div>
//                   </div> */}

//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="text"
//                       name="street"
//                       className="common-input border-gray-100"
//                       placeholder="Strada"
//                       onChange={handleInputChange}
//                       value={formData.street}
//                     />
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="text"
//                       name="houseNumber"
//                       className="common-input border-gray-100"
//                       placeholder="Nr. casa"
//                       onChange={handleInputChange}
//                       value={formData.houseNumber}
//                     />
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="text"
//                       name="apartment"
//                       className="common-input border-gray-100"
//                       placeholder="Apartament"
//                       onChange={handleInputChange}
//                       value={formData.apartment}
//                     />
//                   </div>
//                   <div className="col-12">
//                     <textarea
//                       name="notes"
//                       className="common-input border-gray-100"
//                       placeholder="Note comenzii (optional)"
//                       onChange={handleInputChange}
//                       value={formData.notes}
//                     />
//                   </div>
//                 </div>
//               </form>
//             </div>

//             <div className="col-xl-3 col-lg-4">
//               <div className="checkout-sidebar">
//                 <div className="bg-color-three rounded-8 p-24 text-center">
//                   <span className="text-gray-900 text-xl fw-semibold">
//                     Comenzile dumneavoastră
//                   </span>
//                 </div>
//                 <div className="border border-gray-100 rounded-8 px-24 py-40 mt-24">
//                   <div className="mb-32 pb-32 border-bottom border-gray-100 flex-between gap-8">
//                     <span className="text-gray-900 fw-medium text-xl font-heading-two">
//                       Produse
//                     </span>
//                     <span className="text-gray-900 fw-medium text-xl font-heading-two">
//                       Subtotal
//                     </span>
//                   </div>
//                   {cartItems.map((item, index) => {
//                     const price = Number(
//                       item.product_new_price || item.product_price || 0
//                     );
//                     return (
//                       <div
//                         className="flex-between gap-24 mb-32"
//                         key={`${item.product_name}-${index}`}
//                       >
//                         <div className="flex-align gap-12">
//                           <span className="text-gray-900 fw-normal text-md font-heading-two w-144">
//                             {item.product_name}
//                           </span>
//                           <span className="text-gray-900 fw-normal text-md font-heading-two">
//                             <i className="ph-bold ph-x" />
//                           </span>
//                           <span className="text-gray-900 fw-semibold text-md font-heading-two">
//                             {item.quantity}
//                           </span>
//                         </div>
//                         <span className="text-gray-900 fw-bold text-md font-heading-two">
//                           {(price * item.quantity).toFixed(2)} MDL
//                         </span>
//                       </div>
//                     );
//                   })}

//                   <div className="mb-16 flex-between gap-8">
//                     <span className="text-gray-900 fw-medium text-md font-heading-two">
//                       Livrare
//                     </span>
//                     <span className="text-gray-900 fw-bold text-md font-heading-two">
//                       {deliveryPrice.toFixed(2)} MDL
//                     </span>
//                   </div>

//                   <div className="border-top border-gray-100 pt-30 mt-30">
//                     <div className="mb-32 flex-between gap-8">
//                       <span className="text-gray-900 font-heading-two text-xl fw-semibold">
//                         Total
//                       </span>
//                       <span className="text-gray-900 font-heading-two text-md fw-bold">
//                         {totalWithDelivery} MDL
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-32 pt-32 border-top border-gray-100">
//                   <p className="text-gray-500">
//                     Datele dumneavoastră personale vor fi utilizate pentru a
//                     procesa comanda dumneavoastră...
//                   </p>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={placeOrder}
//                   className="btn btn-main mt-40 py-18 w-100 rounded-8 mt-56"
//                 >
//                   Plasați comanda
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Checkout;

// import React, { useState, useEffect } from "react";
// import { useCart } from "../CartContext";
// import query from "jquery";

// const Checkout = () => {
//   const [selectedPayment, setSelectedPayment] = useState("payment1");
//   const { cartItems, clearCart } = useCart();
//   const [locations, setLocations] = useState([]);
//   const [deliveryInfo, setDeliveryInfo] = useState([]);
//   const [deliveryPrice, setDeliveryPrice] = useState(0);
//   const [selectedLocation, setSelectedLocation] = useState("1");

//   useEffect(() => {
//     fetch(`${process.env.REACT_APP_BASE_URL}/api/locations`)
//       .then((res) => res.json())
//       .then((data) => setLocations(data))
//       .catch((err) => console.error("Ошибка загрузки", err));
//   }, []);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     city: "",
//     region: "",
//     street: "",
//     houseNumber: "",
//     apartment: "",
//     notes: "",
//   });

//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [modalType, setModalType] = useState("");

//   const handleInputChange = (e) => {
//     if (!e || !e.target) return; // защита от вызова без события

//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     if (name === "city") {
//       if (value) {
//         fetch(
//           `${
//             process.env.REACT_APP_BASE_URL
//           }/api/delivery?city=${encodeURIComponent(value)}`
//         )
//           .then((res) => {
//             if (!res.ok) throw new Error("Ошибка получения доставки");
//             return res.json();
//           })
//           .then((data) => {
//             setDeliveryInfo(data);
//             setFormData((prev) => ({ ...prev, region: "" }));
//             setDeliveryPrice(0);
//           })
//           .catch((err) => {
//             console.error("Ошибка загрузки данных доставки:", err);
//             setDeliveryInfo([]);
//             setFormData((prev) => ({ ...prev, region: "" }));
//             setDeliveryPrice(0);
//           });
//       } else {
//         setDeliveryInfo([]);
//         setFormData((prev) => ({ ...prev, region: "" }));
//         setDeliveryPrice(0);
//       }
//     }
//     if (name === "region") {
//       // найти объект доставки по выбранному location (value)
//       const selected = deliveryInfo.find((item) => item.location === value);
//       if (selected) {
//         setDeliveryPrice(selected.price);
//       } else {
//         setDeliveryPrice(0);
//       }
//     }
//   };
//   useEffect(() => {
//     if (locations.length === 0) return;

//     const selectElement = query(".js-example-basic-single");

//     selectElement.select2();

//     const selectElementDistict = query(".js-example-basic-single2");

//     selectElementDistict.select2();
//     selectElementDistict.val(formData.region).trigger("change");

//     // Установка из formData, если значение уже есть
//     selectElement.val(formData.city).trigger("change");

//     selectElement.on("change", (e) => {
//       const value = e.target.value;

//       // Устанавливаем выбранный город
//       setFormData((prev) => ({
//         ...prev,
//         city: value,
//         region: "", // сбрасываем регион
//       }));

//       // Загружаем информацию о доставке для выбранного города
//       fetch(
//         `${
//           process.env.REACT_APP_BASE_URL
//         }/api/delivery?city=${encodeURIComponent(value)}`
//       )
//         .then((res) => {
//           if (!res.ok) throw new Error("Ошибка получения доставки");
//           return res.json();
//         })
//         .then((data) => {
//           setDeliveryInfo(data);
//           setDeliveryPrice(0);
//         })
//         .catch((err) => {
//           console.error("Ошибка загрузки доставки:", err);
//           setDeliveryInfo([]);
//           setDeliveryPrice(0);
//         });
//     });

//     return () => {
//       if (selectElement.data("select2")) {
//         selectElement.select2("destroy");
//       }
//     };
//   }, [locations]);

//   const calculateProductsTotal = () => {
//     return cartItems.reduce((total, item) => {
//       const price = Number(item.product_new_price || item.product_price || 0);
//       return total + price * item.quantity;
//     }, 0);
//   };

//   const productsTotal = calculateProductsTotal();
//   const totalWithDelivery = (productsTotal + deliveryPrice).toFixed(2);

//   const validateForm = () => {
//     if (!formData.firstName.trim()) {
//       setModalMessage("Completați câmpul Numele");
//       setModalType("error");
//       setModalOpen(true);
//       return false;
//     }
//     const phoneDigits = formData.phone.replace(/\D/g, "");
//     if (phoneDigits.length < 6) {
//       setModalMessage("Introduceți un număr de telefon valid (minim 6 cifre)");
//       setModalType("error");
//       setModalOpen(true);
//       return false;
//     }
//     if (!formData.city.trim()) {
//       setModalMessage("Completați câmpul Oraș");
//       setModalType("error");
//       setModalOpen(true);
//       return false;
//     }
//     if (!formData.region.trim()) {
//       setModalMessage("Selectați un raion");
//       setModalType("error");
//       setModalOpen(true);
//       return false;
//     }
//     if (cartItems.length === 0) {
//       setModalMessage("Coșul este gol");
//       setModalType("error");
//       setModalOpen(true);
//       return false;
//     }
//     return true;
//   };

//   const placeOrder = async () => {
//     if (!validateForm()) return;

//     const orderData = {
//       first_name: formData.firstName,
//       last_name: formData.lastName,
//       phone: formData.phone,
//       email: formData.email,
//       city: formData.city,
//       district: formData.region,
//       street: formData.street,
//       house_number: formData.houseNumber,
//       apartment: formData.apartment,
//       notes: formData.notes,
//       payment_method: selectedPayment,
//       total_price: totalWithDelivery,
//       items: cartItems.map((item) => ({
//         product_id: item.product_id,
//         product_name: item.product_name,
//         quantity: item.quantity,
//         price: Number(item.product_new_price || item.product_price || 0),
//       })),
//       delivery_price: deliveryPrice,
//     };

//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_BASE_URL}/api/orders`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(orderData),
//         }
//       );

//       if (!response.ok) throw new Error("Eroare la trimiterea comenzii");

//       const data = await response.json();

//       setModalMessage(
//         "Comandă creată cu succes! Număr comandă: " + data.orderId
//       );
//       setModalType("success");
//       setModalOpen(true);

//       clearCart();
//       setFormData({
//         firstName: "",
//         lastName: "",
//         phone: "",
//         email: "",
//         city: "",
//         region: "",
//         street: "",
//         houseNumber: "",
//         apartment: "",
//         notes: "",
//       });
//       setDeliveryInfo([]);
//       setDeliveryPrice(0);
//     } catch (error) {
//       setModalMessage("Eroare: " + error.message);
//       setModalType("error");
//       setModalOpen(true);
//     }
//   };

//   const ModalComponent = ({ message, type, onClose }) => (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         backgroundColor: "rgba(0,0,0,0.5)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         zIndex: 9999,
//       }}
//       onClick={onClose}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           backgroundColor: "#fff",
//           padding: 20,
//           borderRadius: 8,
//           minWidth: 300,
//           textAlign: "center",
//           boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
//         }}
//       >
//         <h2 style={{ color: type === "success" ? "green" : "red" }}>
//           {type === "success" ? "Succes" : "Eroare"}
//         </h2>
//         <p>{message}</p>
//         <button
//           onClick={onClose}
//           style={{
//             marginTop: 15,
//             padding: "8px 20px",
//             cursor: "pointer",
//             borderRadius: 4,
//             border: "none",
//             backgroundColor: type === "success" ? "green" : "red",
//             color: "#fff",
//           }}
//         >
//           Închide
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {modalOpen && (
//         <ModalComponent
//           message={modalMessage}
//           type={modalType}
//           onClose={() => setModalOpen(false)}
//         />
//       )}
//       <section className="checkout py-80">
//         <div className="container container-lg">
//           <div className="row">
//             <div className="col-xl-9 col-lg-8">
//               <form action="#" className="pe-xl-5">
//                 <div className="row gy-3">
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="text"
//                       name="firstName"
//                       className="form-control"
//                       placeholder="Nume"
//                       value={formData.firstName}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="text"
//                       name="lastName"
//                       className="form-control"
//                       placeholder="Prenume"
//                       value={formData.lastName}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="tel"
//                       name="phone"
//                       className="form-control"
//                       placeholder="Telefon"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="email"
//                       name="email"
//                       className="form-control"
//                       placeholder="Email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   {/* ГОРОД */}
//                   <div className="flex-align flex-wrap col-12 col-sm-6">
//                     <div className="location-box checkout-location-box bg-white flex-align gap-8 py-6 px-16 border border-gray-100">
//                       <select
//                         name="city"
//                         className="form-control js-example-basic-single"
//                         defaultValue={formData.city}
//                       >
//                         <option value="">Selectează un oraș</option>
//                         {locations.map((location, index) => (
//                           <option value={location.region} key={index}>
//                             {location.region}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   {/* РЕГИОН */}
//                   <div className="flex-align flex-wrap col-12 col-sm-6">
//                     <div className="location-box checkout-location-box bg-white flex-align gap-8 py-6 px-16 border border-gray-100">
//                       <select
//                         name="region"
//                         className="form-control js-example-basic-single2"
//                         value={formData.region}
//                         onChange={handleInputChange}
//                       >
//                         <option value="">Selectează un raion</option>
//                         {deliveryInfo.map((regionItem, index) => (
//                           <option key={index} value={regionItem.location}>
//                             {regionItem.location} ({regionItem.price} MDL)
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   {/* <div className="flex-align flex-wrap col-12 col-sm-6">
//                     <div className="location-box checkout-location-box bg-white flex-align gap-8 py-6 px-16  border border-gray-100">
//                       <select
//                         name="city"
//                         className="form-control js-example-basic-single"
//                         value={formData.city}
//                         onChange={handleInputChange}
//                       >
//                         <option value="">Selectează un oraș</option>
//                         {locations.map((location, index) => (
//                           <option value={location.region} key={index}>
//                             {location.region}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                   <div className="flex-align flex-wrap col-12 col-sm-6">
//                     <div className="location-box checkout-location-box bg-white flex-align gap-8 py-6 px-16 border border-gray-100">
//                       {deliveryInfo.length > 0 ? (
//                         <select
//                           name="region"
//                           className="form-control js-example-basic-single"
//                           onChange={handleInputChange}
//                           value={formData.region}
//                         >
//                           <option value="">Selectați raionul</option>
//                           {deliveryInfo.map((item) => (
//                             <option key={item.Id} value={item.location}>
//                               {item.location} — {item.price} MDL
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         <select
//                           name="region"
//                           className="form-control js-example-basic-single"
//                           onChange={handleInputChange}
//                           value={formData.region}
//                         >
//                           <option value="">Selectați raionul</option>
//                         </select>
//                       )}
//                     </div>
//                   </div> */}
//                   {/* <div className="flex-align flex-wrap col-12 col-sm-6">
//                     <div className="location-box checkout-location-box bg-white flex-align gap-8 py-6 px-16  border border-gray-100">
//                       {deliveryInfo.length > 0 ? (
//                         <select
//                           name="region"
//                           className="form-control js-example-basic-single"
//                           onChange={handleInputChange}
//                           value={formData.region}
//                         >
//                           <option value="">Selectați raionul</option>
//                           {deliveryInfo.map((item) => (
//                             <option key={item.Id} value={item.location}>
//                               {item.location} — {item.price} MDL
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         <select
//                           name="region"
//                           className="form-control js-example-basic-single"
//                           onChange={handleInputChange}
//                           value={formData.region}
//                         >
//                           <option value="">Selectați raionul</option>
//                         </select>
//                       )}
//                     </div>
//                   </div> */}

//                   <div className="col-12 col-sm-6">
//                     <input
//                       type="text"
//                       name="street"
//                       className="form-control"
//                       placeholder="Strada"
//                       value={formData.street}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="col-12 col-sm-3">
//                     <input
//                       type="text"
//                       name="houseNumber"
//                       className="form-control"
//                       placeholder="Nr. casă"
//                       value={formData.houseNumber}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="col-12 col-sm-3">
//                     <input
//                       type="text"
//                       name="apartment"
//                       className="form-control"
//                       placeholder="Apartament"
//                       value={formData.apartment}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="col-12">
//                     <textarea
//                       name="notes"
//                       className="form-control"
//                       placeholder="Notițe"
//                       value={formData.notes}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>
//               </form>
//             </div>
//             <div className="col-xl-3 col-lg-4">
//               <div className="checkout-sidebar">
//                 <div className="bg-color-three rounded-8 p-24 text-center">
//                   <span className="text-gray-900 text-xl fw-semibold">
//                     Comenzile dumneavoastră
//                   </span>
//                 </div>
//                 <div className="border border-gray-100 rounded-8 px-24 py-40 mt-24">
//                   <div className="mb-32 pb-32 border-bottom border-gray-100 flex-between gap-8">
//                     <span className="text-gray-900 fw-medium text-xl font-heading-two">
//                       Produse
//                     </span>
//                     <span className="text-gray-900 fw-medium text-xl font-heading-two">
//                       Subtotal
//                     </span>
//                   </div>
//                   {cartItems.map((item, index) => {
//                     const price = Number(
//                       item.product_new_price || item.product_price || 0
//                     );
//                     return (
//                       <div
//                         className="flex-between gap-24 mb-32"
//                         key={`${item.product_name}-${index}`}
//                       >
//                         <div className="flex-align gap-12">
//                           <span className="text-gray-900 fw-normal text-md font-heading-two w-144">
//                             {item.product_name}
//                           </span>
//                           <span className="text-gray-900 fw-normal text-md font-heading-two">
//                             <i className="ph-bold ph-x" />
//                           </span>
//                           <span className="text-gray-900 fw-semibold text-md font-heading-two">
//                             {item.quantity}
//                           </span>
//                         </div>
//                         <span className="text-gray-900 fw-bold text-md font-heading-two">
//                           {(price * item.quantity).toFixed(2)} MDL
//                         </span>
//                       </div>
//                     );
//                   })}

//                   <div className="mb-16 flex-between gap-8">
//                     <span className="text-gray-900 fw-medium text-md font-heading-two">
//                       Livrare
//                     </span>
//                     <span className="text-gray-900 fw-bold text-md font-heading-two">
//                       {deliveryPrice.toFixed(2)} MDL
//                     </span>
//                   </div>

//                   <div className="border-top border-gray-100 pt-30 mt-30">
//                     <div className="mb-32 flex-between gap-8">
//                       <span className="text-gray-900 font-heading-two text-xl fw-semibold">
//                         Total
//                       </span>
//                       <span className="text-gray-900 font-heading-two text-md fw-bold">
//                         {totalWithDelivery} MDL
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-32 pt-32 border-top border-gray-100">
//                   <p className="text-gray-500">
//                     Datele dumneavoastră personale vor fi utilizate pentru a
//                     procesa comanda dumneavoastră...
//                   </p>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={placeOrder}
//                   className="btn btn-main mt-40 py-18 w-100 rounded-8 mt-56"
//                 >
//                   Plasați comanda
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Checkout;

import React, { useState, useEffect } from "react";
import { useCart } from "../CartContext";
import query from "jquery";

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState("payment1");
  const { cartItems, clearCart } = useCart();
  const [locations, setLocations] = useState([]);
  const [deliveryInfo, setDeliveryInfo] = useState([]);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState("1");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/locations`)
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch((err) => console.error("Ошибка загрузки", err));
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    region: "",
    street: "",
    houseNumber: "",
    apartment: "",
    notes: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");

  const handleInputChange = (e) => {
    if (!e || !e.target) return;

    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "city") {
      if (value) {
        fetch(
          `${
            process.env.REACT_APP_BASE_URL
          }/api/delivery?city=${encodeURIComponent(value)}`
        )
          .then((res) => {
            if (!res.ok) throw new Error("Ошибка получения доставки");
            return res.json();
          })
          .then((data) => {
            setDeliveryInfo(data);
            setFormData((prev) => ({ ...prev, region: "" }));
            setDeliveryPrice(0);
          })
          .catch((err) => {
            console.error("Ошибка загрузки данных доставки:", err);
            setDeliveryInfo([]);
            setFormData((prev) => ({ ...prev, region: "" }));
            setDeliveryPrice(0);
          });
      } else {
        setDeliveryInfo([]);
        setFormData((prev) => ({ ...prev, region: "" }));
        setDeliveryPrice(0);
      }
    }
    if (name === "region") {
      console.log("object");
      const selected = deliveryInfo.find((item) => item.location === value);
      console.log(1414, selected);
      setDeliveryPrice(selected ? selected.price : 0);
    }
  };

  useEffect(() => {
    if (locations.length === 0) return;

    const selectElement = query(".js-example-basic-single");
    selectElement.select2();

    const selectElementDistict = query(".js-example-basic-single2");
    selectElementDistict.select2();
    selectElementDistict.val(formData.region).trigger("change");

    selectElement.val(formData.city).trigger("change");

    selectElement.on("change", (e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        city: value,
        region: "",
      }));

      fetch(
        `${
          process.env.REACT_APP_BASE_URL
        }/api/delivery?city=${encodeURIComponent(value)}`
      )
        .then((res) => {
          if (!res.ok) throw new Error("Ошибка получения доставки");
          return res.json();
        })
        .then((data) => {
          setDeliveryInfo(data);
          setDeliveryPrice(0);
        })
        .catch((err) => {
          console.error("Ошибка загрузки доставки:", err);
          setDeliveryInfo([]);
          setDeliveryPrice(0);
        });
    });

    return () => {
      if (selectElement.data("select2")) {
        selectElement.select2("destroy");
      }
    };
  }, [locations]);

  const calculateProductsTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.product_new_price || item.product_price || 0);
      return total + price * item.quantity;
    }, 0);
  };

  const productsTotal = calculateProductsTotal();
  const totalWithDelivery = (productsTotal + deliveryPrice).toFixed(2);

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setModalMessage("Completați câmpul Numele");
      setModalType("error");
      setModalOpen(true);
      return false;
    }
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 6) {
      setModalMessage("Introduceți un număr de telefon valid (minim 6 cifre)");
      setModalType("error");
      setModalOpen(true);
      return false;
    }
    if (!formData.city.trim()) {
      setModalMessage("Completați câmpul Oraș");
      setModalType("error");
      setModalOpen(true);
      return false;
    }
    if (!formData.region.trim()) {
      setModalMessage("Selectați un raion");
      setModalType("error");
      setModalOpen(true);
      return false;
    }
    if (cartItems.length === 0) {
      setModalMessage("Coșul este gol");
      setModalType("error");
      setModalOpen(true);
      return false;
    }
    return true;
  };

  const placeOrder = async () => {
    if (!validateForm()) return;

    const orderData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      district: formData.region,
      street: formData.street,
      house_number: formData.houseNumber,
      apartment: formData.apartment,
      notes: formData.notes,
      payment_method: selectedPayment,
      total_price: totalWithDelivery,
      items: cartItems.map((item) => ({
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        price: Number(item.product_new_price || item.product_price || 0),
      })),
      delivery_price: deliveryPrice,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) throw new Error("Eroare la trimiterea comenzii");

      const data = await response.json();

      setModalMessage(
        "Comandă creată cu succes! Număr comandă: " + data.orderId
      );
      setModalType("success");
      setModalOpen(true);

      clearCart();
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        city: "",
        region: "",
        street: "",
        houseNumber: "",
        apartment: "",
        notes: "",
      });
      setDeliveryInfo([]);
      setDeliveryPrice(0);
    } catch (error) {
      setModalMessage("Eroare: " + error.message);
      setModalType("error");
      setModalOpen(true);
    }
  };

  const ModalComponent = ({ message, type, onClose }) => (
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

  return (
    <>
      {modalOpen && (
        <ModalComponent
          message={modalMessage}
          type={modalType}
          onClose={() => setModalOpen(false)}
        />
      )}
      <section className="checkout py-80">
        <div className="container container-lg">
          <div className="row">
            <div className="col-xl-9 col-lg-8">
              <form action="#" className="pe-xl-5">
                <div className="row gy-3">
                  <div className="col-12 col-sm-6">
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder="Nume"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Prenume"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      placeholder="Telefon"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* ГОРОД */}
                  <div className="flex-align flex-wrap col-12 col-sm-6">
                    <div className="location-box checkout-location-box bg-white flex-align gap-8 py-6 px-16 border border-gray-100">
                      <select
                        name="city"
                        className="form-control js-example-basic-single"
                        defaultValue={formData.city}
                      >
                        <option value="">Selectează un oraș</option>
                        {locations.map((location, index) => (
                          <option value={location.region} key={index}>
                            {location.region}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* РЕГИОН */}
                  <div className="flex-align flex-wrap col-12 col-sm-6">
                    <div className="location-box checkout-location-box bg-white flex-align gap-8 py-6 px-16 border border-gray-100">
                      <select
                        name="region"
                        className="form-control js-example-basic-single21"
                        value={formData.region}
                        onChange={handleInputChange}
                      >
                        <option value="">Selectează un raion</option>
                        {deliveryInfo.map((regionItem, index) => (
                          <option key={index} value={regionItem.location}>
                            {regionItem.location} ({regionItem.price} MDL)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <input
                      type="text"
                      name="street"
                      className="form-control"
                      placeholder="Strada"
                      value={formData.street}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12 col-sm-3">
                    <input
                      type="text"
                      name="houseNumber"
                      className="form-control"
                      placeholder="Nr. casă"
                      value={formData.houseNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12 col-sm-3">
                    <input
                      type="text"
                      name="apartment"
                      className="form-control"
                      placeholder="Apartament"
                      value={formData.apartment}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      name="notes"
                      className="form-control"
                      placeholder="Notițe"
                      value={formData.notes}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="col-xl-3 col-lg-4">
              <div className="checkout-sidebar">
                <div className="bg-color-three rounded-8 p-24 text-center">
                  <span className="text-gray-900 text-xl fw-semibold">
                    Comenzile dumneavoastră
                  </span>
                </div>
                <div className="border border-gray-100 rounded-8 px-24 py-40 mt-24">
                  <div className="mb-32 pb-32 border-bottom border-gray-100 flex-between gap-8">
                    <span className="text-gray-900 fw-medium text-xl font-heading-two">
                      Produse
                    </span>
                    <span className="text-gray-900 fw-medium text-xl font-heading-two">
                      Subtotal
                    </span>
                  </div>
                  {cartItems.map((item, index) => {
                    const price = Number(
                      item.product_new_price || item.product_price || 0
                    );
                    return (
                      <div
                        className="flex-between gap-24 mb-32"
                        key={`${item.product_name}-${index}`}
                      >
                        <div className="flex-align gap-12">
                          <span className="text-gray-900 fw-normal text-md font-heading-two w-144">
                            {item.product_name}
                          </span>
                          <span className="text-gray-900 fw-normal text-md font-heading-two">
                            <i className="ph-bold ph-x" />
                          </span>
                          <span className="text-gray-900 fw-semibold text-md font-heading-two">
                            {item.quantity}
                          </span>
                        </div>
                        <span className="text-gray-900 fw-bold text-md font-heading-two">
                          {(price * item.quantity).toFixed(2)} MDL
                        </span>
                      </div>
                    );
                  })}

                  <div className="mb-16 flex-between gap-8">
                    <span className="text-gray-900 fw-medium text-md font-heading-two">
                      Livrare
                    </span>
                    <span className="text-gray-900 fw-bold text-md font-heading-two">
                      {deliveryPrice.toFixed(2)} MDL
                      {/* {deliveryPrice} */}
                    </span>
                  </div>

                  <div className="border-top border-gray-100 pt-30 mt-30">
                    <div className="mb-32 flex-between gap-8">
                      <span className="text-gray-900 font-heading-two text-xl fw-semibold">
                        Total
                      </span>
                      <span className="text-gray-900 font-heading-two text-md fw-bold">
                        {totalWithDelivery} MDL
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-32 pt-32 border-top border-gray-100">
                  <p className="text-gray-500">
                    Datele dumneavoastră personale vor fi utilizate pentru a
                    procesa comanda dumneavoastră...
                  </p>
                </div>

                <button
                  type="button"
                  onClick={placeOrder}
                  className="btn btn-main mt-40 py-18 w-100 rounded-8 mt-56"
                >
                  Plasați comanda
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
