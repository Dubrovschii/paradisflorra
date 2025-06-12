// import React from "react";

// const BottomFooter = () => {
//   return (
//     <div className="bottom-footer bg-color-one py-8">
//       <div className="container container-lg">
//         <div className="bottom-footer__inner flex-between flex-wrap gap-16 py-16">
//           <p className="bottom-footer__text ">
//             Paradis Florra © 2024.Toate Drepturile Rezervate .Creare Site{" "}
//             <a
//               target="_blank"
//               href="https://icode.md/ro/"
//               rel="noreferrer"
//               className="text-gray-500"
//             >
//               iCode.md
//             </a>
//           </p>
//           <div className="flex-align gap-8 flex-wrap">
//             <span className="text-heading text-sm">Acceptăm</span>
//             <img
//               src="https://navomodele-apee.md/images/payment-logos.png"
//               alt=""
//             />
//             <img src="https://navomodele-apee.md/images/maib-logo.png" alt="" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BottomFooter;
import React, { useEffect, useState } from "react";

const BottomFooter = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Если нужно выполнить другие действия при загрузке — делается здесь
  }, []);

  return (
    <div className="bottom-footer bg-color-one py-8">
      <div className="container container-lg">
        <div className="bottom-footer__inner flex-between flex-wrap gap-16 py-16">
          <p className="bottom-footer__text">
            Paradis Florra © {currentYear}. Toate Drepturile Rezervate. Creare
            Site{" "}
            <a
              target="_blank"
              href="https://icode.md/ro/"
              rel="noreferrer"
              className="text-gray-500"
            >
              iCode.md
            </a>
          </p>
          <div className="flex-align gap-8 flex-wrap">
            <span className="text-heading text-sm">Acceptăm</span>
            <img
              src="https://navomodele-apee.md/images/payment-logos.png"
              alt="Metode de plată"
            />
            <img
              src="https://navomodele-apee.md/images/maib-logo.png"
              alt="Maib"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomFooter;
