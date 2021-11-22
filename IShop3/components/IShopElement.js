"use strict";
import React from 'react';
import PropTypes from 'prop-types';

import './IShopElement.css';

class IShopElement extends React.Component {    

    static propTypes = {
        product : PropTypes.shape({
            code: PropTypes.number,
            name: PropTypes.string,
            price: PropTypes.number,
            remainder: PropTypes.number,
            images: PropTypes.arrayOf(PropTypes.shape({
                url: PropTypes.string
            }))
          }),
        numberSelectedRow : PropTypes.number 
    };

    static defaultProps = {
        numberSelectedRow: 0,
        product : {}
    }

    imageClick = (EO) => {         
        EO.stopPropagation();
        window.open(EO.target.src);
    };

    rowClick = (EO) => {         
        !this.props.isEditing && this.props.cbSelectRow(this.props.product.code);
    };

    deleteClick = (EO) => {         
        EO.stopPropagation();
        this.props.cbDeleteRow(this.props.product.code);
    };

    editClick = (EO) => {         
        EO.stopPropagation();
        this.props.cbEditRow(this.props.product.code);
    };

    render() {

        var images =  this.props.product.images ? 
            this.props.product.images
                .filter(image => image.url !== undefined)
                .map( image =>
                    <img className="Image" key={image.url} src={image.url} onClick={this.imageClick}/>
                ) 
        : [];

        return (
            <tr className = {this.props.product.code === this.props.numberSelectedRow ? 'RowSelected' : 'Row'} onClick={this.rowClick}>
                <td className="Name">{this.props.product.name}</td>
                <td className="Price">{this.props.product.price}</td>
                <td className="Remainder">{this.props.product.remainder==0? "Нет в наличии" : this.props.product.remainder}</td>
                <td className="Images">{images}</td>
                <td className="Control">
                    <input type='button' value='Редактировать' onClick={this.editClick} disabled = {(this.props.isEditing) ? "disabled" : ""}/>
                    <input type='button' value='Удалить' onClick={this.deleteClick} disabled = {(this.props.isEditing) ? "disabled" : ""}/>
                </td>
            </tr>
        );    
      };

};

export default IShopElement;