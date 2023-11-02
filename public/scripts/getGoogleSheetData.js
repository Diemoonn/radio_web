// initial spreasheet data
const sheetId = '16LsLzgFVKUeeratqjNDMvgfggDRZYYM7j3JNAC-82AI';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'user-data';
const query = encodeURIComponent('Select *');
const url = `${base}&sheet=${sheetName}&tq=${query}`;

const tablePath = 'public/data/infoTeachers/teachersTimetable.json';

// data container to store general table data
const data = [];

// fetch personal days for a current teacher
function processTable(table) {
    const targetId = localStorage.getItem('targetId');

    let personalTimetable = "\n";

    let rowCount = 0;
    table.forEach((row) => {
        // proceed days of the week
        if (row[targetId] && row[0] && rowCount != 7) {
            personalTimetable += row[0] + ', ' + row[targetId] + '\n';
        }
        
        // proceed optional days
        if (rowCount === 7 && row[targetId]) {
            personalTimetable += row[targetId];
        }

        rowCount += 1;

        console.log('at step ', rowCount, ' personalTimetable is ', personalTimetable);
    });

    document.getElementById('infoContainer').innerText += personalTimetable;
}

function init() {
    pathObj = {
        URL: tablePath
    }
    
    fetch('/getSpreadsheet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pathObj)
    })
    .then((response) => response.json())
    .then((data) => {
        processTable(data);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(init, 100);
});