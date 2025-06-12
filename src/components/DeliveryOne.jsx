import React from "react";
import { Link } from "react-router-dom";

const DeliveryOne = () => {
  return (
    <div className="delivery-section">
      <div className="container container-lg">
        <div className="delivery position-relative rounded-16 bg-main-600 p-16 flex-align gap-16 flex-wrap z-1">
          <img
            src="assets/images/bg/delivery-bg.png"
            alt=""
            className="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100"
          />
          <div className="row align-items-center">
            <div className="col-md-3 d-md-block d-none">
              {/* <div className="delivery__man text-center">
                <img
                  src="https://flowers.vetro.md/uploads/logo-flora.jpg"
                  alt=""
                />
              </div> */}
            </div>
            <div className="col-md-5 col-sm-7">
              <div className="text-center">
                <h4 className="text-white mb-8">
                  Livrăm a doua zi între orele 10:00 și 20:00
                </h4>
                <p className="text-white">
                  Pentru comenzi începând de la 500 MDL
                </p>
                <Link
                  to="/shop"
                  className="mt-16 btn btn-main-two fw-medium d-inline-flex align-items-center rounded-pill gap-8"
                  tabIndex={0}
                >
                  Cumpără acum
                  <span className="icon text-xl d-flex">
                    <i className="ph ph-arrow-right" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="col-md-4 col-sm-5 d-sm-block d-none">
              <img
                src={
                  process.env.REACT_APP_BASE_URL
                    ? `${process.env.REACT_APP_BASE_URL}/uploads/logo-flora.jpg`
                    : "https://flowers.vetro.md/uploads/logo-flora.jpg"
                }
                alt="Logo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOne;
