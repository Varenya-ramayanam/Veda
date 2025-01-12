const express = require('express');
const connectToDB = require('./conn/db');
const app = express();
const port = 3000;

connectToDB();
 
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});  