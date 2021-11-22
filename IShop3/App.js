"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import IShopBlock from './components/IShopBlock';

var iShopName="Интернет-магазин Автозапчастей";
var productList=require('./products.json');

ReactDOM.render(
  <IShopBlock 
    name = {iShopName}
    products = {productList}
  />
  , document.getElementById('container') 
);