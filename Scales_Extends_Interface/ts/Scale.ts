import {IScalable} from './IScalable';
class Scale {
    
    private products:IScalable[];

    constructor() {
        this.products=[];
    }

    add(_product:IScalable):void {
        this.products.push(_product);
    }

    getSumScale():number {
        return this.products.reduce((_scale:number, currentValue:IScalable) => _scale + currentValue.getScale(), 0);
    }

    getNameList():string[] {
        return this.products.map((product:IScalable) => product.getName());
    }

}
export {Scale};