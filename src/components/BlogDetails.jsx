import React from "react";
import { Link } from "react-router-dom";

const BlogDetails = () => {
  return (
    <section className="blog-details py-20">
      <div className="container container-lg">
        <div className="row gy-5">
          <div className="col-lg-12 ">
            <div className="blog-item-wrapper">
              <div className="blog-item">
                <h2 className="mb-24">Delivery</h2>
                <div className="blog-item__content mt-24">
                  <h4 className="mb-24"> Livrare gratuită</h4>
                  <p className="text-gray-700 pb-24 mb-24 border-bottom border-gray-100">
                    Costul livrării comenzii buchetelor și cadourilor este de 0
                    lei, dacă suma comenzii Dumnevoastră depășește 500 lei. În
                    cazul în care comanda Dumnevoastră nu depașește 500 lei,
                    livrarea în raza orașului Chișinău va costa 80 lei. Garantia
                    de livrare in decurs de o ora se raspandeste doar la
                    comenzile plasate in perioada orarului de lucru a salonului
                    si confirmate de operator ca pot fi livrate intr-o
                    ora(depinde daca sunt florile in stock, de complexitatea
                    realizarii compozitiei s.a.). Precizati posibilitatea
                    contactand direct operatorul. Serviciul livrare gratuită
                    este valabil doar pentru orașul Chișinău.
                  </p>
                  <h4 className="mb-24"> Metodele de livrare</h4>
                  <p className="text-gray-700 pb-24 mb-24 border-bottom border-gray-100">
                    În dependență de dorințele Dumnevoastră se efectuează:
                    Livrarea prin apelul preliminar al destinatarului. Noi
                    apelăm destinatarul înainte de livrare și specificăm ora și
                    adresa. La complectarea comenzii Dumnevoastră puteți să
                    indicați, să anunțăm sau nu destinatarul că e livrare de
                    flori. La efectuarea comenzii în zile de sărbătoare noi
                    apelăm destinatarul din timp (cu o zi sau câteva zile
                    înainte de livrare), ne-descoperind informație despre client
                    și cadou. Livrarea fără apel în perioada indicată de timp.
                    Noi nu apelăm destinatarul și păstrăm efectul surpriză în
                    timpul livrării.
                  </p>
                  <h4 className="mb-24">Condițiile livrării surpriză</h4>
                  <p className="text-gray-700 pb-24 mb-24 border-bottom border-gray-100">
                    În cazul lipsei destinatarului în timpul livrării curierul
                    v-a aștepta 15 min. Comanda se livrează destinatarului
                    personal și nu poate fi lăsată vecinilor. În cazul livrării
                    repetate poate fi nevoie de plată în avans (de la costul
                    serviciului livrării până la costul comenzii alese și
                    serviciului livrării). Livrarea la adresa de serviciu,
                    comanda poate fi lăsată la recepție sau la colegi cu
                    condiția confirmării prezenței destinatarului la locul de
                    muncă în ziua livrării. Atentie! Livrarea pe timp de noapte
                    de la 22:00 la 7 dimineata se achita separat si costa 199 de
                    lei indeferent de costul comenzii. Livrare pe timp pentru
                    cea mai apropiata noapte poate fi comandata NU mai tarziu de
                    19:00.
                  </p>
                  <h4 className="mb-24">Transmiterea comenzii</h4>
                  <p className="text-gray-700 pb-24 mb-24 border-bottom border-gray-100">
                    Livrarea la locul de muncă sau la hotel. Dacă adresa
                    livrării buchetului este hotel sau Office Center, noi putem
                    garanta livrarea doar pînă la recepție, deoarece curierului
                    poate să-i fie refuzat accesul la numărul sau oficiul
                    destinatarului. Prin urmare, pentru o livrare reușită a
                    comenzii Dumnevoastră este nevoie să indicați numărul
                    camerei, în care locuiește/lucrează destinatarul și numărul
                    lui de telefon pentru ca să-l anunțăm de livrarea cadoului.
                    Livrarea acasă. Comanda se livrează personal destinatarului
                    și în cazul lipsei acestuia nu poate fi transmisă vecinilor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
