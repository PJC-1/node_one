// importing the http call module from nodejs
// the http module allows nodejs to transer data over the hyper text transfer protocol (HTTP)
var http = require('http');

// create a server object
// storing that server object into a variable is a convention.
// we use the createServer() method, we need a way to deal with the requests.
// it takes a function, which takes two parameters a request object and a response object
// when ever we send a request to the server, then this function will fire.
// the request object will contain details about the request that has been made. The response object is something we ban use to send a response back to the client.
var server = http.createServer(function(req,res){
      // we use the writeHead() method to serve some information
      // the first parameter is the status code, then we pass in an object, the key is the content-type and the value is our choice of content-type, which in our exmaple is plain/text
      res.writeHead(200, {'Content-Type': 'text/plain'});
      // we use the end() method which is the end of the response and send it to the browser.
      // in the parenthesis we can send back some data. In our header we specified that we our reponse is going to be in plain/text, so it is just a string
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
