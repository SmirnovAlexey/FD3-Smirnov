"use strict";

var iShopName="Интернет-магазин Автозапчастей";
var productList=[ 
  {code:1,name:"Тормозные колодки ATE / 13046072492",price:96.78,images:[{url:"img/00030394501255.jpg"}],remainder:24},
  {code:2,name:"Тормозные колодки ATE / 13046072512",price:60.42,images:[{url:"img/00030422901255.jpg"}],remainder:11},
  {code:3,name:"Масляный фильтр PURFLUX / LS301",price:9.00,images:[{url:"img/00380232901255.jpg"}],remainder:6},
  {code:4,name:"Воздушный фильтр FILTRON / AP1353",price:11.82,images:[{url:"img/02560092403255.jpg"}, {url:"img/4958147.jpg"}],remainder:17},
  {code:5,name:"Прокладка (шайба) ELRING / 776327",price:1.62,remainder:10},
  {code:6,name:"Щетки стеклоочистителя BOSCH / 3397004670",price:7.32,images:[{url:"img/00304153201255.jpg"}],remainder:2},
  {code:7,name:"Моторное масло ELF Evolution 900 SXR, 5W-30, 5л (синтетика)",price:91.68,images:[{url:"img/evolution900sxr5w30_elf_02_58259ffb94fd0.jpeg"}],remainder:0},
  
];

ReactDOM.render(
  React.createElement(IShopBlock,{name:iShopName,products:productList}), 
  document.getElementById("container") 
);