// initial spreasheet data
const sheetId = '16LsLzgFVKUeeratqjNDMvgfggDRZYYM7j3JNAC-82AI';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'user-data';
const query = encodeURIComponent('Select *');
const url = `${base}&sheet=${sheetName}&tq=${query}`;

// data container to store general table data
const data = [];

// execute our function when the page if fully loaded
document.addEventListener('DOMContentLoaded', init);

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
    });

    document.getElementById('infoContainer').innerText += personalTimetable;
}

// fetch all the data from the spreadsheet into a DATA array
function init() {
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            // Remove additional text and extract only JSON:
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            console.log('rep: ' + rep);

            // count table's columns
            let columnNum = 0;
            jsonData.table.cols.forEach((heading) => {
                columnNum += 1;
            })

            //extract row data
            jsonData.table.rows.forEach((rowData) => {

                // initializing an empty row object and then construct a row object structure
                const row = {};
                
                // read all the current row data into a ROW array
                for (let objectIndex = 0; objectIndex < 16; objectIndex += 1) {
                    row[objectIndex] = (rowData.c[objectIndex] != null) ? rowData.c[objectIndex].v : '';
                }

                // add refined row to the general table
                data.push(row);
            })

            // ... and here we have our table fully parsed!
            console.log(data);

            processTable(data);
        })
}