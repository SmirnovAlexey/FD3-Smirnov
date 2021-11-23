"use strict";
import React from 'react';
import PropTypes from 'prop-types';

import './BR2JSX.css';

const regex = /(<br\s*\/*>)/;

const BR2JSX = ( props ) => <div className='BR2JSX'>{props.text.split(regex).map(str => str.match(regex) ? <br /> : str)}</div>;

BR2JSX.propTypes = {
  text: PropTypes.string.isRequired
};

export default BR2JSX;
