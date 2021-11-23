"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import RainbowFrame from './components/RainbowFrame';

const colors=['red', 'yellow', 'blue', 'green', 'orange'];

ReactDOM.render(
  <RainbowFrame colors = {colors}>
    Hello, Liosha)
  </RainbowFrame>, 
  document.getElementById('container') 
);