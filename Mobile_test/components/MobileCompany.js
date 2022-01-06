import React from 'react';
import PropTypes from 'prop-types';

import MobileClient from './MobileClient';

import {mobileEvents} from './events';
import './MobileCompany.css';

class MobileCompany extends React.PureComponent {
  constructor(props) {
    super(props);
    let firstCompanyId = props.names[0].id;
    this.state = {
      names: [...this.props.names],
      clients: [...this.props.clients],
      currFilterType : 1,
      currCompanyId : firstCompanyId,
      currCompanyName : this.props.names.find(n => n.id==firstCompanyId).name,
      editClientId : 0,
      maxClientId : this.props.clients.reduce((max, client) => client.id > max ? client.id : max, 0),
    };
  }

  static propTypes = {
    names:PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
    clients:PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        surname: PropTypes.string.isRequired,
        firstname: PropTypes.string.isRequired,
        patronymic: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
      })
    ),
  };

  componentDidMount = () => {
    mobileEvents.addListener('EEditClicked',this.answerEdited);
    mobileEvents.addListener('EDeleteClicked',this.answerDeleted);
    mobileEvents.addListener('ESaveClicked',this.answerSave);
  };

  componentWillUnmount = () => {
    mobileEvents.removeListener('EEditClicked',this.answerEdited);
    mobileEvents.removeListener('EDeleteClicked',this.answerDeleted);
    mobileEvents.removeListener('ESaveClicked',this.answerSave);
  };

  answerEdited = (id) => {
	  this.setState({editClientId : id});
  }

  answerDeleted = (id) => {
    let newClients=this.state.clients.filter(client => client.id != id);
    let editClientId = this.state.editClientId == id ? 0 : this.state.editClientId;
	  this.setState({clients : newClients, editClientId:editClientId});
  }

  answerSave = (client) => {
    let newClients=[...this.state.clients];
    newClients.forEach( (c,i) => {
      if ( c.id==client.id ) {
        newClients[i]=client;
      }
    } );
    this.setState({clients:newClients});
  }

  getCompanyNameById = (id) => this.state.names.find(n => n.id==id).name;
  isShowClient = (client) => {
    return this.state.currFilterType == 1 
      || (this.state.currFilterType == 2 && client.balance > 0)
      || (this.state.currFilterType == 3 && client.balance <= 0);
  };


  setName = (EO) => {
    let id = EO.target.id;
    let name = this.getCompanyNameById(id);
    this.setState({currCompanyId:id, currCompanyName:name})
  };

  setOrder = (EO) => {
    let id = EO.target.id;
    this.setState({currFilterType:id})
  };

  newClient = () => {
    let clientId = this.state.maxClientId + 1;
    let newClient = {id:clientId, surname : "", firstname : "", patronymic : "", balance : 0};
    let newClients=[...this.state.clients];
    newClients.push(newClient);
    this.setState({clients : newClients, maxClientId : clientId, editClientId :clientId})
  };
  
  render() {

    //console.log("MobileCompany render");

    var mobilesCode=this.state.names.map( name =>
      <input type="button" id={name.id} key={name.id} value={name.name} onClick={this.setName} />
    );
    var clientsCode=this.state.clients
      .filter(client => this.isShowClient(client))
      .map( client =>
        <MobileClient key={client.id} info={client} editClientId={this.state.editClientId} />
    );

    return (
      <div className='MobileCompany'>
        {/* {mobilesCode} */}
        <div className='MobileCompanyName'>Компания &laquo;{this.state.currCompanyName}&raquo;</div>
        <div className='MobileListFiltering'>
          <input id="1" type="button" value="Все" onClick={this.setOrder} disabled = {this.state.editClientId == 0 ? "" : "disabled"}/>
          <input id="2" type="button" value="Активные" onClick={this.setOrder} disabled = {this.state.editClientId == 0 ? "" : "disabled"}/>
          <input id="3" type="button" value="Заблокированные" onClick={this.setOrder} disabled = {this.state.editClientId == 0 ? "" : "disabled"}/>
        </div>
        <div className='MobileCompanyClients'>
        <table className= "Table">
                        <thead className= "Head">
                            <tr className= "Row">
                                <td className= "Surname">Фамилия</td>
                                <td className= "Firstname">Имя</td>
                                <td className= "Patronymic">Отчество</td>
                                <td className= "Balance">Баланс</td>
                                <td className= "Control">Управление</td>
                            </tr>
                        </thead>
                        <tbody className= "Body">{clientsCode}
                        </tbody>
                    </table>
        </div>
        <input id="4" type="button" value="Новый абонент" onClick={this.newClient} disabled = {this.state.editClientId == 0 ? "" : "disabled"}/>
      </div>
    )
    ;

  }

}

export default MobileCompany;
