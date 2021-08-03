const express = require('express');
const app = express();
const port = 4200;

app.use(express.static( './'));
app.listen(port);

console.log("languaj.com  4200 started in "+new Date()+" ...");



