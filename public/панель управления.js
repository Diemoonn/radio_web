function openJobPromoFolder() {
    
}

function downloadSpreadsheetAsHTML() {
    requestObj = {
        path: 'public/data/timetable',
        fileName: 'spreadsheet.html'
    };

    fetch('/getTimetableHTML', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestObj)
    })
    .then(response => response.json())
    .then((data) => {
      console.log('Data on Timetable HTML page has been retrieved.');
    })
    .catch((error) => {
      console.log('An error occured: ', error);
    })   
}

function getTeachersTimetable() {
    // initial spreasheet data
    const sheetId = '16LsLzgFVKUeeratqjNDMvgfggDRZYYM7j3JNAC-82AI';
    const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
    const sheetName = 'user-data';
    const query = encodeURIComponent('Select *');
    const url = `${base}&sheet=${sheetName}&tq=${query}`;

    pathObj = {
        URL: url,
        fileToSave: 'teachersTimetable.json'
    }
    
    fetch('/updateSpreadsheet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pathObj)
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Data on Teacher timetable has been retrieved.');
    });
}

function refreshCache() {
    downloadSpreadsheetAsHTML();
    getTeachersTimetable();
}
