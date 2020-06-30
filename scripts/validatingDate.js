import {elementsHTML} from "./validator.js";
import {validatingName} from "./validatingName.js";
import {validatingLong} from "./validatingLong.js";

export const validatingDate = {
    dataIsValiding: false,

    validatorDateEnd: function () {
        console.log('end change');
        let date = document.getElementById('date').value;
        date = Date.parse(date);
        if ( !( (date < Date.now()) && (date > -275270400000) ) ) { // от полета Гагарина до текущей даты
            elementsHTML.warningDate.classList.add('show');
            this.dataIsValiding = false;
        } else {
            elementsHTML.warningDate.classList.remove('show');
            this.dataIsValiding = true;
        }//validatingName.validingNameOnchange &&
        if ( validatingName.validingNameOninput && this.dataIsValiding && validatingLong.longIsValiding) {
            elementsHTML.btn.disabled = false;
        } else {
            elementsHTML.btn.disabled = true;
        }
    },

};