var http = require('http');

var server = http.createServer(function(req,res){
      // you can use the url method from the request object to log the url that is making the request.
      console.log('request was made: ' + req.url);

      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Hello World');
});

// we need to make sure that we are listening to a particular port for requests.
// we use the listen() method, which takes two arguments.
// The first being the port number, in this example we are using port 3000.
// The second argument being the ip address, we are using a local ip address 127.0.0.1 (local host)
// now it is listening to port 3000, so when it receives a request, it will fire the function in the createServer() method.
server.listen(3000, '127.0.0.1');
// It is a good idea to always log something after listening to a port, so you can get a confirmation that it is successfully listening to the specified port.
console.log('sanity check on port 3000.');

// HEADERS
// When we make a request to a server and when we respond. As we all responding/requesting with data, we also respond/request with headers. Similar to the head in the html page, it provides with additional information.
// The response header can have content-type, status.
