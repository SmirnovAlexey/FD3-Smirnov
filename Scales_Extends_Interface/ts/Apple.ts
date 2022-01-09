import {Product} from './Product';
enum AppleColor {RED="КРАСНЫЙ", YELLOW="ЖЁЛТЫЙ", GREEN="ЗЕЛЁНЫЙ"}
class Apple extends Product {
    private color:AppleColor;
    constructor(_name:string, _scale:number, _color:AppleColor = AppleColor.RED) {
        super(_name, _scale); 
        this.color = _color;
    }
    getName():string {
        return "Яблоко ".concat(super.getName()).concat(", цвет: " + this.color);
    }
}
export {Apple};
export {AppleColor};