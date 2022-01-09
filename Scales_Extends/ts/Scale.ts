import {Product} from './Product';
class Scale {
    
    products:Product[];

    constructor() {
        this.products=[];
    }

    add(_product:Product):void {
        this.products.push(_product);
    }

    getSumScale():number {
        return this.products.reduce((_scale, currentValue) => _scale + currentValue.getScale(), 0);
    }

    getNameList():string[] {
        return this.products.map(product => product.getName());
    }

}
export {Scale};