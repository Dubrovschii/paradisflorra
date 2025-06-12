import React from "react";

const ShippingOne = () => {
  return (
    <section className="shipping mb-24" id="shipping">
      <div className="container container-lg">
        <div className="row gy-4">
          <div className="col-xxl-3 col-sm-6">
            <div className="shipping-item flex-align gap-16 rounded-16 bg-main-50 hover-bg-main-100 transition-2">
              <span className="w-56 h-56 flex-center rounded-circle bg-main-600 text-white text-32 flex-shrink-0">
                <i className="ph-fill ph-car-profile" />
              </span>
              <div className="">
                <h6 className="mb-0">Livrare rapidă și gratuită</h6>
                <span className="text-sm text-heading">
                  În toată zona Chișinău, în maxim 2 ore!
                </span>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-sm-6">
            <div className="shipping-item flex-align gap-16 rounded-16 bg-main-50 hover-bg-main-100 transition-2">
              <span className="w-56 h-56 flex-center rounded-circle bg-main-600 text-white text-32 flex-shrink-0">
                <i className="ph-fill ph-hand-heart" />
              </span>
              <div className="">
                <h6 className="mb-0">Buchete 100% pe gustul tău</h6>
                <span className="text-sm text-heading">
                  Florile sunt mereu proaspete și aranjate cu grijă.
                </span>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-sm-6">
            <div className="shipping-item flex-align gap-16 rounded-16 bg-main-50 hover-bg-main-100 transition-2">
              <span className="w-56 h-56 flex-center rounded-circle bg-main-600 text-white text-32 flex-shrink-0">
                <i className="ph-fill ph-credit-card" />
              </span>
              <div className="">
                <h6 className="mb-0">Plăți sigure și rapide</h6>
                <span className="text-sm text-heading">
                  Online sau la livrare, cum îți este mai comod.
                </span>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-sm-6">
            <div className="shipping-item flex-align gap-16 rounded-16 bg-main-50 hover-bg-main-100 transition-2">
              <span className="w-56 h-56 flex-center rounded-circle bg-main-600 text-white text-32 flex-shrink-0">
                <i className="ph-fill ph-chats" />
              </span>
              <div className="">
                <h6 className="mb-0">Suport 24/7</h6>
                <span className="text-sm text-heading">
                  Comandă sau cere o recomandare la orice oră.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingOne;
