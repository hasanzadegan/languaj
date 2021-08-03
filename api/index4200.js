var http = require('http');

http.createServer(function (req, res) {
    res.write("<a href='/web'>old site</a>");
    res.end(); //end the response
}).listen(4200); //the server object listens on port 8080
