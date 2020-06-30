import {data} from "./data.js";
import {getTable} from "./script.js";
import {elementsHTML} from "./validator.js";
import {validatingName} from "./validatingName.js";
import {validatingDate} from "./validatingDate.js";
import {validatingLong} from "./validatingLong.js";
import {validatingMission} from "./validatingMission.js";

export const inputCosmonaut = {
    //конструктор новой записи
    GiveCosmonautObject: function (name, date, long, mission, repeatFlight) {
        this.name = name;
        this.date = Date.parse(date) / 1000;
        this.days = long;
        this.mission = mission;
        this.isMultiple = repeatFlight;
    },

    //запись в массив нового космонавта
    safeCosmonaut: function (event) {
        event.preventDefault();

        let name = document.getElementById('name').value;
        let date = document.getElementById('date').value;
        let long = document.getElementById('long').value;
        let mission = document.getElementById('mission').value;
        let repeatFlight;
        if (document.getElementById('repeatFlight').checked) {
            repeatFlight = true;
        } else {
            repeatFlight = false;
        }

        data.cosmonauts.push(new this.GiveCosmonautObject(name, date, long, mission, repeatFlight));

        getTable(); // добавление его в таблицу

        //обнуление параметров валидации и полей формы
        document.getElementById('name').value = '';
        document.getElementById('date').value = '';
        document.getElementById('long').value = '';
        document.getElementById('mission').value = '';
        document.getElementById('repeatFlight').checked = false;

        elementsHTML.btn.disabled = true;

        validatingName.validingNameOninput = false;
        validatingDate.dataIsValiding = false;
        validatingLong.longIsValiding = false;
        validatingMission.missionIsValiding = false;
    }
};