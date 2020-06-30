import {elementsHTML} from "./validator.js";
import {validatingName} from "./validatingName.js";
import {validatingLong} from "./validatingLong.js";
import {validatingDate} from "./validatingDate.js";

export const validatingMission = {
    missionIsValiding: false,
    onlyAllowedCharacters: false,
    //mission: ,

    validatorMission: function () {
        let mission = elementsHTML.inputMission.value;
        if (mission === '') {
            console.log('строка пуста');
            this.missionIsValiding = false;
            elementsHTML.btn.disabled = true;
        }
        //проверка что не вводятся запретные символы
        const arrCodeChar = [];
        const arraySimbols = mission.split('');
        arraySimbols.forEach(function (sign) {
            arrCodeChar.push(sign.charCodeAt(0));
        });
        this.onlyAllowedCharacters = !arrCodeChar.some(function (el) { // 45 -, 46 . 95 _  пробел  32)
            return ((el < 65) || (el > 90)) && ((el < 97) || (el > 122)) && (el !== 45) && (el !== 46) && (el !== 47) && (el !== 40) && (el !== 41) && ((el < 48) || (el > 57)) && (el !== 95) && (el !== 32);
        });
        if (!this.onlyAllowedCharacters) {
            this.missionIsValiding = false;
            elementsHTML.warningMission.classList.add('show');
        }
        if (this.onlyAllowedCharacters) {
            this.missionIsValiding = true;
            elementsHTML.warningMission.classList.remove('show');
        }
        if ( validatingName.validingNameOninput && validatingDate.dataIsValiding && validatingLong.longIsValiding && this.missionIsValiding) {
            elementsHTML.btn.disabled = false;
        } else {
            elementsHTML.btn.disabled = true;
        }


    },

    validatorMissionEnd: function () {
        console.log('validatorMissionEnd');
        let mission = elementsHTML.inputMission.value;
        mission = mission.trim();
        let arrayMissionWords = mission.split(' ');
        if ((this.missionIsValiding) && (this.onlyAllowedCharacters)) {
            // делаем  с заглавной буквы
            mission = '';
            for (let i = 0; i < arrayMissionWords.length; i++) {
                if (arrayMissionWords[i].length > 0) {
                    for (let j = 0; j < arrayMissionWords[i].length; j++) {
                        if (j === 0) {
                            mission = mission + arrayMissionWords[i][j].toUpperCase();
                        } else {
                            mission = mission + arrayMissionWords[i][j].toLowerCase();
                        }
                    }
                    mission = mission + ' ';
                }
            }
            mission = mission.trim();
        }
        elementsHTML.inputMission.value = mission;

        if ( validatingName.validingNameOninput && validatingDate.dataIsValiding && validatingLong.longIsValiding && this.missionIsValiding) {
            elementsHTML.btn.disabled = false;
        } else {
            elementsHTML.btn.disabled = true;
        }
    },



};