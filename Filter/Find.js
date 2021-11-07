"use strict";
var Find = React.createClass({

    displayName: 'Find',
  
    propTypes: {
        list:React.PropTypes.arrayOf(    
            React.PropTypes.shape({
                key: React.PropTypes.number.isRequired,
                name: React.PropTypes.string.isRequired
        })),
        sectionName : React.PropTypes.string,
        buttonCaption :  React.PropTypes.string,
        deffFilterStr : React.PropTypes.string,
        deffOrderByAlphabet : React.PropTypes.bool
    },

    getDefaultProps: function() {
      return { list: [], buttonCaption : "Clear", deffFilterStr : "", deffOrderByAlphabet : false }
    },

    getInitialState: function() {
        return { 
            orderByAlphabet: this.props.deffOrderByAlphabet, 
            filterStr: this.props.deffFilterStr, 
            list : this.resortArray(this.props.list, this.props.deffFilterStr, this.props.deffOrderByAlphabet) 
        };
    },

    copyArray : function(array) {
        return array.map(a => Object.assign({}, a));
    },

    orderByAlphabet: function(EO) { 
        this.setState( {orderByAlphabet:EO.target.checked}, this.resort );
    },

    inputFilterStr: function(EO) { 
        this.setState( {filterStr:EO.target.value}, this.resort );
    },

    clearСonditions: function() { 
        this.setState( {orderByAlphabet:this.props.deffOrderByAlphabet, filterStr: this.props.deffFilterStr}, this.resort );
    },

    resort: function() { 
        this.setState( { list : this.resortArray(this.props.list, this.state.filterStr, this.state.orderByAlphabet) } );
    },

    resortArray: function(list, filterStr, orderByAlphabet) { 
        return this.copyArray(list)
            .filter(e => e.name.toUpperCase().indexOf(filterStr.toUpperCase()) !== -1)
            .sort((a,b) => orderByAlphabet ? a.name.localeCompare(b.name) : 0);
    },
    
    render: function() {
        //var options = this.state.list.map(element => React.createElement('option', {className:'Element', key:element.key}, element.name));

        return React.DOM.div( {className:'Find'}, 
            this.props.sectionName ? React.DOM.div( {className:'Holder'}, this.props.sectionName ) : null,
            React.DOM.div( {className:'Filter'},  
                React.DOM.input( {type:'checkbox', className:'CheckBox', checked:this.state.orderByAlphabet, onChange:this.orderByAlphabet},),
                React.DOM.input( {type:'text', className:'Text', value:this.state.filterStr , onChange:this.inputFilterStr},),
                React.DOM.input( {type:'button', className:'Button', value:this.props.buttonCaption, onClick:this.clearСonditions}),
            ),
            // React.DOM.div( {className:'FilterList'},  
            //     React.createElement( 'select', {className:'Select'}, options)
            // ),
            React.createElement( 'textarea', {className:'Textarea', readOnly:true, value:this.state.list.map(element => element.name).join("\n")})
        );
    },
});