"use strict";

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson  } from 'enzyme-to-json';
import {mount, configure} from 'enzyme';

import MobileCompany from '../components/MobileCompany';

configure({ adapter: new Adapter() });

test('работа MobileCompany', () => {

  let companysArr=[{id:1, name:'A1'}, 
    {id:2, name:'МТС'},
    {id:3, name:'life:)'}];
  let clientsArr=[ 
    {id:101, surname:"Иванов", firstname:"Иван", patronymic:"Иванович", balance:200}, 
    {id:105, surname:"Сидоров", firstname:"Сидор", patronymic:"Сидорович", balance:250}, 
    {id:110, surname:"Петров", firstname:"Петр", patronymic:"Петрович", balance:0}, 
    {id:120, surname:"Григорьев", firstname:"Григорий", patronymic:"Григорьевич", balance:220}, 
  ];

  const wrapper = mount(<MobileCompany names={companysArr} clients={clientsArr}/>);
  expect(shallowToJson(wrapper)).toMatchSnapshot();

  const buttonAll = wrapper.findWhere( el => el.type()=='input' && el.prop('id') === '1'); 
  const buttonActive = wrapper.findWhere( el => el.type()=='input' && el.prop('id') === '2'); 
  const buttonNonActive = wrapper.findWhere( el => el.type()=='input' && el.prop('id') === '3'); 

  // Фильтрация
  // Активные
  buttonActive.simulate('click', {target:{id : "2"}});
  expect(shallowToJson(wrapper)).toMatchSnapshot();

  // Заблокированные
  buttonNonActive.simulate('click', {target:{id : "3"}});
  expect(shallowToJson(wrapper)).toMatchSnapshot();

  // Все
  buttonAll.simulate('click', {target:{id : "1"}});
  expect(shallowToJson(wrapper)).toMatchSnapshot();

  // Добавление
  const buttonAdd = wrapper.findWhere( el => el.type()=='input' && el.prop('id') === '4'); 
  buttonAdd.simulate('click');

  const inputSurname = wrapper.findWhere( el => el.prop('isurnameid') == '121');
  const inputFirstName = wrapper.findWhere( el => el.prop('ifirstnameid') == '121');
  const inputPatronic = wrapper.findWhere( el => el.prop('ipatronicid') == '121');
  const inputBalance = wrapper.findWhere( el => el.prop('ibalanceid') == '121');

  inputSurname.simulate('change', {"target":{"value":"Иванчик"}});
  inputFirstName.simulate('change', {"target":{"value":"Алексей"}});
  inputPatronic.simulate('change', {"target":{"value":"Викторович"}});
  inputBalance.simulate('change', {"target":{"value":"2001"}});

  const buttonSave = wrapper.findWhere( el => el.prop('beditid') == '121'); 
  const buttonEdit = buttonSave;
  buttonSave.simulate('click');
  expect(shallowToJson(wrapper)).toMatchSnapshot();

  // Изменение
  buttonEdit.simulate('click');
  inputFirstName.simulate('change', {"target":{"value":"Иван"}});
  buttonSave.simulate('click');
  expect(shallowToJson(wrapper)).toMatchSnapshot();

  // Удаление
  const buttonDelete = wrapper.findWhere( el => el.prop('bdeleteid') == '121'); 
  buttonDelete.simulate('click');
  expect(shallowToJson(wrapper)).toMatchSnapshot();
    
});
