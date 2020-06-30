import {validatingName} from "./validatingName.js";
import {validatingDate} from "./validatingDate.js";
import {validatingLong} from "./validatingLong.js";
import {validatingMission} from "./validatingMission.js";

export const elementsHTML = {
    warningName: document.getElementById('warningName'),
    warningDate: document.getElementById('warningDate'),
    warningLong: document.getElementById('warningLong'),
    warningMission: document.getElementById('warningMission'),

    inputName: document.getElementById('name'),
    inputDate: document.getElementById('date'),
    inputLong: document.getElementById('long'),
    inputMission: document.getElementById('mission'),

    btn: document.getElementById('addData'),
};

elementsHTML.btn.disabled = true;

// обработчики валидации
document.addEventListener('click', function (e) {
    const targetClick = e.target;
    if (targetClick.id === 'name') {
        targetClick.oninput = function () {
            validatingName.validatorName();
        };
        targetClick.onchange = function () {
            validatingName.validatorNameEnd();
        }
    } else if (targetClick.id === 'date') {
        targetClick.onchange = function () {
            validatingDate.validatorDateEnd();
        };
    } else if (targetClick.id === 'long') {
        targetClick.oninput = function () {
            validatingLong.validatorLong();
        };
    }  else if (targetClick.id === 'mission') {
        targetClick.oninput = function () {
            validatingMission.validatorMission();
        };
        targetClick.onchange = function () {
            validatingMission.validatorMissionEnd();
        };
    }
});