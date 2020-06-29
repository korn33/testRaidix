import {data} from "./data.js";
import {getTable} from "./script.js";

export const inputCosmonaut = {

    GiveCosmonautObject: function (name, date, long, mission, repeatFlight) {
        this.name = name;
        this.date = Date.parse(date) / 1000;
        this.days = long;
        this.mission = mission;
        this.isMultiple = repeatFlight;
    },

    safeCosmonaut: function (event) {
        event.preventDefault();
        let name = document.getElementById('name').value;

        let date = document.getElementById('date').value;
        date = Date.parse(date);
        if (date > Date.now()) {
            console.log('qwerty')
        }
        let long = document.getElementById('long').value;
        let mission = document.getElementById('mission').value;
        let repeatFlight;
        if (document.getElementById('repeatFlight').checked) {
            repeatFlight = true;
        } else {
            repeatFlight = false;
        }

        data.cosmonauts.push(new this.GiveCosmonautObject(name, date, long, mission, repeatFlight));

        getTable();

        document.getElementById('name').value = '';
        document.getElementById('date').value = '';
        document.getElementById('long').value = '';
        document.getElementById('mission').value = '';
        document.getElementById('repeatFlight').checked = false;
    }
};