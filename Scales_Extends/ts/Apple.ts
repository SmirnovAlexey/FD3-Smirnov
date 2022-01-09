import {Product} from './Product';
enum AppleColor {RED="КРАСНЫЙ", YELLOW="ЖЁЛТЫЙ", GREEN="ЗЕЛЁНЫЙ"}
class Apple extends Product {
    color:AppleColor;
    constructor(_name:string, _scale:number, _color:AppleColor = AppleColor.RED) {
        super(_name, _scale); 
        this.color = _color;
    }
    getName():string {
        return "Яблоко ".concat(this.name).concat(", цвет: " + this.color);
    }
}
export {Apple};
export {AppleColor};