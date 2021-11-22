"use strict";
import React from 'react';
import PropTypes from 'prop-types';

import './IShopCard.css';

class IShopCard extends React.Component {    

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
        mode : PropTypes.oneOf(["edit","show","none"])  
    };

    static defaultProps = {
        mode : "none",
        product : {}
    }

    constructor(props) {
        super(props);
        this.state = {
            product : Object.assign({}, props.product),
            isValid: true,
            isEdit: false,
            priceTextError :"",
            nameTextError :"",
            remainderTextError :""
        };
    };

    copyArray = (array) => {
        return array.map(a => this.copyObject(a));
    };

    copyObject = (obj) => {
        return Object.assign({}, obj)
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.product.code !== this.props.product.code || prevProps.mode !== this.props.mode) {
            var p = this.copyObject(this.props.product);
            this.setState({product : p, 
                nameTextError : (["edit","new"].includes(this.props.mode)) ? this.getNameTextError(p.name) : "", 
                priceTextError : (["edit","new"].includes(this.props.mode)) ? this.getPriceTextError(p.price) : "", 
                remainderTextError : (["edit","new"].includes(this.props.mode)) ? this.getRemainderTextError(p.remainder) : ""},
                this.wasEditing.bind(this, false));
        }
        if (prevProps.isEdit !== this.props.isEdit) {
            this.setState({isEdit : this.props.isEdit});
        }
    }

    nameTextChanged = (EO) => { 
        var p = this.copyObject(this.state.product);
        p.name = EO.target.value;
        this.setState( {isEdit:true, 
            product : p, 
            nameTextError : this.getNameTextError(EO.target.value)
        }, this.wasEditing.bind(this, true) );
    }

    priceTextChanged = (EO) => {         
        var p = this.copyObject(this.state.product);
        p.price = EO.target.value;
        this.setState( {isEdit:true, 
            product : p, 
            priceTextError : this.getPriceTextError(EO.target.value)
        }, this.wasEditing.bind(this, true) );
    }

    remainderTextChanged = (EO) => {         
        var p = this.copyObject(this.state.product);
        p.remainder = EO.target.value;
        this.setState( {isEdit:true, 
            product : p,
            remainderTextError : this.getRemainderTextError(EO.target.value)
        }, this.wasEditing.bind(this, true) );
    }

    wasEditing = (isEdit) => { 
        this.setState( {
            isValid : (this.state.priceTextError + this.state.nameTextError + this.state.remainderTextError).length ==0
        });
        this.props.cbEditing(isEdit);
    };

    getNameTextError = (text) => { 
        if (text== undefined || text.length == 0) {
            return "Поле \"Наименование\" обязательно к заполнению";
        } else {
            return "";
        }
    };

    getPriceTextError = (text) => { 
        if (text== undefined || text.length == 0) {
            return "Поле \"Стоимость\" обязательно к заполнению";
        } else if (isNaN(text)) {
            return "Введите корректное значение";
        } else {
            return "";
        }
    };

    getRemainderTextError = (text) => { 
        if (text== undefined || text.length == 0) {
            return "Поле \"Количество\" обязательно к заполнению";
        } else if (isNaN(text)) {
            return "Введите корректное значение";
        } else {
            return "";
        }
    };

    saveClick = (EO) => {
        var p = this.copyObject(this.state.product); 
        p.price = Number(p.price);
        p.remainder = Number(p.remainder);
        this.props.cbСhanged(p);       
    };

    cancelClick = (EO) => {         
        this.props.cbCancel();
    };

    render() {
        if ( this.props.mode != "none" ) {
            return (
                <div>   
                <table className='TableCard'>
                <tbody>
                    <tr className='RowCard'> 
                        <td className='Name'>Наименование</td>
                        <td>
                            <input type='text' className='Input' 
                                value={this.state.product.name != undefined ? this.state.product.name : ""} 
                                onChange={this.nameTextChanged} 
                                disabled = {(["edit","new"].includes(this.props.mode)) ? "" : "disabled"}/>
                            <label className='Label'>{this.state.nameTextError}</label>
                        </td>
                    </tr>
                    <tr className='RowCard'> 
                        <td>Стоимость</td>
                        <td>
                            <input type='text' className='Input' 
                                value={this.state.product.price != undefined ? this.state.product.price : ""} 
                                onChange={this.priceTextChanged} 
                                disabled = {(["edit","new"].includes(this.props.mode)) ? "" : "disabled"}/>
                            <label className='Label'>{this.state.priceTextError}</label>
                        </td>
                    </tr>
                    <tr className='RowCard'> 
                        <td>Количество</td>
                        <td>
                            <input type='text' className='Input' 
                                value={this.state.product.remainder != undefined ? this.state.product.remainder : ""} 
                                onChange={this.remainderTextChanged} 
                                disabled = {(["edit","new"].includes(this.props.mode)) ? "" : "disabled"}/>
                            <label className='Label'>{this.state.remainderTextError}</label>
                        </td>
                    </tr>
                </tbody>
                </table>
                    { ["edit","new"].includes(this.props.mode) &&
                        <div>
                            <input type='button' value='Сохранить' 
                                onClick={this.saveClick } 
                                disabled = {this.state.isValid ? "" : "disabled"}/>
                            <input type='button' value='Отмена' onClick={this.cancelClick}/>  
                        </div>
                    }
            </div>
            );    
        } else {
            return null;
        }
      };

};

export default IShopCard;