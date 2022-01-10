import {Product} from './ts/Product';
import {Scale} from './ts/Scale';
import {ScaleStorageEngineArray} from './ts/ScaleStorageEngineArray';
import {ScaleStorageEngineLocaleStorage} from './ts/ScaleStorageEngineLocaleStorage';

let scaleLocaleStorage=new Scale(ScaleStorageEngineLocaleStorage);
let scaleArray=new Scale(ScaleStorageEngineArray);

let apple1:Product=new Product("Яблоко Голден", 1.25);
let apple2:Product=new Product("Яблоко Черный принц", 2.20);
let apple3:Product=new Product("Яблоко Ренет Симиренко", 11.40);

let tomato1:Product=new Product("Томат Пралеска", 0.8);
let tomato2:Product=new Product("Томат Раница", 1.1);
let tomato3:Product=new Product("Томат Изумруд", 5);

console.log("Array storage...")
scaleArray.add(apple1);
scaleArray.add(apple3);
scaleArray.add(tomato2);

console.log( "Продукты на весах:\n" + scaleArray.getNameList().join(",\n") );
console.log( "Общая масса продуктов на весах: " + scaleArray.getSumScale() + "кг.");

scaleArray.add(apple2);
scaleArray.add(tomato1);
scaleArray.add(tomato3);

console.log( "Продукты на весах:\n" + scaleArray.getNameList().join(",\n") );
console.log( "Общая масса продуктов на весах: " + scaleArray.getSumScale() + "кг.");

console.log("Locale storage...")
scaleLocaleStorage.add(tomato1);
scaleLocaleStorage.add(apple1);
scaleLocaleStorage.add(tomato2);

console.log( "Продукты на весах:\n" + scaleLocaleStorage.getNameList().join(",\n") );
console.log( "Общая масса продуктов на весах: " + scaleLocaleStorage.getSumScale() + "кг.");

scaleLocaleStorage.add(apple2);
scaleLocaleStorage.add(tomato3);
scaleLocaleStorage.add(apple3);

console.log( "Продукты на весах:\n" + scaleLocaleStorage.getNameList().join(",\n") );
console.log( "Общая масса продуктов на весах: " + scaleLocaleStorage.getSumScale() + "кг.");
