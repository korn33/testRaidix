import {elementsHTML} from "./validator.js";
import {validatingName} from "./validatingName.js";
import {validatingLong} from "./validatingLong.js";
import {validatingMission} from "./validatingMission.js";

export const validatingDate = {
    dataIsValiding: false,

    validatorDateEnd: function () {
        let date = document.getElementById('date').value;
        date = Date.parse(date);

        // проверка что от дата полета Гагарина до текущей даты
        if ( !( (date < Date.now()) && (date > -275356800000) ) ) {
            elementsHTML.warningDate.classList.add('show');
            this.dataIsValiding = false;
        } else {
            elementsHTML.warningDate.classList.remove('show');
            this.dataIsValiding = true;
        }

        if ( validatingName.validingNameOninput && this.dataIsValiding && validatingLong.longIsValiding  && validatingMission.missionIsValiding) {
            elementsHTML.btn.disabled = false;
        } else {
            elementsHTML.btn.disabled = true;
        }
    },

};