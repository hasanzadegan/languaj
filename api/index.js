const serveStatic = require('serve-static');
const express = require('express');
const bodyParser = require('body-parser');
// const jwt = require('express-jwt');

// const keys = require("./config/key");

const app = express();
const port = 80;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json({limit: '5mb', extended: true}));
app.use(express.urlencoded({limit: '5mb'}));
app.use(express.static(__dirname + '/client'));
// app.use(jwt({ secret: keys.jwt.key, algorithms: ['HS256']}).unless(
//     {path: /\//i}
//     ));

app.use(serveStatic('../', {'index': ['index.html', 'index.htm']}))
app.use(serveStatic('../role', {'index': ['index.html', 'index.htm']}))

require('./routes/security')(app);
require('./routes/base')(app);
require('./routes/course')(app);
require('./routes/dictionary')(app);
require('./routes/dictionaryTeacher')(app);
require('./routes/doc')(app);
require('./routes/lesson')(app);
require('./routes/student')(app);

app.listen(port);


console.log("languaj.com started in "+new Date()+" ...");



