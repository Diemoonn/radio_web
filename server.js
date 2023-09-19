const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

/* Logic */



/* Server stuff */

const port = 3000; // Change this to the desired port number.
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});