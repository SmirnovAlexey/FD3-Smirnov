import {Product} from './Product';
import {IStorageEngine} from './IStorageEngine';
class ScaleStorageEngineArray implements IStorageEngine<Product>{
    
    private products:Product[];

    constructor() {
        this.products=[];
    }

    addItem(item:Product):void {
        this.products.push(item);
    }

    getItem(index:number):Product {
        return this.products[index];
    }

    getCount():number {
        return this.products.length;
    }
}
export {ScaleStorageEngineArray};