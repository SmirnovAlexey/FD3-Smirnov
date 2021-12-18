"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import MobileCompany from './components/MobileCompany';

let companysArr=[{id:1, name:'A1'}, 
  {id:2, name:'МТС'},
  {id:3, name:'life:)'}];
let clientsArr=[ 
  {id:101, surname:"Иванов", firstname:"Иван", patronymic:"Иванович", balance:200}, 
  {id:105, surname:"Сидоров", firstname:"Сидор", patronymic:"Сидорович", balance:250}, 
  {id:110, surname:"Петров", firstname:"Петр", patronymic:"Петрович", balance:0}, 
  {id:120, surname:"Григорьев", firstname:"Григорий", patronymic:"Григорьевич", balance:220}, 
];

ReactDOM.render(
  <MobileCompany 
    names={companysArr}
    clients={clientsArr}
  />
  , document.getElementById('container') 
);

