import {Product} from './Product';
enum TomatoForm {CIRCULAR = "КРУГЛАЯ", ELLIPTICAL = "ОВАЛЬНАЯ"}
class Tomato extends Product {
    form:TomatoForm;
    constructor(_name:string, _scale:number, _form:TomatoForm = TomatoForm.CIRCULAR) {
        super(_name, _scale); 
        this.form = _form;
    }

    getName():string {
        return "Помидор ".concat(this.name).concat(", форма: " + this.form);
    }
}
export {Tomato};
export {TomatoForm};
