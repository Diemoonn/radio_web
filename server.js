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

/* Server initialization */

const port = 3000; // Change this to the desired port number.
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});