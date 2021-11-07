"use strict";
var IShopElement = React.createClass({

    displayName: 'IShopElement',
  
    propTypes: {
        product : React.PropTypes.shape({
            code: React.PropTypes.number,
            name: React.PropTypes.string,
            price: React.PropTypes.number,
            remainder: React.PropTypes.number,
            images: React.PropTypes.arrayOf(React.PropTypes.shape({
                url: React.PropTypes.string
            }))
          }),
        numberSelectedRow : React.PropTypes.number 
    },

    getDefaultProps: function() {
        return { numberSelectedRow: 0, product : {} }
    },
  
    imageClick: function(EO) {
        EO.stopPropagation();
        window.open(EO.target.src);
    },

    rowClick: function(EO) {
        this.props.cbSelectRow(this.props.product.code);
    },

    deleteClick: function(EO) {
        EO.stopPropagation();
        this.props.cbDeleteRow(this.props.product.code);
    },

    render: function() {
        var images =  [];
        if (this.props.product.images) {
            images =  this.props.product.images
            .filter(image => image.url !== undefined)
            .map(image => React.createElement('img', {className:'Image', key:image.url, src:image.url, onClick:this.imageClick}));

        }
        return React.createElement('tr', {className: this.props.product.code === this.props.numberSelectedRow ? 'RowSelected' : 'Row' , onClick:this.rowClick},
                React.createElement('td', {className:'Name'}, this.props.product.name),
                React.createElement('td', {className:'Price'}, this.props.product.price),
                React.createElement('td', {className:'Remainder'}, this.props.product.remainder===0? "Нет в наличии" : this.props.product.remainder),
                React.createElement('td', {className:'Images'}, images),
                React.createElement('td', {className:'Control'}, 
                    React.DOM.input( {type:'button', className:'Button', value : "Delete", onClick:this.deleteClick})
                )
            );
      },

});