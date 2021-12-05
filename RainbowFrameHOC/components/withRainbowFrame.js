"use strict";
import React from 'react';

import './withRainbowFrame.css';

function build(colorArray, Component, props) {
    let color = colorArray.shift(0);
    return color ? <div className='withRainbowFrame' style={{ borderColor: color }}>{build(colorArray, Component, props)}</div> : <Component {...props}/>
}

const withRainbowFrame = colors => Component => props => (
	build(colors.length == 0 ? [' '] : colors, Component, props)
);

export {withRainbowFrame};
