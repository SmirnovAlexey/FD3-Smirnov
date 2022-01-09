import {Apple} from './ts/Apple';
import {AppleColor} from './ts/Apple';
import {Tomato} from './ts/Tomato';
import {TomatoForm} from './ts/Tomato';
import {Scale} from './ts/Scale';

let scale:Scale=new Scale();

let apple1:Apple=new Apple("Голден", 1.25);
let apple2:Apple=new Apple("Черный принц", 2.20, AppleColor.YELLOW);
let apple3:Apple=new Apple("Ренет Симиренко", 11.40);

let tomato1:Tomato=new Tomato("Пралеска", 0.8);
let tomato2:Tomato=new Tomato("Раница", 1.1, TomatoForm.ELLIPTICAL);
let tomato3:Tomato=new Tomato("Изумруд", 5);

scale.add(apple1);
scale.add(apple3);
scale.add(tomato2);

console.log( "Продукты на весах:\n" + scale.getNameList().join(",\n") );
console.log( "Общая масса продуктов на весах: " + scale.getSumScale() + "кг.");

scale.add(apple2);
scale.add(tomato1);
scale.add(tomato3);

console.log( "Продукты на весах:\n" + scale.getNameList().join(",\n") );
console.log( "Общая масса продуктов на весах: " + scale.getSumScale() + "кг.");
