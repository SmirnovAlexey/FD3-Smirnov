"use strict";
var IShopBlock = React.createClass({

    displayName: 'IShopBlock',
  
    propTypes: {
        products : React.PropTypes.arrayOf( 
            React.PropTypes.shape({
                code: React.PropTypes.number,
                name: React.PropTypes.string,
                price: React.PropTypes.number,
                remainder: React.PropTypes.number,
                images: React.PropTypes.arrayOf(React.PropTypes.shape({
                    url: React.PropTypes.string}))
            })),
        name : React.PropTypes.string 
    },  

    getDefaultProps: function() {
      return { name: "Меня забыли назвать :(", products : [] }
    },
  
    getInitialState: function() {
        return { 
            numberSelectedRow: 0,
            deleteRows : [],
            products : this.resortArray(this.props.products, [])
        };
    },

    copyArray : function(array) {
        return array.map(a => Object.assign({}, a));
    },

    selectRow: function(rowNumber) { 
        this.setState( {numberSelectedRow:rowNumber} );
    },

    deleteRow: function(rowNumber) {
        var newDeleteRows = this.state.deleteRows;
        newDeleteRows.push(rowNumber);
        this.setState({ deleteRows : newDeleteRows}, this.resort)
    },

    resort: function() { 
        this.setState( { products : this.resortArray(this.props.products, this.state.deleteRows) } );
    },

    resortArray: function(list, deleteRows) {
        return this.copyArray(list)
            .filter(e => deleteRows.indexOf(e.code) == -1);
    },

    render: function() {
        var productsCode = this.state.products.map( product =>
                React.createElement(IShopElement, {key:product.code, product:product, 
                    cbSelectRow: this.selectRow, 
                    cbDeleteRow: this.deleteRow, 
                    numberSelectedRow : this.state.numberSelectedRow} )
            );

        return React.DOM.div( {className:'IShopBlock'}, 
            React.DOM.div( {className:'NameShop'}, this.props.name ),
            React.DOM.div( {className:'Products'}, 
                React.createElement('table',  {className:'Table'}, 
                    React.createElement('thead',  {className:'Head'}, 
                        React.createElement('tr', {className:'Row'},
                            React.createElement('td', {className:'Name'}, "Наименование"),
                            React.createElement('td', {className:'Price'}, "Стоимость"),
                            React.createElement('td', {className:'Remainder'}, "Количество"),
                            React.createElement('td', {className:'Images'}, "Изображения"),
                            React.createElement('td', {className:'Control'}, "Управление")
                        ),
                    ) ,
                    React.createElement('tbody',  {className:'Body'}, productsCode)
                )
            ),
        );
    },
});