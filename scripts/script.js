import {data} from "./data.js";
import {inputCosmonaut} from "./InputCosmonaut.js";

const table = document.getElementById('table');


export function getTable() {
    let currentTableHTML = table.innerHTML;
    let newTableBody = '';
    for (let i = 0; i < data.cosmonauts.length; i++) {
        let htmlData = getCosmonout(i);
        if (!currentTableHTML.includes(data.cosmonauts[i].name)) {
            newTableBody = newTableBody + htmlData;
        }
    }
    table.insertAdjacentHTML('beforeend', newTableBody);
}

function getCosmonout(number) {
    let isMultiple;
    if (data.cosmonauts[number].isMultiple) {
        isMultiple = 'Yes';
    } else {
        isMultiple = 'No';
    }
    let unicId = Math.random();
    let date = String(new Date(data.cosmonauts[number].date*1000)).slice(4, 15);
    if (date === 'lid Date') {
        date = 'Неизвестно';
    }
    let flightOfNumber = `

        <tr id="idString_${unicId}">
            <td>${data.cosmonauts[number].name}</td>
            <td>${date}</td>
            <td>${data.cosmonauts[number].days}</td>
            <td>${data.cosmonauts[number].mission}</td>
            <td>${isMultiple}</td>
            <td><button id="deleteData_${unicId}">Удалить</button></td>
        </tr>
    `;
    return flightOfNumber;
}

getTable();

const addData = document.getElementById('addData');

addData.addEventListener('click', function () {
    inputCosmonaut.safeCosmonaut(event);
});

document.addEventListener('click', function (e) {
    const targetClick = e.target;
    if (targetClick.id.match(/^deleteData/)) {

        let currentUnicId = targetClick.id.slice(11);

        let currentString = document.getElementById(`idString_${currentUnicId}`);
        let currentName = currentString.querySelector('td').innerHTML;
        data.cosmonauts.forEach(function (itemCosmonaut, index) {
            if (itemCosmonaut.name === currentName) {
                data.cosmonauts.splice(index, 1)
            }
        });
    }
    table.innerHTML = '';
    table.innerHTML = `<tr>
                <th>Космонавт</th>
                <th>Дата первого полета</th>
                <th>Длительность миссии</th>
                <th>Название миссии</th>
                <th>Повторные полеты</th>
                <th>Управление данными</th>
            </tr>`;
    getTable();
});