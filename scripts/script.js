import {data} from "./data.js";

const table = document.getElementById('table');
const btn = document.getElementById('btn');



btn.addEventListener('click', function () {
    let currentTableHTML = table.innerHTML;
    let newTableBody = '';
    for (let i = 0; i<data.cosmonauts.length; i++) {
        let htmlData = getCosmonout(i);
        if (!currentTableHTML.includes(data.cosmonauts[i].name))  {
            newTableBody = newTableBody + htmlData;
        }
    }
    table.insertAdjacentHTML('beforeend', newTableBody);

});

function getCosmonout (number) {
    let isMultiple;
    if (data.cosmonauts[number].isMultiple) {
        isMultiple = 'Yes';
    } else {
        isMultiple = 'No';
    }

    let flightOfNumber   = `

<tr>
    <td>${data.cosmonauts[number].name}</td>
    <td>${data.cosmonauts[number].date}</td>
    <td>${data.cosmonauts[number].days}</td>
    <td>${data.cosmonauts[number].mission}</td>
    <td>${isMultiple}</td>
</tr>
`;
    return flightOfNumber;
}