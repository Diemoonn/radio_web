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
app.use(fileUpload());

app.post('/uploadImage', (req, res) => {
  if (!req.files || !req.files.image) {
      return res.status(400).send('No file was uploaded.');
  }

  const image = req.files.image;

  // Define the directory where uploaded images will be stored
  const uploadDir = path.join(__dirname, 'uploads');

  // Save the uploaded file
  image.mv(path.join(uploadDir, image.name), (err) => {
      if (err) {
          return res.status(500).send('Error uploading the image.');
      }

      res.send('Image uploaded successfully.');
  });
});

/* Server initialization */

const port = 3000; // Change this to the desired port number.
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});