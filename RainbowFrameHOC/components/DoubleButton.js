"use strict";
import React from 'react';
import PropTypes from 'prop-types';

import './DoubleButton.css';

class DoubleButton extends React.Component {

	static propTypes = {
		caption1: PropTypes.string.isRequired,
		caption2: PropTypes.string.isRequired,
		onClick : PropTypes.func
	};
	
	onClick = (EO) => {
		this.props.cbPressed(EO.target.id);
	}
	
	render() {
	  return (
		<div className="DoubleButton">
		<input className="Input" type="button" id="1" value={this.props.caption1} onClick={this.onClick}/>
			{this.props.children}
		<input className="Input" type="button" id="2" value={this.props.caption2} onClick={this.onClick}/>
		</div>
	  );
	}
  
  }
 

export default DoubleButton;
