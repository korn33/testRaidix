import {data} from "./data.js";
import {inputCosmonaut} from "./InputCosmonaut.js";

const table = document.getElementById('table');

// вставка в таблицу данных из масива кроме тех что там уже есть
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

// получение разметки одной строки таблицы для космонавта с номером number в массиве
function getCosmonout(number) {
    let isMultiple;
    if (data.cosmonauts[number].isMultiple) {
        isMultiple = 'Yes';
    } else {
        isMultiple = 'No';
    }

    //создание уникального id для каждой строки (для удаления записей)
    let unicId = Math.random();

    //преобразование секунд в дату
    let date = String(new Date(data.cosmonauts[number].date * 1000)).slice(4, 15);

    //преобразование даты в формат "дд.мм.гггг"
    let monthWord = date.match(/\w+/);
    let month;
    switch (monthWord[0]) {
        case 'Jan':
            month = '01';
            break;
        case 'Feb':
            month = '02';
            break;
        case 'Mar':
            month = '03';
            break;
        case 'Apr':
            month = '04';
            break;
        case 'May':
            month = '05';
            break;
        case 'Jun':
            month = '06';
            break;
        case 'Jul':
            month = '07';
            break;
        case 'Aug':
            month = '08';
            break;
        case 'Sep':
            month = '09';
            break;
        case 'Oct':
            month = '10';
            break;
        case 'Nov':
            month = '11';
            break;
        case 'Dec':
            month = '12';
            break;
        default:
            month = monthWord;
    }
    let day = date.match(/\d+/);
    let year = date.slice(-4);

    //создание разметки
    let flightOfNumber = `

        <tr id="idString_${unicId}">
            <td>${data.cosmonauts[number].name}</td>
            <td>${day + '.' + month + '.' + year}</td>
            <td>${data.cosmonauts[number].days}</td>
            <td>${data.cosmonauts[number].mission}</td>
            <td>${isMultiple}</td>
            <td><button id="deleteData_${unicId}">Удалить</button></td>
        </tr>
    `;
    return flightOfNumber;
}

getTable();

//кнопка с вызовом функции добавления космонавта из формы в таблицу
const addData = document.getElementById('addData');
addData.addEventListener('click', function () {
    inputCosmonaut.safeCosmonaut(event);
});

// если клик по элементу с id начинаюшемся на "deleteData"
table.addEventListener('click', function (e) {
    const targetClick = e.target;
    if (targetClick.id.match(/^deleteData/)) {
        //определяем UnicId строки, которой управляет нажатая кнопка
        let currentUnicId = targetClick.id.slice(11);

        //находим имя удаляемого космонавта
        let currentString = document.getElementById(`idString_${currentUnicId}`);
        let currentName = currentString.querySelector('td').innerHTML;

        //удаляем его из массива
        data.cosmonauts.forEach(function (itemCosmonaut, index) {
            if (itemCosmonaut.name === currentName) {
                data.cosmonauts.splice(index, 1)
            }
        });

        //стираем таблицу и рисуем заного из масиива
        table.innerHTML = '';
        table.innerHTML = `<tr>
                <th>Космонавт</th>
                <th>Дата первого полета</th>
                <th>Длительность миссии, дней</th>
                <th>Название миссии</th>
                <th>Повторные полеты</th>
                <th>Управление данными</th>
            </tr>`;
        getTable();
    }
});