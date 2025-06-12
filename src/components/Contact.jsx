import React from "react";

const Contact = () => {
  return (
    <section className="contact py-80">
      <div className="container container-lg">
        <div className="row gy-5">
          <div className="col-lg-12">
            <div className="contact-box border border-gray-100 rounded-16 px-24 py-40">
              <h6 className="mb-48">Contact</h6>
              <div className="flex-align gap-16 mb-16">
                <span className="w-40 h-40 flex-center rounded-circle border border-gray-100 text-main-two-600 text-2xl flex-shrink-0">
                  <i className="ph-fill ph-phone-call" />
                </span>
                <a
                  href="tel:+37379980190"
                  className="text-md text-gray-900 hover-text-main-600"
                >
                  {" "}
                  +373 799 80 190
                </a>
              </div>

              <div className="flex-align gap-16 mb-0">
                <span className="w-40 h-40 flex-center rounded-circle border border-gray-100 text-main-two-600 text-2xl flex-shrink-0">
                  <i className="ph-fill ph-map-pin" />
                </span>
                <span className="text-md text-gray-900 ">
                  Parking lot, Constantin Negruzzi Blvd, Chișinău
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
