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

/* Server initialization */

const port = 3000; // Change this to the desired port number.
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});