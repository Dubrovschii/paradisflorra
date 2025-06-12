import React from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <section className="blog py-40">
      <div className="container container-lg">
        <div className="row gy-5">
          <div className="col-lg-12 pe-xl-4">
            <div className="blog-item-wrapper">
              <div className="blog-item">
                <h2 className="mb-24">Termeni și condiții</h2>
                <div className="blog-item__content mt-24">
                  <h6 className="text-2xl mb-24">Termeni generali</h6>
                  <p className="text-gray-700 mb-16">
                    Condiția obligatorie a prestării serviciilor Paradis-Florra
                    este primirea, respectarea și punerea în aplicare a
                    cerințelor părților și a anumitor prevederi ale
                    <b className="ps-5">{process.env.REACT_APP_BASE_URL}</b>
                  </p>
                  <p className="text-gray-700 mb-16">
                    Serviciile se prestează doar în limitele comenzii
                  </p>
                  <p className="text-gray-700 mb-16">
                    Serviciul "crearea și livrarea compozițiilor florale,
                    vânzarea și livrarea marfurilor similare" se efectuiază dacă
                    cumpărătorul a achitat integral serviciul în condițiile
                    plății în avans.
                  </p>
                  <p className="text-gray-700 mb-16">
                    Exemplele de lucrări de pe site sunt doar posibile spre
                    realizare. Fiecare lucrare a floristului este individuală și
                    poate să difere prin împachetare, prezentare și alte
                    criterii. La fel este posibilă înlocuirea echivalentă a
                    cantității, asortimentului și componența florilor în
                    dependență de sezon sau disponibilitatea florilor ș.a.
                    factori. Florile sunt produse de sezon, și nu în permanența
                    pot fi găsite în magazin.{" "}
                    <b className="ps-5">{process.env.REACT_APP_BASE_URL}</b> nu
                    poate garanta disponibilitatea constantă a anumitor flori în
                    magazin, mai ales în cazul în care ordinul de serviciu este
                    urgent. Performanța finală a serviciilor poate să difere de
                    ilustrația de pe site din Internet. Cu toate acestea,
                    fiecare lucrare din flori este facută din flori proapete in
                    special pentru comanda Dumnevoastră și{" "}
                    <b className="ps-5">{process.env.REACT_APP_BASE_URL}</b> își
                    depune toate eforturile pentru a asigura culoarea, forma
                    lucrării de flori cât mai mult posibil asemănătoare
                    ilustrației de pe site.
                  </p>
                  <p className="text-gray-700 mb-16">
                    Livrarea în Chișinău și suburbie se realizează în termen de
                    3-4 ore de la plasarea comenzii. În restul raioanelor
                    Moldovei, livrarea poate fi finalizată în decursul de 24 de
                    ore după plasarea comenzii și plată. Livrarea in Chisinau se
                    efectuează în intervalul specificat de Dumneavoastră, atunci
                    când efectuați comanda on-line. Pentru regiuni Dvs puteti
                    selecta intervalul de timp dorit, insa noi NU garantam
                    livrarea comenzii in acest interval. In alte localitati
                    comenzile se livreaza pe parcursul zilei.
                  </p>
                  <p className="text-gray-700 mb-16">
                    Când comandați serviciul cu livrarea la hotel, camping-uri.
                    Cumpărătorul este obligat să indice numărul apartamentului
                    și numele, sub care beneficiarul este înregistrat în hotel (
                    sau mai mulți invitați, de exemplu: un grup, domnul și
                    doamna, etc.). Comanda poate fi livrată doar la recepția
                    hotelului. În cazul în care comanda se face în hotel,
                    livrarea comenzii la recepția hotelului la data specificată
                    este luat efectiv ca livrarea comenzii, deoarece multe
                    hoteluri nu permit serviciului de livrare accesul mai
                    departe de recepție, mai departe livrarea comenzii către
                    destinatar depinde de hotel și de disponibilitatea
                    destinatarului în acest hotel. Noi nu ducem răspunderea
                    pentru întârzierea livrării comenzii sau indisponibilitatea
                    de a o livra din cauza adresei incorecte, greșite sau
                    incomplete a hotelului, la fel și plecarea înaintea
                    termenului a destinatarului din hotel, schimbarea numărului
                    din cadrul hotelului și a altor factori specifici. Comanda
                    se consideră livrată în momentul când a ajuns la recepția
                    hotelului cu indicarea numelui, prenumelui și camera
                    destinatarului, indicate de cumpărător.
                  </p>
                  <p className="text-gray-700 mb-16">
                    Precizia livrării depinde de toate datele pe care
                    Dumneavoastră le acordați despre receptorul coletului. Prin
                    urmare, vă rugăm să îndepliniți atent aceste coloane, iar
                    dacă este necesar, să indicați în comentariile comenzii
                    datele specifice legate de livrare (codul de la ușa
                    blocului, în ce compartiment lucrează, în cazul unei
                    întreprinderi mari, ș.a.m.d)
                  </p>
                  <p className="text-gray-700 mb-16">
                    Fiecare cumpărător trebuie să indice adresa exactă a
                    receptorului. În cazul în care s-a indicat greșit adresa sau
                    datele sunt incomplete pentru realizarea livrării, lipsa
                    beneficiarului la adresa indicată în terminii indicați la
                    livrare etc., Paradis-Florra depune suficient efort pentru
                    ca beneficiarul totuși să primească florile, dar
                    Paradis-Florra nu poate "vâna" beneficiarul, în lipsa
                    acestuia la adresa indicată. Datele fundamentale pentru
                    realizarea serviciului sunt: adresa beneficiarului. Livrarea
                    este considerată îndeplinită atunci când florile au fost
                    livrate la adresa indicată. Dacă beneficiarul s-a mutat, nu
                    locuieşte, nu lucrează, e în concediu, e în deplasare etc. -
                    Serviciul este considerat prestat
                  </p>
                  <p className="text-gray-700 mb-16">
                    Comanda se consideră finalizată si serviciul prestat chiar
                    dacă Destinatarul refuză să accepte livrarea sau nu o poate
                    primi, indiferent de motiv. Dacă nu reușim sa contactam
                    destinatarul folosind datele specificate, inclusiv, dar nu
                    exclusiv, dacă acesta nu răspunde la apeluri (în acest caz,
                    compania va anunța expeditorul și îi va cere să contacteze
                    el însuși destinatarul sau să furnizeze alte informații de
                    contact). În astfel de cazuri, clientul are dreptul de a
                    alege: un alt destinatar din aceeași localitate să livreze
                    comanda în aceeași zi sau cel târziu în ziua următoare, sau
                    să ridice el însuși comanda de la salon (în aceeași zi sau
                    ziua următoare).
                  </p>
                  <p className="text-gray-700 mb-16">
                    În caz de anulare a comenzii, comanda a fost plasata gresit,
                    sau din alte careva motive (este posibil numai cu prevenire
                    prealabila cu mai mult de 2 zile inainte de data stipulata
                    de livrare) noi garantă rambursarea mijloacelor plătite la
                    cerere in 3 zile bancare. Din suma ce este supusă
                    rambursării se rețin cheltuielile bancare.
                  </p>
                  <p className="text-gray-700 mb-16">
                    Dacă beneficiarul, din oarecare motiv nu este satisfăcut de
                    îndeplinirea comenzii sau calității buchetului livrat: vă
                    rugăm, luați legătura în mai puțin de 24h din momentul
                    livrării, cu asistență clienți. Florile sunt produse
                    perisabile și noi nu o să putem să vă propunem Dumneavoastră
                    înlocuirea sau returnarea plății, dacă Dumneavoastră nu o să
                    ne anunțați din timp despre această problemă. În cazul
                    neîndeplinirii la timp a comenzii plătite și împodobite din
                    vina Paradis-Florra se garantează returnarea mijloacelor,
                    integral.
                  </p>
                  <p className="text-gray-700 mb-16">
                    <b className="ps-5">{process.env.REACT_APP_BASE_URL}</b> se
                    obligă să ofere cumpărătorului servicii " confecționarea și
                    livrarea aranjamentului floral, vânzarea și livrarea
                    produsului însoțitor" în conformitate cu aceste condiții.
                  </p>
                  <p className="text-gray-700 mb-16">
                    Cumpărătorul se obligă independent și corect să
                    îndeplinească toate cîmpurile necesare cererii pentru a face
                    comanda serviciului.
                  </p>
                  <p className="text-gray-700 mb-16">
                    Cumpărătorul se obligă la pregătirea, crearea, modificarea
                    datelor pentru oferirea serviciului să urmărească toate
                    normele și cerințele legislației existente aplicabile. (
                    Exemple: să nu folosească în textul felicitării limbaj
                    licențios, să nu folosească serviciul pentru a da mită, să
                    nu folosească angajații serviciului de livrare pentru
                    pătrunderea în zone în mod deliberat restricționat și alte
                    încălcări a legii)
                  </p>
                  <p className="text-gray-700 mb-16">
                    Cumpărătorul se obligă să plătească serviciile în
                    conformitate cu aceste condiții
                  </p>
                  <p className="text-gray-700 mb-16">
                    Plata serviciilor se realizează de către cumpărător cu un
                    avans în mărime de 100%( o sută procente) din costul
                    serviciilor alese, prin orice modalitate aleasă la secția de
                    plată pe site.
                  </p>
                  <p className="text-gray-700 mb-16">
                    <b className="ps-5">{process.env.REACT_APP_BASE_URL}</b> sub
                    nici o formă nu își asumă răspunderea pentru: a) oarecare
                    acțiune/inacțiune, care acționează direct sau indirect
                    asupra rezultatului acțiunii/inacțiunii din partea unu a
                    treia parte; b) orice cheltuieli indirecte și/sau pierderea
                    din partea cumpărătorului și/sau din partea unei a treia
                    părți indiferent de, dacă putea magazinul să speculeze
                    probabilitatea a astfel de cheltuieli sau nu; c) folosirea
                    (incapacitatea folosirii) și oricare ar fi consecințele
                    folosirii (incapacitatea folosirii) cumpărătorului a
                    modalității de plată a serviciilor alese.
                  </p>
                  <p className="text-gray-700 mb-16">
                    Toată răspunderea{" "}
                    <b className="ps-5">{process.env.REACT_APP_BASE_URL}</b>{" "}
                    pentru orice plângere sau pretenție vizavi de servicii sau
                    de realizarea acestora, se limitează la suma plătită,
                    achitarea cumpărăturii în magazin.
                  </p>
                  <p className="text-gray-700 mb-16">
                    <b className="ps-5">{process.env.REACT_APP_BASE_URL}</b> nu
                    își asumă răspunderea pentru nerealizarea gratis a
                    serviciilor suplimentare cum sunt: trimiterea de SMS pentru
                    confirmarea livrării, trimiterea raportului foto a livrării
                    pe adresa electronică, livrarea felicitărilor.
                  </p>
                  <p className="text-gray-700 mb-16">
                    Fără a intra în contradicție cu cele scrise mai sus,
                    <b className="ps-5">{process.env.REACT_APP_BASE_URL}</b> se
                    eliberează de la răspunderea pentru încălcarea condițiilor a
                    serviciilor efectuate, dacă o astfel de încălcare este
                    cauzată de circumstanțe de forță majoră, incluzând:
                    acțiunile organelor de stat, incendiu, inundație, cutremur,
                    alte cataclisme naturale, pene de curent și/sau defecțiuni
                    ala rețelei de calculatoare, greve, conflicte civile,
                    dezordini, orice alte circumstanțe, fără a ne limita la cele
                    enumerate, care pot afecta efectuarea serviciilor de către
                    magazin și care nu pot fi controlate de magazin.
                  </p>
                  <p className="text-gray-700 mb-16">
                    Cumpărătorul duce toată răspunderea pentru: a) urmărirea
                    tuturor cerințelor legale, sau alte acțiuni, efectuate de ei
                    în calitate de cumpărător; b) exactitatea informațiilor,
                    indicate de ei în momentul înregistrării în calitate de
                    utilizator al serviciului, și veridicitatea garanțiilor și
                    asigurarea cumpărătorului.
                  </p>
                  <p className="text-gray-700 mb-16">
                    În cazul încălcării de către cumpărător a acestor condiții
                    <b className="ps-5">{process.env.REACT_APP_BASE_URL}</b> are
                    dreptul să sisteze efectuarea serviciilor până în momentul
                    eliminării de către cumpărător a încălcărilor efectuate și
                    plata despăgubirilor cauzate lui
                    <b className="ps-5">{process.env.REACT_APP_BASE_URL}</b> o
                    astfel de încălcare a pierderilor în întregime și/sau
                    reziliază contractul de prestare a serviciilor cu trimiterea
                    unei notificări corespunzătoare la adresa electronică a
                    cumpărătorului, indicat în momentul realizării comenzii.
                  </p>
                  <p className="text-gray-700 mb-16">
                    La momentul realizării comenzii, cumpărătorul este obligat
                    să ia la cunoștință cu toate condițiile enumerate mai sus.
                    Dacă cumpărătorul a realizat și a plătit comanda – el
                    automat își confirmă acordul cu toți termeni și condițiile
                    enumerate mai sus.
                  </p>
                  <p className="text-gray-700 mb-16">
                    Achitarea pentru produsele exclusive și la comandă nu se
                    efectuiază la livrare. Acest tip de produse pot fi comandate
                    numai prin achitarea integrală efectuată în avans.
                  </p>
                  <p className="text-gray-700 mb-16">
                    Comanda poate fi livrata cu intirziere in aceeasi zi sau mai
                    tarziu in cazul conditiilor meteo nefavorabile(ninsori,
                    inundatii samd) sau a starii drumurilor in urma acestora.
                  </p>
                  <p className="text-gray-700 mb-16">
                    Livrarea pe timp de noapte de la 22:00 la 7 dimineata se
                    achita separat si costa 199 de lei indeferent de costul
                    comenzii. Livrare pe timp pentru cea mai apropiata noapte
                    poate fi comandata NU mai tarziu de 19:00.
                  </p>
                  <p className="text-gray-700 mb-16">
                    Modalitatile de achitare: chemare curier pentru plata,
                    achitare cash in salon, achitare la livrare sunt disponibil
                    doar in timpul orarului de lucru al salonului.
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

export default Blog;
