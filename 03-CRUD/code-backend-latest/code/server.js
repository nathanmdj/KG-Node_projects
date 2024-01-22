var http = require('http');

//create a server object:
http.createServer(function (req, res) {
  
    res.setHeader('Content-Type', 'application/json');
  
  const jsonObject = {
    message: 'Hello, Node.js',
    date: new Date()
  }
  const jsonStringObj = JSON.stringify(jsonObject);

  res.end(jsonStringObj);


}).listen(8080);

console.log('server is running');
