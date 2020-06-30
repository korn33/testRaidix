import {elementsHTML} from "./validator.js";
import {validatingName} from "./validatingName.js";

export const validatingDate = {
    dataIsValiding: false,

    validatorDateEnd: function () {
        let date = document.getElementById('date').value;
        date = Date.parse(date);
        if ( !( (date < Date.now()) && (date > -275270400000) ) ) { // от полета Гагарина до текущей даты
            elementsHTML.warningDate.classList.add('show');
            this.dataIsValiding = false;
        } else {
            elementsHTML.warningDate.classList.remove('show');
            this.dataIsValiding = true;
        }
        if (validatingName.validingNameOnchange && validatingName.validingNameOninput && this.dataIsValiding) {
            elementsHTML.btn.disabled = false;
        } else {
            elementsHTML.btn.disabled = true;
        }
    },

};