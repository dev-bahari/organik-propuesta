/* Vivero Organik v2 — shared data, shell (header/footer/cart) and product card. */
(function(){
const IMG="../img/", LOGO="../logo-organik.webp";
const FREE_SHIP=150000; // example threshold — set the real one in Shopify
const WA="573027138703";

/* Categories (sidebar facets). Example catalog: names, prices and stock are placeholders. */
const CATS=[
  {id:"interior",n:"Plantas de interior",group:"plantas"},
  {id:"exterior",n:"Plantas de exterior",group:"plantas"},
  {id:"suculentas",n:"Suculentas y cactus",group:"plantas"},
  {id:"flor",n:"Plantas de flor",group:"plantas"},
  {id:"macetas",n:"Macetas",group:"macetas"},
  {id:"abono",n:"Abono y fertilizantes",group:"abono"},
  {id:"tierra",n:"Tierra y sustratos",group:"abono"},
  {id:"combos",n:"Combos y regalos",group:"plantas"}
];
const LUZ={sombra:"Sombra e interior",sol:"Sol directo",brisa:"Brisa y salitre"};
const P=[
  {id:"monstera",n:"Monstera deliciosa",c:"interior",p:89000,a:"monstera",b:"monstera2",t:["sombra"],care:["Luz indirecta","Riego semanal"],size:"60–70 cm",water:"Cada 7 días",best:9,d:"La planta de hojas perforadas que transforma cualquier sala. Crece rápido en interiores con luz indirecta."},
  {id:"calathea",n:"Calathea medallón",c:"interior",p:65000,w:78000,a:"calathea",b:"calathea2",t:["sombra"],care:["Sombra","Humedad alta"],size:"40 cm",water:"Cada 4 días",best:7,d:"Hojas pintadas que se cierran de noche. Ideal para baños y habitaciones con humedad."},
  {id:"lirio",n:"Lirio de paz",c:"interior",p:48000,a:"lirio",b:"lirio",t:["sombra"],care:["Sombra","Purifica el aire"],size:"45 cm",water:"Cada 5 días",best:8,d:"Florece en blanco aun con poca luz y avisa cuando tiene sed: sus hojas bajan."},
  {id:"zz",n:"Zamioculca ZZ",c:"interior",p:72000,a:"zz",b:"zz",t:["sombra","brisa"],care:["Poca luz","Riego cada 15 días"],size:"55 cm",water:"Cada 15 días",best:10,d:"La planta más difícil de matar. Aguanta oficinas con aire acondicionado y olvidos de riego."},
  {id:"pothos",n:"Pothos colgante",c:"interior",p:39000,a:"pothos",b:"pothos",t:["sombra"],care:["Colgante","Fácil"],size:"Guías de 80 cm",water:"Cada 6 días",best:6,d:"Cae en cascada desde repisas y materas colgantes. Se reproduce fácil en agua."},
  {id:"cinta",n:"Cinta o mala madre",c:"interior",p:25000,a:"cinta",b:"cinta",t:["sombra","brisa"],care:["Fácil","Crece rápido"],size:"30 cm",water:"Cada 5 días",best:5,d:"Resistente y generosa: saca hijuelos que puedes sembrar para regalar."},
  {id:"lira",n:"Ficus lira",c:"interior",p:120000,a:"ficuslira",b:"ficuslira",t:["sombra"],care:["Luz brillante","Riego semanal"],size:"1,2 m",water:"Cada 7 días",best:4,d:"Hojas grandes en forma de violín. Necesita un rincón luminoso y no le gusta que la muevan."},
  {id:"helecho",n:"Helecho boston",c:"interior",p:35000,a:"helecho",b:"helecho",t:["sombra"],out:true,care:["Sombra","Humedad alta"],size:"40 cm",water:"Cada 3 días",best:3,d:"Frondoso y fresco para balcones con sombra. Pide humedad constante."},
  {id:"monstera-madera",n:"Monstera en matera con base",c:"interior",p:135000,a:"monsteraint",b:"monstera",t:["sombra"],care:["Luz indirecta","Lista para regalar"],size:"70 cm",water:"Cada 7 días",best:2,d:"Monstera mediana en matera blanca con base de madera, lista para decorar."},
  {id:"calathea-xl",n:"Calathea grande",c:"interior",p:98000,a:"calathea2",b:"calathea",t:["sombra"],care:["Sombra","Humedad alta"],size:"70 cm",water:"Cada 4 días",best:1,d:"Ejemplar grande para llenar esquinas de sala u oficina."},
  {id:"topiario",n:"Árbol topiario",c:"exterior",p:140000,a:"topiario",b:"topiario",t:["sol","brisa"],care:["Sol pleno","Riego 2 veces por semana"],size:"1 m",water:"2 veces por semana",best:5,d:"Arbusto podado en forma de bola para entradas y terrazas con sol."},
  {id:"ficus",n:"Ficus elástica",c:"exterior",p:58000,a:"ficus",b:"ficus",t:["sol","brisa","sombra"],care:["Resistente","Riego semanal"],size:"50 cm",water:"Cada 7 días",best:6,d:"Hojas gruesas y brillantes. Va bien dentro o fuera y soporta la brisa."},
  {id:"bonsai",n:"Bonsái ficus",c:"exterior",p:95000,a:"bonsai",b:"bonsai",t:["sol"],care:["Sol de mañana","Poda mensual"],size:"30 cm",water:"Cada 3 días",best:4,d:"Bonsái de ficus para escritorio o terraza. Incluye bandeja."},
  {id:"cactus",n:"Cactus de bola",c:"suculentas",p:22000,a:"cactus",b:"cactusrow",t:["sol","brisa"],care:["Sol pleno","Riego mínimo"],size:"15 cm",water:"Cada 15 días",best:8,d:"Pequeño, redondo y casi sin cuidados. Perfecto para ventanas con sol."},
  {id:"haworthia",n:"Haworthia",c:"suculentas",p:18000,a:"haworthia",b:"haworthia2",t:["sol","brisa"],care:["Sol suave","Riego mínimo"],size:"12 cm",water:"Cada 12 días",best:7,d:"Suculenta de rayas blancas que tolera el salitre de la costa."},
  {id:"haworthia-turquesa",n:"Haworthia en matera turquesa",c:"suculentas",p:28000,a:"haworthia2",b:"haworthia",t:["sol","brisa"],care:["Sol suave","Ideal para regalar"],size:"14 cm",water:"Cada 12 días",best:3,d:"Haworthia en matera de cerámica turquesa, lista para regalar."},
  {id:"cactus-columnar",n:"Cactus columnar",c:"suculentas",p:85000,w:99000,a:"cactusint",b:"cactusint",t:["sol","brisa"],care:["Sol pleno","Riego mínimo"],size:"90 cm",water:"Cada 20 días",best:5,d:"Cactus alto y escultural para salas luminosas y patios."},
  {id:"jardin-cactus",n:"Jardín de cactus",c:"suculentas",p:65000,a:"cactusrow",b:"cactus",t:["sol","brisa"],care:["Sol pleno","Bajo mantenimiento"],size:"Bandeja 40 cm",water:"Cada 15 días",best:2,d:"Composición de varios cactus en bandeja para mesa de centro o terraza."},
  {id:"anturio",n:"Anturio rojo",c:"flor",p:55000,a:"anturio",b:"anturio",t:["sombra","sol"],care:["Luz indirecta","Flor todo el año"],size:"45 cm",water:"Cada 5 días",best:9,d:"Flores rojas brillantes casi todo el año. Uno de los favoritos para regalar."},
  {id:"margarita",n:"Margarita amarilla",c:"flor",p:22000,a:"flores",b:"flores",t:["sol"],out:true,care:["Sol pleno","Riego frecuente"],size:"25 cm",water:"Cada 2 días",best:2,d:"Flor de temporada para jardineras y antejardines con sol."},
  {id:"set-macetas",n:"Set de macetas de cerámica",c:"macetas",p:60000,a:"macetas",b:"macetas",t:[],care:["3 tamaños","Con drenaje"],size:"12, 16 y 20 cm",water:"—",best:8,d:"Tres macetas de cerámica en tonos neutros con orificio de drenaje."},
  {id:"maceta-base",n:"Maceta con base de madera",c:"macetas",p:49000,a:"monsteraint",b:"monsteraint",t:[],care:["Base incluida","Interior"],size:"25 cm",water:"—",best:6,d:"Maceta blanca sobre base de madera que eleva tu planta del piso."},
  {id:"repisa",n:"Repisa con 4 macetas",c:"macetas",p:160000,a:"estante",b:"estante",t:[],care:["Incluye 4 macetas","Para pared"],size:"80 cm de ancho",water:"—",best:3,d:"Repisa de pared con cuatro macetas para armar tu rincón verde."},
  {id:"colgante",n:"Maceta colgante",c:"macetas",p:32000,a:"pothos",b:"pothos",t:[],care:["Con cuerda","Interior y exterior"],size:"18 cm",water:"—",best:4,d:"Maceta con soporte colgante para pothos, helechos y cintas."},
  {id:"abono",n:"Abono orgánico + vitamina foliar",c:"abono",p:23000,w:46000,a:"siembra",b:"siembra",t:[],care:["1 kg","Orgánico"],size:"1 kg + 250 ml",water:"—",best:10,d:"Abono orgánico para todo tipo de plantas más vitamina foliar en atomizador."},
  {id:"humus",n:"Humus de lombriz",c:"abono",p:18000,a:"semillero",b:"semillero",t:[],care:["2 kg","Orgánico"],size:"2 kg",water:"—",best:6,d:"Mejora la tierra de tus materas y ayuda a que las raíces crezcan sanas."},
  {id:"kit",n:"Kit de siembra",c:"abono",p:35000,a:"semillero",b:"siembra",t:[],care:["Semillas + sustrato","Para niños"],size:"Bandeja de 12",water:"—",best:5,d:"Bandeja, sustrato y semillas para empezar tu propia huerta."},
  {id:"tierra",n:"Tierra negra · bulto",c:"tierra",p:15000,a:"tierra",b:"tierra",t:[],care:["Bulto de 25 kg","Abonada"],size:"25 kg",water:"—",best:9,d:"Tierra negra abonada lista para materas y jardines."},
  {id:"volqueta",n:"Tierra negra · volqueta 8 m³",c:"tierra",p:650000,a:"tierra",b:"siembra",t:[],care:["8 m³","Incluye descargue"],size:"8 m³",water:"—",best:4,d:"Para obras, jardines grandes y rellenos. Coordinamos la fecha de descargue."},
  {id:"sustrato-suculentas",n:"Sustrato para suculentas",c:"tierra",p:16000,a:"suculentas",b:"tierra",t:[],care:["5 kg","Drenaje rápido"],size:"5 kg",water:"—",best:3,d:"Mezcla con arena y cascarilla para que cactus y suculentas no se pudran."},
  {id:"suculentas",n:"Combo suculentas x6",c:"combos",p:45000,a:"suculentas",b:"suculentas",t:["sol","brisa"],care:["Sol suave","Ideal para regalar"],size:"6 de 8 cm",water:"Cada 12 días",best:8,d:"Seis suculentas distintas en materas pequeñas. Un detalle que dura."},
  {id:"combo-oficina",n:"Combo oficina verde",c:"combos",p:99000,w:111000,a:"oficina",b:"zz",t:["sombra"],care:["ZZ + pothos","Poca luz"],size:"2 plantas",water:"Cada 10 días",best:5,d:"Zamioculca y pothos con macetas, pensados para escritorios y recepciones."},
  {id:"combo-regalo",n:"Combo regalo anturio",c:"combos",p:79000,a:"floristeria",b:"anturio",t:["sombra"],care:["Con tarjeta","Empaque de regalo"],size:"45 cm",water:"Cada 5 días",best:6,d:"Anturio en maceta decorativa con tarjeta escrita a mano."},
  {id:"combo-tropical",n:"Combo jardín tropical x5",c:"combos",p:210000,a:"invernadero",b:"monstera2",t:["sombra","brisa"],care:["5 plantas","Instalación opcional"],size:"5 plantas medianas",water:"Varía",best:3,d:"Cinco plantas tropicales para armar un rincón tipo selva en terraza o patio."},
  {id:"bono",n:"Bono de regalo",c:"combos",p:100000,a:"floristeria",b:"floristeria",t:[],care:["Digital","Vence en 6 meses"],size:"—",water:"—",best:4,d:"Para que quien lo reciba escoja su planta en la tienda o en las sedes."}
];
const POSTS=[
  {id:"cinta",t:"Por esto se queman las puntas de tu cinta",tag:"Cuidados",img:"cinta",min:4,ex:"El cloro del agua y el sol de la tarde son los culpables más comunes. Así lo corriges."},
  {id:"helecho",t:"El error que está acabando con tu helecho",tag:"Errores comunes",img:"helecho",min:3,ex:"No es la falta de agua: es el aire seco. Tres trucos para devolverle el verde."},
  {id:"anturio",t:"Anturios: cómo lograr una explosión de flores",tag:"Floración",img:"anturio",min:5,ex:"Luz indirecta, abono cada mes y una matera justa. La receta para que no pare de florecer."},
  {id:"salitre",t:"Plantas que aguantan el salitre de Cartagena",tag:"Costa Caribe",img:"cactusrow",min:6,ex:"Si vives frente al mar, estas especies resisten la brisa y la sal sin quemarse."},
  {id:"oficina",t:"Plantas para oficinas con aire acondicionado",tag:"Interiores",img:"oficina",min:4,ex:"El aire frío y seco mata a muchas plantas. Estas cinco lo soportan sin problema."},
  {id:"abono",t:"Abono orgánico: cada cuánto y cuánto echarle",tag:"Abono y tierra",img:"siembra",min:5,ex:"Una guía simple de dosis por tamaño de matera para no quemar las raíces."},
  {id:"monstera",t:"Cómo hacer que tu monstera saque hojas perforadas",tag:"Cuidados",img:"monstera2",min:4,ex:"Las perforaciones salen con luz y edad. Lo que puedes hacer para acelerarlas."},
  {id:"suculentas",t:"Suculentas: por qué se pudren y cómo evitarlo",tag:"Errores comunes",img:"suculentas",min:3,ex:"Exceso de riego y tierra pesada. El sustrato correcto lo cambia todo."},
  {id:"regalar",t:"Las 6 plantas más fáciles para regalar",tag:"Regalos",img:"haworthia2",min:4,ex:"Para quien dice que se le mueren todas: opciones que perdonan los olvidos."}
];
const byId=Object.fromEntries(P.map(x=>[x.id,x]));
const catName=id=>(CATS.find(c=>c.id===id)||{}).n||"";
const fmt=v=>"$"+v.toLocaleString("es-CO");
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const icon=(n,cls="i")=>`<svg class="${cls}" aria-hidden="true"><use href="#i-${n}"/></svg>`;

const SPRITE=`<svg width="0" height="0" style="position:absolute" aria-hidden="true">
<symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></symbol>
<symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></symbol>
<symbol id="i-bag" viewBox="0 0 24 24"><path d="M5 8h14l-1.2 12.1a1 1 0 0 1-1 .9H7.2a1 1 0 0 1-1-.9L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></symbol>
<symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/></symbol>
<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
<symbol id="i-left" viewBox="0 0 24 24"><path d="m15 6-6 6 6 6"/></symbol>
<symbol id="i-right" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></symbol>
<symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></symbol>
<symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
<symbol id="i-minus" viewBox="0 0 24 24"><path d="M5 12h14"/></symbol>
<symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></symbol>
<symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10"/></symbol>
<symbol id="i-filter" viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4"/></symbol>
<symbol id="i-grid" viewBox="0 0 24 24"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></symbol>
<symbol id="i-list" viewBox="0 0 24 24"><rect x="4" y="5" width="5" height="5" rx="1"/><rect x="4" y="14" width="5" height="5" rx="1"/><path d="M12 7.5h8M12 16.5h8"/></symbol>
<symbol id="i-truck" viewBox="0 0 24 24"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></symbol>
<symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></symbol>
<symbol id="i-leaf" viewBox="0 0 24 24"><path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19 13 11"/></symbol>
<symbol id="i-card" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3"/></symbol>
<symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11Z"/><circle cx="12" cy="10" r="2.2"/></symbol>
<symbol id="i-phone" viewBox="0 0 24 24"><path d="M6 3h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2Z"/></symbol>
<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/></symbol>
<symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></symbol>
<symbol id="i-moon" viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></symbol>
<symbol id="i-drop" viewBox="0 0 24 24"><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z"/></symbol>
<symbol id="i-ruler" viewBox="0 0 24 24"><path d="M4 16 16 4l4 4L8 20z"/><path d="m8 12 2 2M11 9l2 2M14 6l2 2"/></symbol>
<symbol id="i-insta" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6" fill="currentColor"/></symbol>
<symbol id="i-chat" viewBox="0 0 24 24"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19.1L4 20Z"/></symbol>
</svg>`;

const NAV=[["plantas","Plantas","catalogo.html?g=plantas"],["macetas","Macetas","catalogo.html?g=macetas"],["abono","Abono y tierra","catalogo.html?g=abono"],["alquiler","Alquiler","alquiler.html"],["aprende","Aprende","aprende.html"]];

function shell(active){
  const cur=k=>k===active?' aria-current="page"':"";
  document.body.insertAdjacentHTML("afterbegin",SPRITE+`
<a class="skip" href="#main">Saltar al contenido</a>
<div class="note">Propuesta de diseño · Fotos, precios y textos de ejemplo</div>
<div class="topbar"><div class="wrap"><span>Envíos a domicilio en <b>Cartagena</b> y <b>Sincelejo</b></span><span class="tb-right"><span>WhatsApp 302 713 8703</span><span>Lun a sáb · 7:00 a.m. – 6:00 p.m.</span></span></div></div>
<header class="site"><div class="wrap">
  <a class="brand" href="index.html" aria-label="Vivero Organik, inicio"><img src="${LOGO}" alt="" width="52" height="52"><span>Vivero Organik<small>CARTAGENA · SINCELEJO</small></span></a>
  <nav class="main" aria-label="Principal">${NAV.map(([k,n,h])=>`<a href="${h}"${cur(k)}>${n}</a>`).join("")}</nav>
  <div class="hicons">
    <button class="icon-btn" id="themeBtn" type="button"><svg class="i" aria-hidden="true"><use href="#i-moon"/></svg></button>
    <button class="icon-btn" id="openSearch" aria-label="Buscar" aria-expanded="false" aria-controls="searchBar">${icon("search")}</button>
    <button class="icon-btn hide-s" aria-label="Mi cuenta">${icon("user")}</button>
    <button class="icon-btn" id="openCart" aria-label="Abrir carrito">${icon("bag")}<span class="badge" id="cartCount">0</span></button>
    <button class="icon-btn menu-btn" id="openMenu" aria-label="Abrir menú">${icon("menu")}</button>
  </div>
</div>
<div class="search-bar" id="searchBar" hidden><form class="wrap" action="catalogo.html" role="search"><label class="sr" for="q">Buscar productos</label><input id="q" name="q" type="search" placeholder="Busca monstera, abono, macetas…" autocomplete="off"><button class="btn btn-dark" type="submit">Buscar</button></form></div>
</header>`);
  document.body.insertAdjacentHTML("beforeend",`
<div class="trust"><div class="wrap">
  <div><span class="ic">${icon("truck")}</span><span><b>Envío a domicilio</b><span>Cartagena y Sincelejo</span></span></div>
  <div><span class="ic">${icon("card")}</span><span><b>Paga como quieras</b><span>Tarjeta, PSE o Nequi</span></span></div>
  <div><span class="ic">${icon("leaf")}</span><span><b>Llega sana</b><span>O te la cambiamos</span></span></div>
  <div><span class="ic">${icon("shield")}</span><span><b>Compra segura</b><span>Pago protegido</span></span></div>
</div></div>
<footer class="site">
  <div class="wrap f-top">
    <div class="f-brand"><img src="${LOGO}" alt="Vivero Organik Cartagena" width="96" height="96" loading="lazy">
      <p>Jardinería y ornamentos en Cartagena y Sincelejo. Plantas, macetas, abono orgánico, tierra negra y alquiler de plantas.</p>
      <div class="social"><a href="https://www.instagram.com/viverorganikcartagena/" target="_blank" rel="noopener" aria-label="Instagram">${icon("insta")}</a><a href="https://wa.me/${WA}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon("chat")}</a></div></div>
    <div><h4>Tienda</h4><ul><li><a href="catalogo.html?c=interior">Plantas de interior</a></li><li><a href="catalogo.html?c=exterior">Plantas de exterior</a></li><li><a href="catalogo.html?g=macetas">Macetas</a></li><li><a href="catalogo.html?g=abono">Abono y tierra</a></li><li><a href="alquiler.html">Alquiler de plantas</a></li></ul></div>
    <div><h4>Ayuda</h4><ul><li><a href="index.html#sedes">Envíos y domicilios</a></li><li><a href="index.html#sedes">Cambios y garantía</a></li><li><a href="aprende.html">Guías de cuidado</a></li><li><a href="index.html#sedes">Nuestras sedes</a></li><li><a href="index.html">Política de privacidad</a></li></ul></div>
    <div class="news"><h4>Club Organik</h4><p>Recibe consejos de cuidado y ofertas de temporada. Sin spam.</p>
      <form id="news" novalidate><label class="sr" for="email">Correo electrónico</label><input id="email" type="email" autocomplete="email" placeholder="tu@correo.com" required><button class="btn btn-oro" type="submit">Suscribirme</button><p class="msg" id="newsMsg" aria-live="polite"></p></form></div>
  </div>
  <div class="f-bot"><div class="wrap"><span>© 2026 Vivero Organik Cartagena</span><div class="pay" aria-label="Medios de pago"><span>VISA</span><span>MASTERCARD</span><span>PSE</span><span>NEQUI</span><span>DAVIPLATA</span></div></div></div>
</footer>
<div class="scrim" id="scrim"></div>
<aside class="drawer" id="drawer" role="dialog" aria-modal="true" aria-labelledby="h-cart">
  <div class="d-head"><h2 class="h-display" id="h-cart">Tu carrito</h2><button class="icon-btn" id="closeCart" aria-label="Cerrar carrito">${icon("x")}</button></div>
  <div class="steps" aria-label="Pasos de compra"><span class="on"><i>1</i>Carrito</span><span class="sep"></span><span><i>2</i>Envío</span><span class="sep"></span><span><i>3</i>Pago</span></div>
  <div class="d-body" id="cartBody"></div>
  <div class="d-foot" id="cartFoot"><div class="ship" id="shipMsg"></div><div class="sub"><span>Subtotal</span><b id="subtotal" class="price">$0</b></div>
    <button class="btn btn-oro" id="checkout">Ir a pagar ${icon("arrow")}</button><small>Envío e impuestos se calculan en el siguiente paso</small></div>
</aside>
<nav class="mnav" id="mnav" aria-label="Menú móvil"><button class="icon-btn x" id="closeMenu" aria-label="Cerrar menú">${icon("x")}</button>
  <a href="index.html">Inicio</a>${NAV.map(([k,n,h])=>`<a href="${h}"${cur(k)}>${n}</a>`).join("")}</nav>
<div class="toast" id="toast" role="status" aria-live="polite"></div>`);
  wire();
}

/* cart + favs */
const KEY="organik-v2-cart";
let cart={};try{cart=JSON.parse(localStorage.getItem(KEY)||"{}")}catch(e){}
const favs=new Set();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(cart))}catch(e){}};
const count=()=>Object.values(cart).reduce((a,b)=>a+b,0);
const total=()=>Object.entries(cart).reduce((s,[id,q])=>s+(byId[id]?byId[id].p*q:0),0);

function renderCart(){
  const n=count(),sub=total(),ids=Object.keys(cart).filter(id=>byId[id]);
  $("#cartCount").textContent=n;
  $("#openCart").setAttribute("aria-label",`Abrir carrito, ${n} ${n===1?"producto":"productos"}`);
  $("#cartBody").innerHTML=ids.length?ids.map(id=>{const x=byId[id],q=cart[id];return `<div class="line">
    <img src="${IMG}${x.a}.jpg" alt="" width="76" height="76">
    <div><h3><a href="producto.html?id=${x.id}">${x.n}</a></h3><span class="u price">${fmt(x.p)} c/u</span><br>
      <span class="qty"><button aria-label="Quitar uno de ${x.n}" data-dec="${id}">${icon("minus")}</button><output>${q}</output><button aria-label="Agregar uno de ${x.n}" data-inc="${id}">${icon("plus")}</button></span></div>
    <div><span class="lt">${fmt(x.p*q)}</span><button class="rm" data-rm="${id}">Eliminar</button></div></div>`}).join("")
    :`<div class="empty">${icon("leaf")}<b>Tu carrito está vacío</b>Agrega una planta y aquí la verás.<br><br><a class="btn btn-dark" href="catalogo.html">Ver catálogo</a></div>`;
  $("#cartFoot").hidden=!ids.length;
  $("#subtotal").textContent=fmt(sub);
  const left=FREE_SHIP-sub;
  $("#shipMsg").innerHTML=(left>0?`Te faltan <b class="price">${fmt(left)}</b> para envío gratis`:`<b>Tienes envío gratis</b>`)+`<div class="bar"><i style="width:${Math.min(100,sub/FREE_SHIP*100)}%"></i></div>`;
  save();
}
function bump(){const b=$("#cartCount");b.classList.remove("bump");void b.offsetWidth;b.classList.add("bump")}
let lastFocus=null;
function openPanel(el,scrim,focusEl){lastFocus=document.activeElement;el.classList.add("on");scrim.classList.add("on");setTimeout(()=>focusEl&&focusEl.focus(),50)}
function closePanel(el,scrim){if(!el.classList.contains("on"))return;el.classList.remove("on");scrim.classList.remove("on");lastFocus&&lastFocus.focus&&lastFocus.focus()}
const openCart=()=>openPanel($("#drawer"),$("#scrim"),$("#closeCart"));
const closeCart=()=>closePanel($("#drawer"),$("#scrim"));
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("on"),3200)}
function add(id,q=1,open=true){if(!byId[id]||byId[id].out)return;cart[id]=(cart[id]||0)+q;renderCart();bump();
  $$(`[data-add="${id}"]`).forEach(b=>{b.classList.add("done");b.innerHTML=icon("check")+"Agregado";clearTimeout(b._t);b._t=setTimeout(()=>{b.classList.remove("done");b.innerHTML=icon("bag")+"Agregar"},1600)});
  if(open)setTimeout(openCart,350)}

function wire(){
  document.addEventListener("click",e=>{
    const a=e.target.closest("[data-add]");if(a){e.preventDefault();add(a.dataset.add);return}
    const f=e.target.closest("[data-fav]");if(f){e.preventDefault();const id=f.dataset.fav;favs.has(id)?favs.delete(id):favs.add(id);$$(`[data-fav="${id}"]`).forEach(x=>x.setAttribute("aria-pressed",favs.has(id)));toast(favs.has(id)?"Guardada en favoritos":"Quitada de favoritos");return}
    const inc=e.target.closest("[data-inc]");if(inc){cart[inc.dataset.inc]++;renderCart();return}
    const dec=e.target.closest("[data-dec]");if(dec){const id=dec.dataset.dec;if(--cart[id]<1)delete cart[id];renderCart();return}
    const rm=e.target.closest("[data-rm]");if(rm){delete cart[rm.dataset.rm];renderCart();toast("Producto eliminado");return}
  });
  $("#openCart").onclick=openCart;$("#closeCart").onclick=closeCart;$("#scrim").onclick=()=>{closeCart();closeMenu()};
  $("#checkout").onclick=()=>toast("En la tienda real, aquí se abre el pago seguro de Shopify");
  const mn=$("#mnav");
  window.closeMenu=()=>closePanel(mn,$("#scrim"));
  $("#openMenu").onclick=()=>openPanel(mn,$("#scrim"),$("#closeMenu"));
  $("#closeMenu").onclick=closeMenu;
  const sb=$("#searchBar"),sbtn=$("#openSearch");
  sbtn.onclick=()=>{sb.hidden=!sb.hidden;sbtn.setAttribute("aria-expanded",!sb.hidden);if(!sb.hidden)$("#q").focus()};
  document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeCart();closeMenu();if(!sb.hidden){sb.hidden=true;sbtn.setAttribute("aria-expanded","false");sbtn.focus()}}});
  /* theme toggle: starts from the system, remembers the visitor's choice */
  const root=document.documentElement,mq=matchMedia("(prefers-color-scheme: dark)"),tb=$("#themeBtn");
  const isDark=()=>root.dataset.theme?root.dataset.theme==="dark":mq.matches;
  const paintBtn=()=>{const d=isDark();tb.innerHTML=icon(d?"sun":"moon");tb.setAttribute("aria-label",d?"Cambiar a modo claro":"Cambiar a modo oscuro")};
  tb.onclick=()=>{const next=isDark()?"light":"dark";root.dataset.theme=next;try{localStorage.setItem("organik-theme",next)}catch(e){}paintBtn()};
  mq.addEventListener("change",paintBtn);paintBtn();
  $("#news").addEventListener("submit",e=>{e.preventDefault();const v=$("#email").value.trim();
    $("#newsMsg").textContent=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)?"Listo, ya eres parte del Club Organik.":"Escribe un correo válido, por ejemplo nombre@correo.com"});
  renderCart();
}

function card(x){
  const off=x.w?Math.round((1-x.p/x.w)*100):0;
  const flag=x.out?'<span class="flag out">Agotado</span>':off?`<span class="flag sale">-${off}%</span>`:"";
  const care=x.care?`<div class="care">${x.care.map(c=>`<span>${c}</span>`).join("")}</div>`:"";
  const btn=cls=>x.out?`<button class="add ${cls}" disabled>Agotado</button>`:`<button class="add ${cls}" data-add="${x.id}">${icon("bag")}Agregar</button>`;
  return `<article class="card${x.out?" is-out":""}">
    <div class="ph">${flag}
      <button class="fav" aria-label="Guardar ${x.n} en favoritos" aria-pressed="${favs.has(x.id)}" data-fav="${x.id}">${icon("heart")}</button>
      <img class="a" src="${IMG}${x.a}.jpg" alt="${x.n}" loading="lazy" width="600" height="600">
      <img class="b" src="${IMG}${x.b}.jpg" alt="" loading="lazy" width="600" height="600">
      <div class="quick">${btn("")}</div>
    </div>
    <div class="meta"><span class="cat-l">${catName(x.c)}</span><h3><a href="producto.html?id=${x.id}">${x.n}</a></h3>
      <div class="row"><span class="now price">${fmt(x.p)}</span>${x.w?`<span class="was price">${fmt(x.w)}</span>`:""}</div>${care}<p class="desc">${x.d}</p></div>
    ${btn("add-m")}
  </article>`;
}

window.O={P,CATS,LUZ,POSTS,byId,catName,fmt,$,$$,icon,card,add,toast,shell,IMG,WA};
})();
