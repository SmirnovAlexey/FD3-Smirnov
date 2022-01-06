import React from 'react';
import PropTypes from 'prop-types';

import {mobileEvents} from './events';
import './MobileClient.css';

class MobileClient extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    info:PropTypes.shape({
      id: PropTypes.number.isRequired,
      surname: PropTypes.string.isRequired,
      firstname: PropTypes.string.isRequired,
      patronymic: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    }),
    editClientId : PropTypes.number.isRequired,
  };
  
  state = {
    info: Object.assign({},this.props.info),
    editClientId: this.props.editClientId,
    isEdit : this.props.editClientId == this.props.info.id, 
  };

  setEdit = () => {
    if (this.state.isEdit) {
      mobileEvents.emit('ESaveClicked',this.state.info);
      mobileEvents.emit('EEditClicked',0);
      } else {
      mobileEvents.emit('EEditClicked',this.state.info.id);
    }
  };

  editSurname = (EO) => {
    let newInfo = Object.assign({},this.state.info,{surname : EO.target.value});
    this.setState({info:newInfo})  
  };

  editFirstname = (EO) => {
    let newInfo = Object.assign({},this.state.info,{firstname : EO.target.value});
    this.setState({info:newInfo})  
  };

  editPatronymic = (EO) => {
    let newInfo = Object.assign({},this.state.info,{patronymic : EO.target.value});
    this.setState({info:newInfo})  
  };
  
  editBalance = (EO) => {
    let newInfo = Object.assign({},this.state.info,{balance : parseFloat(EO.target.value) || 0});
    this.setState({info:newInfo})  
  };


  setDelete = () => {
    mobileEvents.emit('EDeleteClicked',this.state.info.id);
  };

  UNSAFE_componentWillReceiveProps = (newProps) => {
    //console.log("MobileClient id="+this.props.info.id+" componentWillReceiveProps");
    let isEdit = newProps.editClientId == newProps.info.id;
    this.setState({info:newProps.info, editClientId:newProps.editClientId, isEdit:isEdit});
  };

  render() {

    //console.log("MobileClient id="+this.state.info.id+" render");

    return (
      <tr>
        <td><input type='text' isurnameid={this.state.info.id} disabled = {this.state.isEdit ? "" : "disabled"} value={this.state.info.surname} onChange={this.editSurname}/></td>
        <td><input type='text' ifirstnameid={this.state.info.id} disabled = {this.state.isEdit ? "" : "disabled"} value={this.state.info.firstname} onChange={this.editFirstname}/></td>
        <td><input type='text' ipatronicid={this.state.info.id} disabled = {this.state.isEdit ? "" : "disabled"} value={this.state.info.patronymic} onChange={this.editPatronymic}/></td>
        <td><input type='number' ibalanceid={this.state.info.id} disabled = {this.state.isEdit ? "" : "disabled"} value={this.state.info.balance} onChange={this.editBalance}/></td>
        <td className="Control"><input type="button" beditid={this.state.info.id} value={this.state.isEdit ? "Сохранить" : "Редактировать"} 
          disabled = {(this.state.editClientId == 0 || this.state.isEdit) ? "" : "disabled"}
          onClick={this.setEdit}/></td>
        <td className="Control"><input type="button" bdeleteid={this.state.info.id} value="Удалить" onClick={this.setDelete}/></td>
      </tr>
    );

  }

}

export default MobileClient;
