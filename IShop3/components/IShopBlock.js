"use strict";

import React from 'react';
import PropTypes from 'prop-types';

import './IShopBlock.css';

import IShopElement from './IShopElement';
import IShopCard from './IShopCard';

class IShopBlock extends React.Component {

    static propTypes = {
        products : PropTypes.arrayOf( 
            PropTypes.shape({
                code: PropTypes.number,
                name: PropTypes.string,
                price: PropTypes.number,
                remainder: PropTypes.number,
                images: PropTypes.arrayOf(PropTypes.shape({
                    url: PropTypes.string}))
            })),
        name : PropTypes.string 
    };

    static defaultProps = {
        name: "Меня забыли назвать :(",
        products : []
    }

    constructor(props) {
        super(props);
        this.state = { 
            products : this.props.products.map(a => Object.assign({}, a)),
            numberSelectedRow: 0,
            isEditSelectedRow: false,
            isEditing : false
        };
    };

    copyArray(array) {
        return array.map(a => this.copyObject(a));
    };

    copyObject = (obj) => {
        return Object.assign({}, obj)
    }

    selectRow = (rowNumber) => {         
        this.setState( {isEditSelectedRow:false, numberSelectedRow:rowNumber} );
    };

    editRow = (rowNumber) => {         
        this.setState( {isEditSelectedRow:true, numberSelectedRow:rowNumber} );
    };

    deleteRow = (rowNumber) => {  
        var newProducts = this.copyArray(this.state.products);
        var index = newProducts.map(p => p.code).indexOf(rowNumber);
        newProducts.splice(index, 1);       
        this.setState({ products : newProducts});
    };

    setEditingMode = (mode) => { 
        this.setState( { isEditing : mode } );
    };

    сhangedRow = (product) => {
        var newProducts = this.copyArray(this.state.products);
        var newProduct = this.copyObject(product);
        if (newProduct.code != undefined) {
            var index = newProducts.map(p => p.code).indexOf(newProduct.code);
            newProducts.splice(index, 1, newProduct);
        } else {
            var newCode = Math.max.apply(null, newProducts.map(product => product.code));
            if (!isFinite(newCode)) {
                newCode = 0;
            }
            newProduct.code = newCode + 1;
            newProducts.push(newProduct);
        }
        this.setState( { isEditSelectedRow : false, isEditing : false, products : newProducts, numberSelectedRow: newProduct.code} ); 
    };

    cancelRow = () => { 
        this.setState( { isEditing : false, isEditSelectedRow : false } ); 
    };

    newElement = () => { 
        this.setState( { numberSelectedRow : 0, isEditSelectedRow : true } ); 
    };

    render() {
        var productsCode=this.state.products.map( product =>
            <IShopElement key={product.code}
                product = {product}
                cbSelectRow = {this.selectRow}
                cbDeleteRow = {this.deleteRow}
                cbEditRow = {this.editRow}
                numberSelectedRow = {this.state.numberSelectedRow}
                isEditing = {this.state.isEditing}
            />
        );

        var product = {};
        var mode = "none";
        product = this.state.products.find( product => product.code == this.state.numberSelectedRow);   
        if (this.state.isEditSelectedRow) {
            mode = product !== undefined || this.state.numberSelectedRow == 0 ? "edit" : mode;
        } else {
            mode = product !== undefined ? "show" : mode;
        }

        return (
            <div className = "IShopBlock">
                <div className = "NameShop">{this.props.name}</div>
                <div className = "Products">
                    <table className= "Table">
                        <thead className= "Head">
                            <tr className= "Row">
                                <td className= "Name">Наименование</td>
                                <td className= "Price">Стоимость</td>
                                <td className= "Remainder">Количество</td>
                                <td className= "Images">Изображения</td>
                                <td className= "Control">Управление</td>
                            </tr>
                        </thead>
                        <tbody className= "Body">{productsCode}
                        </tbody>
                    </table>
                </div>
                <div className = "New">
                    <input type='button' value='Новый товар' onClick={this.newElement} disabled = {(this.state.isEditing) ? "disabled" : ""} />
                </div>
                <div className = "IShopCard">
                    <IShopCard mode = {mode}
                        product = {product}
                        cbEditing = {this.setEditingMode}
                        cbСhanged = {this.сhangedRow}
                        cbCancel = {this.cancelRow}
                    />
            </div>
            </div>
        );
    };
};

export default IShopBlock;