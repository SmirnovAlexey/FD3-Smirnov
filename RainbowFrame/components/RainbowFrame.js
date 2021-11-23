"use strict";
import React from 'react';
import PropTypes from 'prop-types';

import './RainbowFrame.css';

function build(colorArray, text) {
    let color = colorArray.shift(0);
    return color ? <div className='RainbowFrame' style={{ borderColor: color }}>{build(colorArray, text)}</div> : text;
}

const RainbowFrame = ( props ) => {
    console.log(props.colors.length) ;
    return build(props.colors.length == 0 ? [' '] : props.colors, props.children)
};

RainbowFrame.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string)
};

export default RainbowFrame;
