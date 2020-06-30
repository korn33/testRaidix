import {elementsHTML} from "./validator.js";
import {validatingName} from "./validatingName.js";
import {validatingDate} from "./validatingDate.js";
import {validatingMission} from "./validatingMission.js";

export const validatingLong = {
    longIsValiding: false,
    onlyAllowedCharacters: false,

    validatorLong: function () {
        let long = document.getElementById('long').value;

        //обрезка пробелов
        long = long.trim();
        elementsHTML.inputLong.value = long;

        //выключение warning и кнопки при пустой строке
        if (long === '') {
            this.longIsValiding = false;
            elementsHTML.btn.disabled = true;
            elementsHTML.warningLong.classList.remove('show');
        }

        // включение warning если введен не разрешенный символ
        let arrCodeChar = [];
        let longArr = long.split('');
        longArr.forEach(function (sign) {
            arrCodeChar.push(sign.charCodeAt(0));
        });
        this.onlyAllowedCharacters = !arrCodeChar.some(function (el) {
            return ((el < 48) || (el > 57)) && (el !== 44) && (el !== 46);
        });
        if (!this.onlyAllowedCharacters) {
            this.longIsValiding = false;
            elementsHTML.warningLong.classList.add('show');
        }

        //повторения точек и запятых
        let longArrayOfCaution = [];
        longArr.forEach(function (currentValue, index) {
            if (currentValue === ',' || currentValue === '.') {
                longArrayOfCaution.push(index);
            }
        });
        let repeatingDots = false;
        longArrayOfCaution.forEach(function (currentValue, index, addressArrayOfCaution) {
            if (addressArrayOfCaution[index + 1] === currentValue + 1) {
                repeatingDots = true;
            }
        });
        if (repeatingDots) {
            validatingLong.longIsValiding = false;
            elementsHTML.warningLong.classList.add('show');
        }

        //  выключение warning если стерли ошибку
        if ((this.onlyAllowedCharacters) && long && (!repeatingDots)) {
            this.longIsValiding = true; //||
            elementsHTML.warningLong.classList.remove('show');
        }

        if ( validatingName.validingNameOninput && validatingDate.dataIsValiding && this.longIsValiding  && validatingMission.missionIsValiding) {
            elementsHTML.btn.disabled = false;
        } else {
            elementsHTML.btn.disabled = true;
        }
    },
};