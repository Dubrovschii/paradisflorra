// import React from "react";

// const NewsletterOne = () => {
//   return (
//     <div className="newsletter">
//       <div className="container container-lg">
//         <div className="newsletter-box position-relative rounded-16 flex-align gap-16 flex-wrap z-1">
//           <img
//             src="assets/images/bg/newsletter-bg.png"
//             alt=""
//             className="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 opacity-6"
//           />
//           <div className="row align-items-center">
//             <div className="col-xl-6">
//               <div className="">
//                 <h1 className="text-white mb-12">
//                   Nu ratați ofertele la flori
//                 </h1>
//                 <p className="text-white h5 mb-0">
//                   ÎNSCRIE-TE PENTRU NEWSLETTER-UL DE ACTUALIZARE
//                 </p>
//                 <form action="#" className="position-relative mt-40">
//                   <input
//                     type="text"
//                     className="form-control common-input rounded-pill text-white py-22 px-16 pe-144"
//                     placeholder="Numele dvs."
//                   />
//                   <input
//                     type="text"
//                     className="form-control common-input rounded-pill text-white py-22 px-16 pe-144"
//                     placeholder="Telefonul dvs."
//                   />
//                   <button
//                     type="submit"
//                     className="btn btn-main-two rounded-pill position-absolute bottom-50 translate-middle-y inset-inline-end-0 me-10"
//                   >
//                     Abonează-te
//                   </button>
//                 </form>
//               </div>
//             </div>
//             <div className="col-xl-6 text-center d-xl-block d-none">
//               <img
//                 src="https://flowers.vetro.md/uploads/category/8/1747761827750-пионы.webp"
//                 alt=""
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewsletterOne;

import React, { useState } from "react";
import axios from "axios";

const NewsletterOne = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [modal, setModal] = useState({ show: false, message: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      return setModal({
        show: true,
        message: "Completați toate câmpurile!",
        type: "error",
      });
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/newsletter`,
        { name, phone }
      );
      setModal({ show: true, message: res.data.message, type: "success" });
      setName("");
      setPhone("");
    } catch (err) {
      setModal({
        show: true,
        message: err.response?.data?.message || "Eroare necunoscută",
        type: "error",
      });
    }
  };

  // Вложенный компонент модалки
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
    <div className="newsletter">
      <div className="container container-lg">
        <div className="newsletter-box position-relative rounded-16 flex-align gap-16 flex-wrap z-1">
          <img
            src="assets/images/bg/newsletter-bg.png"
            alt=""
            className="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 opacity-6"
          />
          <div className="row align-items-center">
            <div className="col-xl-6">
              <h1 className="text-white mb-12">Nu ratați ofertele la flori</h1>
              <p className="text-white h5 mb-0">
                Ne puteți contacta pentru mai multe informații.
              </p>
              <form onSubmit={handleSubmit} className="position-relative mt-40">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control common-input rounded-pill text-white py-22 px-16 pe-144 mb-12"
                  placeholder="Numele dvs."
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control common-input rounded-pill text-white py-22 px-16 pe-144 mb-12"
                  placeholder="Telefonul dvs."
                />
                <button
                  type="submit"
                  className="btn btn-main rounded-pill inset-inline-end-0 me-10"
                >
                  Contactaţi-ne
                </button>
              </form>
            </div>
            <div className="col-xl-6 text-center d-xl-block d-none">
              <img
                src="https://flowers.vetro.md/uploads/promoslider/12/1748445129119-buchet-baner.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      {modal.show && (
        <ModalComponent
          message={modal.message}
          type={modal.type}
          onClose={() => setModal({ ...modal, show: false })}
        />
      )}
    </div>
  );
};

export default NewsletterOne;
