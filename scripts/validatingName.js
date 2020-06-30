import {elementsHTML} from "./validator.js";
import {validatingDate} from "./validatingDate.js";
import {validatingLong} from "./validatingLong.js";
import {validatingMission} from "./validatingMission.js";

export const validatingName = {
    name: '',
    validingNameOninput: false,  //флаг что при вводе пока все ок
    onlyAllowedCharacters: false, //использование только разрешенных символов
    //validingNameOnchange: false, // флаг что после ухода из поля все проверки успешны

    validatorName: function () {
        this.name = elementsHTML.inputName.value;
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
        if (this.name === '') {
            this.validingNameOninput = false;
            elementsHTML.btn.disabled = true;
            elementsHTML.warningName.classList.remove('show');
        }
        if ((this.onlyAllowedCharacters) && (this.name)) {
            this.validingNameOninput = true;
            elementsHTML.warningName.classList.remove('show');
        }

        if ( this.validingNameOninput && validatingDate.dataIsValiding && validatingLong.longIsValiding  && validatingMission.missionIsValiding) {
            elementsHTML.btn.disabled = false;
        } else {
            elementsHTML.btn.disabled = true;
        }
    },

    // делаем  с заглавной буквы
    validatorNameEnd: function () {
        this.name = this.name.trim();
        let arrayName = this.name.split(' ');
        if ((this.validingNameOninput) && (this.onlyAllowedCharacters)) {
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
        }
        elementsHTML.inputName.value = this.name;
    }
};