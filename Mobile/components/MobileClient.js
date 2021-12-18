import React from 'react';
import PropTypes from 'prop-types';

import {mobileEvents} from './events';
import './MobileClient.css';

class MobileClient extends React.PureComponent {

  constructor(props) {
    super(props);
    this.refInputSurname = React.createRef();
    this.refInputFirstname = React.createRef();
    this.refInputPatronymic = React.createRef();
    this.refInputBalance = React.createRef();
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
    info: this.props.info,
    editClientId: this.props.editClientId,
    isEdit : this.props.editClientId == this.props.info.id, 
  };

  setEdit = () => {
    if (this.state.isEdit) {
      let newClient = Object.assign({},this.state.info, 
        {
          surname:this.refInputSurname.current.value,
          firstname:this.refInputFirstname.current.value,
          patronymic:this.refInputPatronymic.current.value,
          balance: parseFloat(this.refInputBalance.current.value) || 0,
        });
      mobileEvents.emit('ESaveClicked',newClient);
      mobileEvents.emit('EEditClicked',0);
      } else {
      mobileEvents.emit('EEditClicked',this.state.info.id);
    }
  };

  setDelete = () => {
    mobileEvents.emit('EDeleteClicked',this.state.info.id);
  };

  UNSAFE_componentWillReceiveProps = (newProps) => {
    console.log("MobileClient id="+this.props.info.id+" componentWillReceiveProps");
    let isEdit = newProps.editClientId == newProps.info.id;
    this.setState({info:newProps.info, editClientId:newProps.editClientId, isEdit:isEdit});
  };

  render() {

    console.log("MobileClient id="+this.state.info.id+" render");

    return (
      <tr>
        <td><input type='text' disabled = {this.state.isEdit ? "" : "disabled"} defaultValue={this.state.info.surname} ref={this.refInputSurname}/></td>
        <td><input type='text' disabled = {this.state.isEdit ? "" : "disabled"} defaultValue={this.state.info.firstname} ref={this.refInputFirstname}/></td>
        <td><input type='text' disabled = {this.state.isEdit ? "" : "disabled"} defaultValue={this.state.info.patronymic} ref={this.refInputPatronymic}/></td>
        <td><input type='number' disabled = {this.state.isEdit ? "" : "disabled"} defaultValue={this.state.info.balance} ref={this.refInputBalance}/></td>
        <td className="Control"><input type="button" value={this.state.isEdit ? "Сохранить" : "Редактировать"} 
          disabled = {(this.state.editClientId == 0 || this.state.isEdit) ? "" : "disabled"}
          onClick={this.setEdit}/></td>
        <td className="Control"><input type="button" value="Удалить" onClick={this.setDelete}/></td>
      </tr>
    );

  }

}

export default MobileClient;
