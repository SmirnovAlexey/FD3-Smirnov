"use strict";
var IShop = React.createClass({

    displayName: 'IShop',
  
    getDefaultProps: function() {
      return { name: "Меня забыли назвать :(" }
    },
  
    imageClick: function(EO) {
        window.open(EO.target.src);
    },

    render: function() {
        var productsCode = [];
        if (this.props.products !== undefined) {
            this.props.products.forEach(product => {
                var images = [];  
                if (product.images !== undefined) {
                    product.images
                        .filter(image => image.url !== undefined)
                        .forEach(image => {
                            images.push(React.createElement('img', {className:'Image', key:image.url, src:image.url, onClick:this.imageClick}))
                        });  
                }
                productsCode.push(
                    React.createElement('tr', {className:'Row', key:product.code},
                        React.createElement('td', {className:'Name'}, product.name),
                        React.createElement('td', {className:'Price'}, product.price),
                        React.createElement('td', {className:'Remainder'}, product.remainder===0? "Нет в наличии" : product.remainder),
                        React.createElement('td', {className:'Images'}, images),
                    )
                )
            });
        }

        return React.DOM.div( {className:'IShop'}, 
            React.DOM.div( {className:'NameShop'}, this.props.name ),
            React.DOM.div( {className:'Products'}, 
                React.createElement('table',  {className:'Table'}, 
                    React.createElement('thead',  {className:'Head'}, 
                        React.createElement('tr', {className:'Row'},
                            React.createElement('td', {className:'Name'}, "Наименование"),
                            React.createElement('td', {className:'Price'}, "Стоимость"),
                            React.createElement('td', {className:'Remainder'}, "Количество"),
                            React.createElement('td', {className:'Images'}, "Изображения")
                        ),
                    ) ,
                    React.createElement('tbody',  {className:'Body'}, productsCode))
            ),
        );
    },
});