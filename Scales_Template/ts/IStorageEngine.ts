interface IStorageEngine<Item> {
    addItem(item:Item):void;
    getItem(index:number):Item;
    getCount():number;
}
export {IStorageEngine};