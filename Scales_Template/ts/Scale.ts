import {Product} from './Product';
import {IStorageEngine} from './IStorageEngine';
class Scale<StorageEngine extends IStorageEngine<Product>> {
    
    private item:StorageEngine;

    constructor(T: { new (): StorageEngine; }) {
        this.item = new T();
    }

    add(_product:Product):void {
        this.item.addItem(_product);
    }

    private getListScalable():Array<Product> {
        var count:number = this.item.getCount();
        var scalables:Array<Product> = [];
        for (var i:number = 0; i < count; i++) {
            scalables.push(this.item.getItem(i));
        }
        return scalables;
    }

    getSumScale():number {
        return this.getListScalable().reduce((_scale:number, currentValue:Product) => _scale + currentValue.getScale(), 0);
    }

    getNameList():string[] {
        return this.getListScalable().map((product:Product) => product.getName());
    }

}
export {Scale};