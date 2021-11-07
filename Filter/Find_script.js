"use strict";

var findList = [
  {key :1, name : "Тормозные колодки ATE / 13046072492"},
  {key :2, name : "Тормозные колодки ATE / 13046072512"},
  {key :3, name : "Масляный фильтр PURFLUX / LS301"},
  {key :4, name : "Воздушный фильтр FILTRON / AP1353"},
  {key :5, name : "Прокладка (шайба) ELRING / 776327"},
  {key :6, name : "Щетки стеклоочистителя BOSCH / 3397004670"},
  {key :7, name : "Моторное масло ELF Evolution 900 SXR, 5W-30, 5л (синтетика)"}
];

ReactDOM.render(
  React.createElement(Find,{list : findList, buttonCaption : "Очистить", sectionName : "Поиск"}), 
  document.getElementById("container") 
);