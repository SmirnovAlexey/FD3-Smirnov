"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import DoubleButton from './components/DoubleButton';
import {withRainbowFrame} from './components/withRainbowFrame';

let onConsole = num => console.log(num);

let colors=['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
let FramedDoubleButton=withRainbowFrame(colors)(DoubleButton);

ReactDOM.render(
  <FramedDoubleButton caption1="я из лесу" caption2="мороз" cbPressed={onConsole}>вышел, был сильный</FramedDoubleButton>, 
  document.getElementById('container') 
);