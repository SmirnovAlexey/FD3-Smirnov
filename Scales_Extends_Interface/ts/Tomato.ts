import {Product} from './Product';
enum TomatoForm {CIRCULAR = "КРУГЛАЯ", ELLIPTICAL = "ОВАЛЬНАЯ"}
class Tomato extends Product {
    private form:TomatoForm;
    constructor(_name:string, _scale:number, _form:TomatoForm = TomatoForm.CIRCULAR) {
        super(_name, _scale); 
        this.form = _form;
    }

    getName():string {
        return "Помидор ".concat(super.getName()).concat(", форма: " + this.form);
    }
}
export {Tomato};
export {TomatoForm};
