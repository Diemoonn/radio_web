/* import required server libs */

const express = require('express');
const path = require('path');

const app = express();

/* Serve static files from the public directory */

app.use(express.static(path.join(__dirname, 'public')));

/* Logic */

// DOCX parser
app.use(express.json());

const mammoth = require('mammoth');

app.post('/parseDocx', (req, res) => {
  const docxPath = req.body.DOCXPath;

  mammoth.convertToHtml({ path: docxPath })
    .then((result) => {
      const content = result.value;
      res.json({ content });
    })
    .catch((error) => {
      console.error('Error converting file:', error);
      res.status(500).json({ error: 'Error converting file' });
    });
});

// Images parser
const fs = require('fs');

app.post('/parseImage', (req, res) => {
  const imagePath = req.body.imageFolder;

  fs.readdir(imagePath, (err, filenames) => {
    if (err) {
      console.error('Error reading image filenames:', err);
      res.status(500).send('Error reading image filenames');
    } else {
      const imageFilenames = filenames.filter((filename) =>
        ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(filename).toLowerCase())
      );
      res.json(imageFilenames);
    }
  });
});

// Images uploader

const fileUpload = require('express-fileupload');
app.use(fileUpload({
  limits: {
    fileSize: 10000000, // Around 10MB
  },
  abortOnLimit: true,
}));

app.post('/uploadImage', (req, res) => {
  // Get the file that was set to our field named "image"
  const { image } = req.files;

  // If no image submitted, exit
  if (!image) return res.sendStatus(400);

  // Move the uploaded image to our upload folder
  image.mv(__dirname + '/public/images/job/promo/' + image.name);

  // Do nothing if success
  res.sendStatus(304);
});

// Google spreadsheet parser-saver

app.post('/updateSpreadsheet', (request, response) => {
  // spreadsheet's url
  const url = request.body.URL;
  const fileToSave = request.body.fileToSave;

  // data container to store refined table data
  const refinedTable = [];

  // if the internet connection is ok then update an existing JSON file
  fetch(url)
    .then(res => res.text())
    .then(rep => {
      // Remove additional text and extract JSON only:
      const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
      
      // count table's columns
      let columnNum = 0;
      jsonData.table.cols.forEach(() => {
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
        refinedTable.push(row);
      })

      // save the refined version of parsed table as a JSON
      refinedTableStringify = JSON.stringify(refinedTable);

      fs.writeFile('public/data/infoTeachers/' + fileToSave, refinedTableStringify, 'utf8', (err) => {
        if (err) {
          console.log("An error occured while writing JSON Object to File: ", fileToSave);
          return console.log(err);
        }

        console.log("JSON file has been saved successfully as ", fileToSave);
      })

      // ... and here we have our table fully parsed!
      response.json(refinedTable);
    })
});

// more relatable is to use only this response to get access to the parsed spreadsheet
app.post('/getSpreadsheet', (req, res) => {
  const spreadsheetPath = req.body.URL;
  let spreadsheetData;
    
  fs.readFile(spreadsheetPath, (err, data) => {
    if (err) throw err;

    spreadsheetData = JSON.parse(data);

    res.json(spreadsheetData);
  });  
});

/* Server initialization */

const port = 3000; // Change this to the desired port number.
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});