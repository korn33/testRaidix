import {elementsHTML} from "./validator.js";

export const validatingDate = {
    date: document.getElementById('date').value,

    validatorDateEnd: function () {
        console.log('validatorDateEnd');
        console.log(this.date / 1000);
        this.date = Date.parse(this.date);
        console.log(this.date);
        console.log(Date.now());
        if ( (this.date > Date.now()) && (Date.parse(this.date) < -275270400000) ) {
            console.log((Date.parse(this.date) < -275270400000));
            elementsHTML.warningDate.classList.add('show');
        } else {
            elementsHTML.warningDate.classList.remove('show');
        }
    },

};