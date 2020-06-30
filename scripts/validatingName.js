import {elementsHTML} from "./validator.js";
import {validatingDate} from "./validatingDate.js";
import {validatingLong} from "./validatingLong.js";
import {validatingMission} from "./validatingMission.js";
// import {validatingEmail} from "./validatingEmail.js";
// import {validatingPhone} from "./validatingPhone.js";

export const validatingName = {
    // spaceNameCounter: 0,
    // name: '',
    validingNameOninput: false,  //флаг что при вводе пока все ок
    onlyAllowedCharacters: false, //использование только разрешенных символов
    validingNameOnchange: false, // флаг что после ухода из поля все проверки успешны

    validatorName: function () {
        console.log('validatorName');
        // запоминаем вводимое значение
        this.name = elementsHTML.inputName.value;
        if (this.name === '') {
            console.log('строка пуста');
            this.validingNameOnchange = false;
            this.validingNameOninput = false;
            elementsHTML.btn.disabled = true;
        }
        let spaceArray = this.name.match(/ +/g); //массив, содержащий элементы-пробелы из вводимой строки
        let arrCodeChar = [];
        let str = this.name.split('');
        str.forEach(function (sign) {
            arrCodeChar.push(sign.charCodeAt(0));
        });
        // если вводится запрещенный символ, то пишется false
        this.onlyAllowedCharacters = !arrCodeChar.some(function (el) {
            return ((el < 1040) || (el > 1103)) && ((el < 65) || (el > 90)) && ((el < 97) || (el > 122)) && (el !== 32) && (el !== 45) && (el !== 46);
        });
        // включение warningName если введен не разрешенный символ
        if (!this.onlyAllowedCharacters) {
            this.validingNameOninput = false;
            elementsHTML.warningName.classList.add('show');
        }
        // не показываем warningName если стерли плохой символ или все вводимое значение
        if ((this.onlyAllowedCharacters) && (this.name)) {
            this.validingNameOninput = true; //||
            elementsHTML.warningName.classList.remove('show');
        }
        // счетчик сгруппированных пробелов, с исключением если они в начале или в конце
        // if (spaceArray !== null) {
        //     this.spaceNameCounter = spaceArray.length;
        //     if (this.name.match(/^ +\S/g)) {
        //         this.spaceNameCounter--;
        //     }
        //     if (this.name.match(/ +$/g)) {
        //         this.spaceNameCounter--;
        //     }
        // }
        // //если ввели больше трех слов, то включаем warningName
        // if (this.spaceNameCounter > 2) {
        //     this.validingNameOninput = false;
        //     elementsHTML.warningName.classList.add('show');
        //     return;
        // } else {
        //     this.validingNameOninput = true;
        // }
        // включение кнопки только если все поля валидны this.validingNameOnchange &&
        if ( this.validingNameOninput && validatingDate.dataIsValiding && validatingLong.longIsValiding  && validatingMission.missionIsValiding) {
            elementsHTML.btn.disabled = false;
        } else {
            elementsHTML.btn.disabled = true;
        }
    },

    validatorNameEnd: function () {
        console.log('validatorNameEnd');
        this.name = this.name.trim();
        let arrayName = this.name.split(' ');
        if ((this.validingNameOninput) && (this.onlyAllowedCharacters)) {
            // делаем  с заглавной буквы
            this.name = '';
            for (let i = 0; i < arrayName.length; i++) {
                if (arrayName[i].length > 0) {
                    for (let j = 0; j < arrayName[i].length; j++) {
                        if (j === 0) {
                            this.name = this.name + arrayName[i][j].toUpperCase();
                        } else {
                            this.name = this.name + arrayName[i][j].toLowerCase();
                        }
                    }
                    this.name = this.name + ' ';
                }
            }
            this.name = this.name.trim();
            this.validingNameOnchange = true;
        }
        elementsHTML.inputName.value = this.name;
    }
};