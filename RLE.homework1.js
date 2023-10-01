let fs = require('fs'); //подключение модуля 'fs' для работы с файловой системой

let mode = process.argv[2]; // code or decode
let inputFile = process.argv[3]; // input file name
let outputFile = process.argv[4]; // output file name

let inText;
let count = 1;
let codeString = '';
let decodeString = '';

inText = fs.readFileSync(inputFile); 

inText = inText.toString(); //преобразование переменной в строку
console.log(inText);

if (mode === 'code') {
    for (let i = 0; i < inText.length; i++) {
        if (inText[i] === inText[i + 1]) {
            count++;
        } else {
            if (count === 1 || count < 4) {
                codeString += inText[i].repeat(count); //1 правило RLE
            } else {
            codeString += '#' + String.fromCharCode(48+count) + inText[i];
            }
            count = 1;
        }
    }
    console.log(codeString);
    const coefficentCode = inText.length / codeString.length;
    console.log('коэффицент сжатия: ' + coefficentCode);
    fs.writeFileSync(outputFile, codeString); //сохранение закодированной строки
} 

else if (mode === 'decode') {
    let i = 0;
    while (i < inText.length) {
        if (inText[i] === '#') {
            const count = Number(inText[i + 1].charCodeAt(0) - 48);
            const symbol = inText[i + 2];
            
            for (let j = 0; j < count; j++) {
                decodeString += symbol;
            }
            i += 3;
        } else {
            decodeString += inText[i];
            i++;
        }
    }
    console.log(decodeString);
    const coefficentCode = decodeString.length / inText.length;
    console.log('коэффицент сжатия: ' + coefficentCode);
    fs.writeFileSync(outputFile, decodeString);
}
