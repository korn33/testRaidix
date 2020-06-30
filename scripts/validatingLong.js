import {elementsHTML} from "./validator.js";
import {validatingName} from "./validatingName.js";
import {validatingDate} from "./validatingDate.js";

export const validatingLong = {
    longIsValiding: false,
    onlyAllowedCharacters: false,

    validatorLong: function () {
        let long = document.getElementById('long').value;
        long = long.trim();
        elementsHTML.inputLong.value = long;
        console.log('long', long);
        if (long === '') {
            console.log('строка пуста');
            this.longIsValiding = false;
            elementsHTML.btn.disabled = true;
            elementsHTML.warningLong.classList.remove('show');
        }
        let arrCodeChar = [];
        let longArr = long.split('');
        console.log('str',longArr);
        longArr.forEach(function (sign) {
            arrCodeChar.push(sign.charCodeAt(0));
        });
        console.log('arrCodeChar',arrCodeChar);
        this.onlyAllowedCharacters = !arrCodeChar.some(function (el) {
            return ((el < 48) || (el > 57)) && (el !== 44) && (el !== 46);
        });
        // включение warningName если введен не разрешенный символ
        if (!this.onlyAllowedCharacters) {
            this.longIsValiding = false;
            elementsHTML.warningLong.classList.add('show');
        }

        //повторения
        let longArrayOfCaution = [];
        longArr.forEach(function (currentValue, index) {
            if (currentValue === ',' || currentValue === '.') {
                longArrayOfCaution.push(index);
            }
        });
        let repeatingDots = false;
        console.log('longArrayOfCaution', longArrayOfCaution);
        longArrayOfCaution.forEach(function (currentValue, index, addressArrayOfCaution) {
            if (addressArrayOfCaution[index + 1] === currentValue + 1) {
                repeatingDots = true;

            }
        });
        console.log('repeatingDots', repeatingDots);
        if (repeatingDots) {
            validatingLong.longIsValiding = false;
            elementsHTML.warningLong.classList.add('show');
        }


        // не показываем warningName если стерли плохой символ или все вводимое значение
        if ((this.onlyAllowedCharacters) && long && (!repeatingDots)) {
            this.longIsValiding = true; //||
            elementsHTML.warningLong.classList.remove('show');
        }
        if ( validatingName.validingNameOninput && validatingDate.dataIsValiding && this.longIsValiding) {
            elementsHTML.btn.disabled = false;
        } else {
            elementsHTML.btn.disabled = true;
        }
    },

};