import {Product} from './Product';
import {IStorageEngine} from './IStorageEngine';
const LOCAL_STORAGE_SECTION = "products";
class ScaleStorageEngineLocaleStorage implements IStorageEngine<Product>{

    constructor() {
        localStorage.setItem(LOCAL_STORAGE_SECTION, JSON.stringify([]));
    }

    private getArrayScalable():Array<Object> {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_SECTION)) as Array<Object> || [];
    }

    addItem(item:Product):void {
        var list:Array<Object> = this.getArrayScalable();
        list.push(item);
        localStorage.setItem(LOCAL_STORAGE_SECTION, JSON.stringify(list));
    }

    getItem(index:number):Product {
        let object:any = this.getArrayScalable()[index];
        return new Product(object.name,object.scale);
    }

    getCount():number {
        return this.getArrayScalable().length;
    }
}
export {ScaleStorageEngineLocaleStorage};