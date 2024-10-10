function back() {
    location.href = "index.html";
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
      // do nothing if success
    })
    .catch((error) => {
      console.log('An error occured: ', error);
    })   
}
  
  