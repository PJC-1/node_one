Learning about node.js by following along The Net Ninja's Node JS Tutorial for Beginners.
https://www.youtube.com/watch?v=w-7RQ46RgxU&list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp

ATTENTION: These are just notes I'm taking while following along, If I have time I will come back and polish up the notes with proper markup, but I recommend checking out the tutorial yourself, it's really good!

The global object is available to the user.
Some examples of what is available with the global object are:
- console.log
- setTimeout and setInterval

Node can tell us where we are or what file we are in with these helpful methods from the global object.
- __dirname
- __filename

A common pattern that we see often in node.js is the function expression, example:

var sayBye = function(){
    console.log('bye');
};

sayBye();

output => bye

Note: that in this example we are creating the variable sayBye and storing an anonymous function that logs the string bye when invoked. You will notice that to invoke this function we call sayBye with parenthesis.

Another example of a common pattern in node.js with a function expression:

function callFunction(fun){
    fun();
}

var sayBye = function(){
    console.log('bye');
};

callFunction(sayBye);

output => bye

Modules

Modules are basically different (separate) javascript files. The general idea is to logically separate the code to make it easier to maintain and use.

The require method is from the global object and is used to include (import) a module.
example:

app.js

var counter = require('./count.js')

console.log(counter(['sherry', 'phill', 'max', 'sheila']));


count.js

var counter = function(arr){
    return 'There are ' + arr.length + ' elements in this array';
};

module.exports = counter;

- Use the require() where you would like to include some functionality from another module.
- You need to export what functionality you want from the module out to make it available via require().
- In the count.js file we use module.exports to return the counter variable, in other words we want to be able to utilize the counter variable outside the modules.
- We then create the variable counter in app.js which is requiring the count.js file, which in return is exporting the counter variable, which makes the counter variable's anonymous function available in the app.js file.

ES6 syntactic sugar:
- You can now interpolate javascript expression directly into a string by using the back-tick symbols instead of quotes, this enables you to interpolate javascript into the string by adding a ${<YOUR JAVASCRIPT EXPRESSION>}

Another expample requiring modules:

app.js

var stuff = require('./stuff');

console.log(stuff.counter(['sherry', 'phill', 'max', 'sheila']));
console.log(stuff.adder(5, 6));
console.log(stuff.adder(stuff.pi, 5));

stuff.js

var counter = function(arr){
    return 'There are ' + arr.length + ' elements in this array';
};

var adder = function(a,b){
    return `The sum of these two numbers is ${a + b}`;
};

var pi = 3.142;

module.exports.counter = counter;
module.exports.adder = adder;
module.exports.pi = pi;

- In this example we have the module stuff.js, which has three variables that we want to export to be available outside the module.
- We export the variables by adding them as key-values to the module.exports object.
- In the app.js file we are requiring the stuff.js module and storing that in the variable stuff (is is actually module.exports).
- So when we are using the variables available to us by module.exports we have to reference the module.exports object as stuff. In other words, if we wanted to use the variable pi, we would have to reference it as stuff.pi

You can also use the object literal notation with module.exports, example:

stuff.js

var counter = function(arr){
    return 'There are ' + arr.length + ' elements in this array';
};

var adder = function(a,b){
    return `The sum of these two numbers is ${a + b}`;
};

var pi = 3.142;

module.exports = {
    counter :  counter,
    adder   :  adder,
    pi      :  pi
};


Built-in call modules that are available with node.js out of the box.
example: events modules.

- We use the require method similarly to how we imported a custom module. So to fetch a call module you would use this syntax:

var events = require('events');

- One thing returned from the events modules is the EventEmitter class, used for creating custom events and we then can react to those events when they are emitted.
- We can store a new EventEmitter object into the var myEmitter
EventEmitter is a node class, which is a constructor. We can now wire up events to myEmitter. example:

stuff.js

var events = require('events');

var myEmitter = new events.EventEmitter();

- The .on method is from the node EventEmitter class and is used to bind event handlers to events by their string name.
- Node.js is event based similar to that of jquery, so in node you usually bind functions to listen to events.
- In this example we use the .on method and bind that to an event we have created named 'someEvent', when this 'someEvent' emits (occurs) we want it to do something and
that is defined by the second argument as a callback function (in our example we are using an anonymous function).
- We are allowed to pass through a parameter(s) into the callback function. In this example when the event happens, it fires the anonymous function which logs a message, example:

stuff.js

var events = require('events');

var myEmitter = new events.EventEmitter();

myEmitter.on('someEvent', function(mssg){
    console.log(mssg);
});

- We use the method .emit to manually emit an event.
- The .emit method allows you to manually invoke the event, which causes the callback registered to the event to be called.
- In our example we are emitting our 'someEvent' event and the anonymous callback function is invoked, the second argument in the method is the mssg, so the string that passed into the callback to log the message.
- The basic structure is the first argument is the event and all arguments after are parameters passed into the function. example:

var events = require('events');

var myEmitter = new events.EventEmitter();

myEmitter.on('someEvent', function(mssg){
    console.log(mssg);
});

myEmitter.emit('someEvent', 'the event was emitted');

Another useful call module available through node.js is the "util" module.
The util module is used to inherit from other object built into node.js.
example:

public/app.js

var events = require('events');

var util = require('util');

In this example we are going to create a new object constructor named Person, and every time a new person is created we will pass in a name and set a key of name to equal name.

example:

public/app.js

var events = require('events');

var util = require('util');

var Person = function(name){
    this.name = name;
}

Next, we will utilize the 'util' module that we required in order to inherit the EventEmitter(). In other words we want each person to inherit the EventEmitter() so that they can bind custom events to the person object. The .inherits() takes to arguments, the first being who/what will be doing the inheriting, in our example this will be Person. And the second argument will be what is being inherited, in our example the events.EventEmitter is what we want to be inherited. example:

public/app.js

var events = require('events');
var util = require('util');

var Person = function(name){
    this.name = name;
}

util.inherits(Person, events.EventEmitter);

After Person inherits the ability to listen to custom events. We can now create some people. If we take a look at our constructor object, when we create a new person we pass in a string which will be their name. After create a few different people store those people in an array. example:

public/app.js

var events = require('events');
var util = require('util');

var Person = function(name){
    this.name = name;
}

util.inherits(Person, events.EventEmitter);

var phill = new Person('phill');
var sherry = new Person('sherry');
var sheila = new Person('sheila');
var max = new Person('max');

var people = [phill, sheery, sheila, max];

Next, we can use the javascript forEach method to loop over the different items in the people array. We will execute an anonymous function that takes each person and binds the custom event 'speak' and defines a callback that will take in a message and log the person's name and the message passed into the callback. example:

public/app.js

var events = require('events');
var util = require('util');

var Person = function(name){
    this.name = name;
}

util.inherits(Person, events.EventEmitter);

var phill = new Person('phill');
var sherry = new Person('sherry');
var sheila = new Person('sheila');
var max = new Person('max');

var people = [phill, sherry, sheila, max];

people.forEach(function(person){
  person.on('speak',function(mssg){
      console.log(person.name + ' said: ' + mssg);
  });
});

Finally, you can use the .emit() to manually emit the custom event 'speak' and pass a message as an argument to the callback function. example:

public/app.js

var events = require('events');
var util = require('util');

var Person = function(name){
    this.name = name;
}

util.inherits(Person, events.EventEmitter);

var phill = new Person('phill');
var sherry = new Person('sherry');
var sheila = new Person('sheila');
var max = new Person('max');

var people = [phill, sherry, sheila, max];

people.forEach(function(person){
    person.on('speak', function(mssg){
        console.log(person.name + ' said: ' + mssg);
    });
});

phill.emit('speak','hello world');
sherry.emit('speak','hi there');
sheila.emit('speak','bow');
max.emit('speak','wow');

output=>
phill said: hellow world
sherry said: hi there
sheila said: bow
max said: wow


fs module
The fs module stands for File System and is a call module available from node.js. In out example we are using it to read and write files. Here is a link to the node.js documentation regarding the file system module:

https://nodejs.org/api/fs.html

Like we have before, to import the module we use the require method and store this in a variable, with the convention of naming the variable by the name of the module. example:

app.js

var fs = require('fs');

Use the readFileSync() method to read a file that you specify as a parameter. This example will use the synchronous version of the method, which means that it will complete one operation to completion before moving on to the next. The readFileSync() method takes to parameters. The first being the file path to the file you want to read. And the second being the character encoding that will be used to convert the binary into the specified code. In this case we are using 'utf8'. example:

app.js

var fs = require('fs');

var readMe = fs.readFileSync('readMe.txt', 'utf8');

console.log(readMe);

Running the module above will output the content of the 'readMe.txt' file.

Next, we can use the writeFileSync method to write a file. This method also takes two arguments. The first is the name and path to the file you would like to write to. The second being what you would like to write to the file. In out example we will be creating a file named 'writeMe.txt' and we will write the content of the 'readMe.txt' file to the new file. example:

app.js

var fs = require('fs');

var readMe = fs.readFileSync('readMe.txt', 'utf8');

fs.writeFileSync('writeMe.txt', readMe);

running this code will create a file named "writeMe.txt" in the same directory as the app.js filled with the context of the "readMe.txt" file.

The asynchronous versions to these methods are readFile() and writeFile(). The readFile() method has a third parameter that is required, it is a callback function for when it is finished reading the file. This callback function takes two arguments. The first being an error for if there is an error reading the file and the second being the data we retrived from reading the file. The writeFile() method still takes the same two parameters, the file you are going to write and the second being what you are going to write to the file. example:

app.js

var fs = require('fs');

fs.readFile('readMe.txt', 'urf8', function(err,data){
    fs.writeFile('writeMe.txt',data);
})

The above example will output the contents of the 'readMe.txt' file into a file named 'writeMe.txt' in the same directory. The only different is this is completely asynchronous, and would allow for other code to be ran while the operations of reading and writing the file were going on.

The file system call module also has many other built-in methods and functionality. One example is the unlink() method, which is used to delete files, it takes an argument that is a file name/path of what you want to delete. example:

app.js

var fs = require('fs');

fs.unlink('writeMe.txt');

Running this module will delete the writeMe.txt file which is in the same directory as the app.js
Remember that if you run this module and the file that you have passed into the method does not exist or is not the correct path, it will throw an error say no such file or directory.

To create a directory you would use the file system call modules mkdirSync() method, this is the synchronous version of the method. This method takes a parameter, which is the name/path of the directory you would like to create. In our example we are creating a directory named 'stuff' inside the public directory.

public/app.js

var fs = require('fs');

fs.mkdirSync('stuff');

To delete a directory you can use the rmdirSync() method from the file system call module. This is the synchronous version of the method. It takes one argument, which is the directory name/path that you wish to delete. In our example we are deleting the directory stuff that is inside the public directory. exmaple:

public/app.js

var fs = require('fs');

fs.rmdirSync('stuff');

Now we can use the asynchronous versions of these methods. In out example we will use the mkdir(), which you will notice takes a callback function as the second parameter. Then after the stuff directory is created it will then read the readMe.txt file and once reading of the readMe.txt file is complete it will fire the callback function which will write the data we retrived from the readMe.txt file and write that to the writeMe.txt file inside the stuff folder. example:

public/app.js

var fs = require('fs');

fs.mkdir('stuff', function(){
    fs.readFile('readMe.txt', 'utf8', function(err,data){
        fs.writeFile('stuff/writeMe.txt',data);
    });
});


Note: that if you attempt to delete a directory that is not empty by means of using the rmdir() method, it will throw an error: directory not empty. You can use the unlink() to first delete all files inside the directory and then in the callback function you can use the rmdir() to delete the empty directory. example:
public/app.js

var fs = require(fs);

fs.unlink('stuff/writeMe.txt', function(){
    fs.rmdir('stuff');
});


Running this module will delete the writeMe.txt file and then delete the stuff directory.


Clients and Servers:

When we go to a website, we are view this webpage in the browser like chrome. Sometimes we might do something, like ask for some data. In this case the client will make a request to the server and the server will send a response. Via a protocol, which is described as a set of communication rules, that two sides agree to use when communicating.

So each computer/server can be identified by their own IP address, to make a request the client will have to connect to the server's IP address. They will open up what is known as a socket between the two computers, which is basically a channel that information can be sent. The information is structured via different protocols (ftp, http, etc). Depending on what the client is trying to communicate with the server, they will use a different protocol to structure the data/information.
Examples of different protocols:
- FTP => File Transfer protocol
- HTTP => used for websites

Once the information's structure has been decided, for example http, the information is sent down the socket through between the two computers through a protocol named TCP. So even though the data is structured in terms of a protocol, the data is sent from the server to the client through the TCP protocol.

This splits up the data, into small little sections called packets. All of this functionality is built-in to our computers and nodejs gives us the ability to access this functionality. To open a connection bewteen two computers and send information between them. So if we run nodejs on the server, we can tell node what information we want to send to the client when they make a particular requests.

Ports:
- A program running on a computer can listen for requests sent to a particular port number
- example: 172.24.86.76:3000, this is an IP address on port 3000.

HTTP:
- The http module allows nodejs to transfer data over the hyper text transfer protocol (HTTP).
- example importing the http call module:
app.js

var http = require('http');

- Then we create the server object, we can use a convention to store that server object into a variable.
- We use the createServer() method. We pass in a function as a way to deal with the requests made by the client. This function takes in two parameters.
- The first being the request object and the second is the response object.
- Whenever we send a request to the server, then this function will fire.
- The request object will contain details about the request that has been made. The response object is something we can use to send a response back to the client.
- example:

var http = require('http');

var server = http.createServer(function(req,res){

});

- We use the writeHead() method to serve some information about the response.
- The first parameter is the status code, then we pass in an object, where the key is content-type and the value of that key is the specific content-type for this response.
- exmaple:

var http = require('http');

var server = http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
});


- We use the end() method which is the end of the response and send it to the browser.
- We pass in the data we want to send back to the client. In our header we specified that our response is of the content-type "text/plain", so for our example we simply pass in a string to the end() method.
- example:

var http = require('http');

var server = http.createServer(function(req, res){
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello World");
});

- At this point, if the client were to make a request it would not be able to work because we are not yet listening on a port. So we need to make sure that we are listening to a particular port for requests.
- We use the listen() method, which takes two arguments.
- The first being the port number, in this example we are using port 3000.
- The second argument being the ip address, we are using a local ip address (127.0.0.1)
- It is a good idea to always log something after listening to a port, so you can get a confirmation that it is successfully listening to the specified port.
- example:

public/app.js

var http = require('http');

var server = http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World');
});

server.listen(3000, '127.0.0.1');

- One thing we can do is make use of the url property from the request object, in order to log the url that is making the request.
- example:

var http = require('http');

var server = http.createServer(function(req,res){
      console.log('request was make: ' + req.url);

      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Hello World');
});

server.listen(3000, '127.0.0.1');

console.log('You are now listening on port 3000.');


Streams and Buffers

Buffers

- Temporary storage spot for a chunk of data that is being transferred from one place to another.
- The buffer is filled with data, then passed along.
- Transfer small chunks of data at a time.

Stream
- A stream of data that flows over time, from one place to another.
-From the Data Source, transfering small chunks of data until the buffer is filled, then the buffer is passed down the stream to be processed and sent to the client.

- An example of buffers and streams is streaming a movie or video online. The full movie is the complete data source. Instead of waiting a really long time for the entire movie to load we can start watching once the first buffer has been processed for the client.

Streams in Node.js
- The main idea is that Nodejs can make use of Streams to transfer data.
- This can increase performance.


Readable Streams
- Writable streams: Allow node js to write data to a stream.
- Readable streams: Allow node js to read data from a stream.
- Duplex: Can read and write to a stream.

To get started creating our own stream we need to require the File System module from node.js
- example:

var http = require('http');
var fs = require('fs');


- To create a read steam, we need to use a method from the file system module called createReadStream()
- example:

var http = require('http');
var fs = require('fs');

var myReadStream = fs.createReadStream()


- We need to specify to node.js which file to read through the stream, using the __dirname property on the global object to get the current directory (public) and then concatenate that with the file name ('/readMe.txt')
- What is going to happen is node will find the data source (file) and then read the file, a small amount at a time, and store that buffer in the variable myReadStream. It will continue this process until the entire file is processed.
- example:

var http = require('http');
var fs = require('fs');

var myReadStream = fs.createReadStream(__dirname + '/readMe.txt');


- What we can do is recognize when we have received one chunk of data, in other words the first piece that comes back to us.
- We are able to do this because the createReadStream inherits from the EventEmitter, there is an event called Data on the createReadStream which allows us to listen for when we receive any kind of data from the stream.
- Next we will set up a listener that will listen for data coming from the stream and fire a function every time we receive something.
- We use the .on method on our defined myReadStream variable.
- example:

var http = require('http');
var fs = require('fs');

var myReadStream = fs.createReadStream(__dirname + '/readMe.txt');

myReadStream.on();

- And pass in the event 'data' and fire back a function every time we receive some data, this data we will label/pass into this function as a chunk.
- example:

var http = require('http');
var fs = require('fs');

var myReadStream = fs.createReadStream(__dirname + '/readMe.txt');

myReadStream.on('data', function(chunk){});


- What we can do now is log when we receive a chunk of data, in other words when the 'data' event occurs.
- We can also do another log which logs the actual data, or chunk as we have specified in the callback function.
- example:

var http = require('http');
var fs = require('fs');

var myReadStream = fs.createReadStream(__dirname + '/readMe.txt');

myReadStream.on('data', function(chunk){
    console.log('new chunch received:');
    console.log(chunk);
});

- If we run this in the terminal then what we will see is the actual buffer.
- example output:

Phills-MacBook-Pro:one PJC$ cd public/
Phills-MacBook-Pro:public PJC$ node app
new chunch received:
<Buffer 4c 6f 72 65 6d 20 69 70 73 75 6d 20 64 6f 6c 6f 72 20 73 69 74 20 61 6d 65 74 2c 20 63 6f 6e 73 65 63 74 65 74 75 72 20 61 64 69 70 69 73 63 69 6e 67 ... >
new chunch received:
<Buffer 65 6e 74 65 73 71 75 65 20 6a 75 73 74 6f 20 69 70 73 75 6d 2c 20 61 75 63 74 6f 72 20 73 65 64 20 6c 69 62 65 72 6f 20 61 2c 20 73 6f 64 61 6c 65 73 ... >
Phills-MacBook-Pro:public PJC$


- From the output we can see that we received two different chunks from the file.
- If the file was much larger, then could see even more chunks (buffers).
- What you can notice is that what is being logged is the actuall buffer instead of the text from the file. That is because in the createReadStream method we did not specify the character encoding.
- We can enclude the character encoding, utf8 as the second parameter in the createReadStream method.
- example:

var http = require('http');
var fs = require('fs');

var myReadStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');

myReadStream.on('data', function(chunk){
    console.log('new chunch received:');
    console.log(chunk);
});

- example output:

Phills-MacBook-Pro:public PJC$ node app
new chunch received:
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed neque magna. Etiam pharetra tellus non laoreet condimentum.

- Now we that we have specified the utf8 encoding, the lorem ipsum text is displayed in the output.


Writable Streams

- Creating a writable streams will enable us to send it to the browser (client) or create a new file with that data.
- We start by defining a variable myWriteStream and set that to the file system method createWriteStream. Similar the createReadStream, we will pass into the method the __dirname property to get the current directory and then concatenate a new file named writeMe.txt.
- writeMe.txt will be the location that node will write the data it retrieves from the readMe.txt.
- example:

var http = require('http');
var fs = require('fs');

var myReadStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');
var myWriteStream = fs.createWriteStream(__dirname + '/writeMe.txt');



myReadStream.on('data', function(chunk){
    console.log('new chunch received:');
    console.log(chunk);
});

- What we want to achieve is every time we receive a piece of data, we want to write that to the file writeMe.txt, we can do that by working in the myWriteStram variable into the current read stream (myReadStream) callback function.
- we can use the write() method and pass in the current chunk of data.
- example:

var http = require('http');
var fs = require('fs');

var myReadStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');
var myWriteStream = fs.createWriteStream(__dirname + '/writeMe.txt');


myReadStream.on('data', function(chunk){
    console.log('new chunch received:');
    myWriteStream.write(chunk);
});

- When we run node app. Node will go to that location specified in the write stream and create the writeMe.txt. And as the we receive chunks of data the write stream will write that data to the writeMe.txt file.
- When we have finished, the content of the writeMe.txt file will be identical to the readMe.txt file.




Pipes

- Node.js gives us a more elegant approach to handle this concept of manually reading a readstream and writing buffers to a writestream with Pipes.
- A Pipe can help us do the same exact thing, take data from a readstream and then pipe it to a write stream.
- Instead of having to listen for that data event and writing the data to a writestream, the pipe will do this automatically does that for us.
- We don't have to manually listen for data events.
- We don't have to manually write to a writestream.
- The change will happen in the code where we are manually listening for the data event.
- Replace the entire event listener with the fs modules pipe method. note: you can only use the pipe() method on readable streams. Because we are piping from a readable stream to a writable stream.
- example:

var http = require('http');
var fs = require('fs');

var myReadStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');
var myWriteStream = fs.createWriteStream(__dirname + '/writeMe.txt');


myReadStream.pipe()


- We pass in the writable stream, in other words we are piping it to the writable stream.
- example:

var http = require('http');
var fs = require('fs');

var myReadStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');
var myWriteStream = fs.createWriteStream(__dirname + '/writeMe.txt');


myReadStream.pipe(myWriteStream);


- From here, if we run node app. It will behave exactly as it did when we were listening to the data event and then writing to the writable stream. The output is identical.
- What we can do next, is go back to the server that we created and commented out.
- We are going to use the idea of piping from a readable stream to a writable stream to send data to a user.
- The last time we created the server we sent back some plain text. What we can do is read from the file and write to the response (which is a writable stream) and send it through the data.
- We can cut our whole snippet of code with the readstream and write stream and paste that into the server.
- example:


var http = require('http');
var fs = require('fs');

myReadStream.pipe(myWriteStream);

var server = http.createServer(function(req,res){
      console.log('request was made: ' + req.url);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      var myReadStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');
      var myWriteStream = fs.createWriteStream(__dirname + '/writeMe.txt');
      myReadStream.pipe(myWriteStream);
      res.end('Hello world');
});

server.listen(3000, '127.0.0.1');
console.log('sanity check on port 3000.');


- Currently what is happening in the code, is it is reading from the readstream and writing to the write stream, but that is not what we want to do, we want to send it as a response to the client rather than to a writeMe.txt.
- We want to send it to the response stream, because the response object is a writable stream which we can write data to. So we can get rid of the myWriteStream variable entirely. And instead of piping it to myWriteStream, we can pipe it to the response stream.
- example:


var http = require('http');
var fs = require('fs');

myReadStream.pipe(myWriteStream);

var server = http.createServer(function(req,res){
      console.log('request was made: ' + req.url);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      var myReadStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');
      myReadStream.pipe(res);
      res.end('Hello world');
});

server.listen(3000, '127.0.0.1');
console.log('sanity check on port 3000.');


- Now we can get rid of the res.end('Hello world') because piping the response is automatically ending the response, it sends data down the stream to the client.
- example:



var http = require('http');
var fs = require('fs');

myReadStream.pipe(myWriteStream);

var server = http.createServer(function(req,res){
      console.log('request was made: ' + req.url);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      var myReadStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');
      myReadStream.pipe(res);
});

server.listen(3000, '127.0.0.1');
console.log('sanity check on port 3000.');

- At this point if you run the code by executing node app. You will see the console.log message logged in the terminal.
- example terminal output:

Phills-MacBook-Pro:public PJC$ node app
sanity check on port 3000.


- It is listening to the server. If we proceed to the browser at 127.0.0.1:3000 (localhost 3000), you will see all of the lorem ipsum text from the readMe.txt file.
- What we have done now, is sent this data in a stream. Which is much better for performance than reading the whole file as a whole and then sending it as a whole.

Recap of the code's functionality so far:
- First we create the server.
- We have the request object and the response object.
- And the response object is a writable stream, so we can write to it.
- Then we have a console.log message.
- Then we have our response headers by saying writeHead.
- 200 status means that everything is ok.
- Then we specify the content type which is text/plain because that is what we are reading in the readMe.txt file, it is in plain text.
- Then we create the readstream, which uses the fs module and creates a readstream from the createReadStream method. And reads the contents of the file specified (readMe.txt), we also specify the utf8 character encoding to get it back in the characters we expect from a text file.
- Then we have taken that readStream and piped it into the repsonse stream, this is basically doing all of the heavy lifting for us, listening to the data event and whenever we receive data streaming it to the user bit by bit, so they receive data quicker.



Serving HTML Pages to the Clients

- In a real world project you wouldn't want to send a bunch of lorem ipsum for the user to see. Instead you would most likely want to send an HTML page.
- First we create a HTML page.
- example index.html page:


<!DOCTYPE html>
<html>
    <head>
        <style>
            body{
                background: skyblue;
                font-family: verdana;
                color: #fff;
                padding: 30px;
            }
            h1{
                font-size: 48px;
                text-transform: uppercase;
                leter-spacing: 2px;
                text-align: center;

            }
            p{
                font-size: 16px;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <h1>
            Welcome to the most awesome website on the net
        </h1>
        <p>
            You won't find a website better anywhere else!
        </p>
    </body>
</html>


- First we need to change the content type specified in the response header from 'text/plain' to 'text/html' so that the html page is rendered properly in the browser. If we were to keep the content type as 'text/plain' it would treat the index.html as a text file and all the code would be displayed as unrendered html.
- We also need to replace the path specified in the createReadStream from the readMe.txt to the index.html.
- example:

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res){
      console.log('request was made: ' + req.url);
      res.writeHead(200, {'Content-Type': 'text/html'});
      var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
      myReadStream.pipe(res);
});

server.listen(3000, '127.0.0.1');

console.log('sanity check on port 3000.');


- Now if you run node app, and take open up the browser to localhost:3000 you will see the html page that just created, which was read from a readstream and served to the client!

Serving JSON Data

- What we are going to do is remove the streams, and instead we are just going to send it to the response directly using the end method.
- The first thing we need to do is change the content type from text/html to application/json because that is what we are sending to the browser.
- example:

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res){
      console.log('request was made: ' + req.url);
      res.writeHead(200, {'Content-Type': 'application/json'});
});

server.listen(3000, '127.0.0.1');

console.log('sanity check on port 3000.');


- Now lets create an object that we want to send back as JSON.
- example:

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res){
      console.log('request was made: ' + req.url);
      res.writeHead(200, {'Content-Type': 'application/json'});
      var myObj = {
          name : 'Ryu',
          job : 'Ninja',
          age : 29
      };

});

server.listen(3000, '127.0.0.1');
console.log('sanity check on port 3000.');


- Now that we have out object defined. We want to send this object back as JSON to the client.
- Use the .end() method, as we have see previously, the end method is how we can send data back to the client
- We cannot just pass in myObj into the end method. The reason for this is because the method .end() expects either a string or a buffer to be passed in as a parameter. And in our case myObj is neither a string or a buffer, it is an object. The solution would be to serialize the object, to convert it to a string and the string has to be in JSON format.
- We can do that by using JSON.stringify() and pass the myObj into it as an argument, that will convert myObj into a string and it will be in JSON format.
- example:


var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res){
      console.log('request was made: ' + req.url);
      res.writeHead(200, {'Content-Type': 'application/json'});
      var myObj = {
          name : 'Ryu',
          job : 'Ninja',
          age : 29
      };
      res.end(JSON.stringify(myObj));

});

server.listen(3000, '127.0.0.1');
console.log('sanity check on port 3000.');


- From here, if you save, run node app, and open it up in the browser and refresh. You will see all of the data returned to us as JSON, a JSON string.
- If you right-click, inspect, then go to the Network tab. You need to refresh to see the request. If you select the response tab, you will see more tabs that will have different stats about the request.
- Why would we want to return some JSON you ask? Why would someone request this in a browser? Just imagine, that we had some javascript running on the front end in the browser, that javascript might make this request to a route on the api and that route returned the JSON.
- Then we can return that data to the front end javascript so it can do something with that JSON.
- It could output that JSON to the screen in a particular area. Basically update the view for the user. That would be a typical use case for Serving JSON.

Basic Routing
- Lets set up some basic routing.
- Currently as we have it set up, when we run node app and proceed to 127.0.0.1:3000 in the browser. We will see the JSON displayed.
- Even if we were to 127.0.0.1:3000/home we would still see the same JSON display. No matter what request is made the same data is displayed.
- In a real world application, we would want to distinguish between different urls and send data depending what request is being made. As an example, is we go to 127.0.0.1:3000/home we would want to be served the index page. Or in another case if we go to 127.0.0.1:3000/api we would want to send the user some data maybe.
- We need to create some sort of routing system in node.js.
- If you notice when we are making a request to the server, we log what request is being made with this line:


console.log('request was made: ' + req.url);

- To find what request is being made we are accessing a property on the request object called url. We are listening to what the user is writing to the address bar and so we know what they are requesting.
- Therefore we can use this to check what they have requested and then send them data depending on that request.
- We can use an if statement to check what the user's request is and then send them something depending on that request.
- As a note it is a good habit to get use to using the === comparative operator.
- We can crate a condition that is true when the url property of the request object is equal to '/home' or if that same request object is equal to '/'.
- example:


var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res){
      console.log('request was made: ' + req.url);
      if(req.url === '/home' || req.url === '/'){

      }
});

server.listen(3000, '127.0.0.1');
console.log('sanity check on port 3000.');


- So if the condition is met the inside we can create the response header.
- Use the writeHead method and pass into a status of 200, a content type of 'text/html' because we are sending a html page.
- Next we need to create a readstream to be able to read the file.
- We will use the fs module and the createReadStream method, and pass in the __dirname since the file we want to read is in the current directory and concatenate that with '/index.html'
- Now we need to pipe that to the response object, which is a writable stream.
- From here is we run now app and proceed to 127.0.0.1:3000 it will display the index.html page.
- Both 127.0.0.1:3000 and 127.0.0.1:3000/home will display the same index.html page, but if the user tries to go to a url other than '/' or '/home' then the page will load infinitely trying to find that page.
- example:

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res){
      console.log('request was made: ' + req.url);
      if(req.url === '/home' || req.url === '/'){
          res.writeHead(200, {'Content-Type': 'text/html'});
          fs.createReadStream(__dirname + '/index.html').pipe(res);
      }
});

server.listen(3000, '127.0.0.1');
console.log('sanity check on port 3000.');



- What we can do now is add some more routes.
- We can extend the current if statement with an else if statement
- In the else if condition lets add some logic that is true when the url property is equal to '/contact', where we would send back a contact page.
- We can create the contact.html page similar to the index.html page.
- example:

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res){
      console.log('request was made: ' + req.url);
      if(req.url === '/home' || req.url === '/'){
          res.writeHead(200, {'Content-Type': 'text/html'});
          fs.createReadStream(__dirname + '/index.html').pipe(res);
      } else if(req.url === '/contact'){
          res.writeHead(200, {'Content-Type': 'text/html'});
          fs.createReadStream(__dirname + '/contact.html').pipe(res);
      }
});

server.listen(3000, '127.0.0.1');
console.log('sanity check on port 3000.');

- Now that we contact.html page and the route defined to handle the request to '/contacts' if we run node app, and request the url 127.0.0.1:3000/contact then we will see the contact page displayed in the browser.
- What if we want to send back JSON instead? Like some kind of API endpoint, well we can do that as well.
- Use the else if to continue the if else statement. Set the else if condition to check if the request object's url property is equal to '/api/ninjas', if this condition is met, then we want to send back some data, this is like some API endpoint that some javascript in the browser might request.
- Lets first create an array of objects.
- As a note, for the sake of this example we are creating the array of objects right in the else if executable code, in a real world application you would probably get this data from a database rather than just defining it here.
- example:

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res){
      console.log('request was made: ' + req.url);
      if(req.url === '/home' || req.url === '/'){
          res.writeHead(200, {'Content-Type': 'text/html'});
          fs.createReadStream(__dirname + '/index.html').pipe(res);
      } else if(req.url === '/contact'){
          res.writeHead(200, {'Content-Type': 'text/html'});
          fs.createReadStream(__dirname + '/contact.html').pipe(res);
      } else if (req.url === '/api/ninjas'){
          var ninjas = [{name: 'ryu', age: 29,}, {name: 'yoshi', age: 32}];
      }
});

server.listen(3000, '127.0.0.1');
console.log('sanity check on port 3000.');


- We are going to send this data as JSON to the browser (client).
- To get this started we need to create the response header, and pass in a status of 200 and the content type this time will be 'application/json'.
- Then we need to send that to the browser, lets use the response's end method, and pass into it the variable ninjas which has our data in it. But as we did a little while ago we need to convert out data into a string since the response object will expect either a buffer or a string.
- So we can use JSON.stringify to convert our data into a string.
- example:

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res){
      console.log('request was made: ' + req.url);
      if(req.url === '/home' || req.url === '/'){
          res.writeHead(200, {'Content-Type': 'text/html'});
          fs.createReadStream(__dirname + '/index.html').pipe(res);
      } else if(req.url === '/contact'){
          res.writeHead(200, {'Content-Type': 'text/html'});
          fs.createReadStream(__dirname + '/contact.html').pipe(res);
      } else if (req.url === '/api/ninjas'){
          var ninjas = [{name: 'ryu', age: 29,}, {name: 'yoshi', age: 32}];
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(ninjas));
      }
});

server.listen(3000, '127.0.0.1');
console.log('sanity check on port 3000.');


- Now if you save and run app node. If we proceed to 127.0.0.1:3000/api/ninjas then we will see the JSON data displayed in the browser.
- So far we set up a few routes, but if we go to something that is not specifically set up in the app.js, then we will still get an infinitely loading browser.
- A solution to this would be to send some type of 404 page, to explain to the user that we have not found the page they are requesting.
- At the end of all the routes so far, we will create a catch all. It will not be an else if but rather just an else. Which will send a 404 page if the user requests a url that is not define.
- It will look similar to setting up the other html pages. Make sure the content type is 'text/html' and be sure to pass in the url.
- Be sure to change the response header's status in this case to 404.
- Create the 404.html page.
- This will be a catch all if none of our routes match when the user requests something.
- example:

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res){
      console.log('request was made: ' + req.url);
      if(req.url === '/home' || req.url === '/'){
          res.writeHead(200, {'Content-Type': 'text/html'});
          fs.createReadStream(__dirname + '/index.html').pipe(res);
      } else if(req.url === '/contact'){
          res.writeHead(200, {'Content-Type': 'text/html'});
          fs.createReadStream(__dirname + '/contact.html').pipe(res);
      } else if (req.url === '/api/ninjas'){
          var ninjas = [{name: 'ryu', age: 29,}, {name: 'yoshi', age: 32}];
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(ninjas));
      } else {
          res.writeHead(200, {'Content-Type': 'text/html'});
          fs.createReadStream(__dirname + '/404.html').pipe(res);
      }
});

server.listen(3000, '127.0.0.1');
console.log('sanity check on port 3000

The Node Package Manager (npm)

- We are going to later use Express, which is a package on node.js that will help us to build web applications on node. But in order to use Express, you need to understand how to use the node package manager (npm).
- Comes with node.js when it was first installed on your machine. It's basically a bunch of command line tools which will help us install third party packages or modules to help out with our node projects. Express is one of these packages and there are many more. It is a huge ecosystem of third party packages, which is one of the reasons why node.js is so great.
- A node package/module is essentially a bunch of code that someone else wrote and helps us perform a certain type of task within our node.js applications. Express for example can help us with routing, templating, and such. So the idea is that we can load these packages up into our node application and use that functionality in our code, and the way we do that is through the node package manager. Using the package manager we can install packages, update packages, or even publish our own packages for other people to use as well.
- https://www.npmjs.com will have all the information you need about the packages available.
- and example of installing a package:

npm install Express

- This would download all files in your node application.
- When installing, it will also install all the dependencies that the main package relies on.
- you can also use this command to uninstall the express package:

npm uninstall Express


The package.json file

- It is always a good idea to keep track of what packages you are installing and which packages you application depends on, the dependencies of you application.
- In node.js we can do that, we can use the package.json file to keep of all those packages that we depend on.
- We can either create this manually ourselves or we can use a command in node.js to do it for us.
- running npm init, it will ask you a series of questions about our project, after answering all the questions it will have created the package.json file for our application. In this file is information, that we entered about the application.
- A great feature of the package.json file is that it can keep track of the dependencies, the package that we need to run this application.
- For example if we install some packages and our application depends on those, now if we pass our applications code to another developer, we do not normally pass on the packages as well, only the application code that we have written. So for that developer to run our application, they are going to have to install the same packages that we did, the packages that our application depends on. So how do they know which packages need to be installed? They will be in the package.json file. How do we add the packges to this file and how to we keep track of it? When we install a package in node.js using the node package manager we can pass through a save flag and that is going to save that package as a dependency in the package.json file.
- example:

npm install express -save

- This command will both install express and save this as a dependency in your package.json file.
- example snippet from the package.json of the dependencies:

"dependencies": {
  "express": "^4.15.3"
}

- You notice that it will provide the name of the package and the version number as well.
- If you were to run npm uninstall express. This would remove all of those file in the node_modules directory.
- You will notice that once express is uninstalled, in the package.json file express will still be listed as a dependency, even through the node_modules directory is empty. The reason for this is because even through we do not have express installed we have listed it as a dependency, which tells node that we need this package for our application to work. To unlist a package as a dependency you can manually delete that line from the dependencies.
- One cool feature of the package.json file is let say we had several packages listed in the package.json file as dependencies and we passed our code to another developer, with the npm install command will automatically install all the packages your application lists as a dependency, it is also version specific, so it will install the exact version specificed in the package.json.


Nodemon

- https://www.npmjs.com/package/nodemon
- Nodemon is a package for when your developing. What it does is it monitors you application files so that when it's running in the browser and listening to the server, if we make a change in one of the application files like app.js then it will monitor that, and when we save that file it restarts the server automatically for us. So you don't have to go back and forth with the terminal to start, stop, and restart the server, we are instead able to simply restart in the browser and we are going to get that fresh change that was made in the application file.
- You can use this comman to install nodemon:

npm install -g nodemon

- Notice that we use the -g option, this indicates that we are installing nodemon globally instead of locally. Which means that no matter what application we work on we can use nodemon.
- As a note when we install nodemon with this option, we will not see the files added in the node_modules directory, instead they will be downloaded in another location somewhere on you computer.
- The way this works, is instead of running node app to run our application, instead we will run our application by running this command:

nodemon app.js

- After it is run it will output several message to the terminal.
- the nodemon version number, it gives you the 'rs' command which will restart the node server, it is telling you that nodemon is watching all the files which is represented by this syntax *.*, and it logs that it has started 'node app.js', and then it will begin starting the server's processes and listening to the port.
- So nodemon is watching all the files, and if we make a change, then it will update it for us.
- If we proceed to local host now, because we have some routes set up from earlier, we will get the home page if we go to 127.0.0.1:3000, basically the same behavior as we had it when we had defined these routes.
_ But if we now go back to the app.js and make a change to one of the routes, lets say we change the url condition for 'contact' to 'contact-us'. If we save the file, you will see in the terminal nodemon logging a message which states "restarting due to changes..." and then "starting 'node app.js'". So going to the browser to 127.0.0.1:3000/contact-us will bring up the contact page as it is newly define in our routes to do so.
- example:


var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res){
      console.log('request was made: ' + req.url);
      if(req.url === '/home' || req.url === '/'){
          res.writeHead(200, {'Content-Type': 'text/html'});
          fs.createReadStream(__dirname + '/index.html').pipe(res);
      } else if(req.url === '/contact-us'){
          res.writeHead(200, {'Content-Type': 'text/html'});
          fs.createReadStream(__dirname + '/contact.html').pipe(res);
      } else if (req.url === '/api/ninjas'){
          var ninjas = [{name: 'ryu', age: 29,}, {name: 'yoshi', age: 32}];
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(ninjas));
      } else {
          res.writeHead(200, {'Content-Type': 'text/html'});
          fs.createReadStream(__dirname + '/404.html').pipe(res);
      }
});

server.listen(3000, '127.0.0.1');
console.log('sanity check on port 3000.');



- This is a much better way of working with node.js, it saves a lot of time not having to deal with restarting the server.



Introduction to Express

- Express is one of the most popular node packages on the internet.
- It has an easy and flexible routing system.
- It integrates with many templatingh engines.
- It Contains a middleware framework.
- Lets start fresh by going into the app.js and delete its content. We will be building a brand new node app with express.
- First you would install the express package into your app. by using the command:
npm install express
- You can also add the -save option if you wanted to save express to your devDependencies in the package.json.
- Once you have installed it express will be present in your node_modules directory.
- The first thing we need to do is require express.
- example:

var express = require('express');
- Setting the express variable will give us access to the express module.

- To gain access to all of the functionality of express in our application we need to set up what is known as an express app.
- Store it in a variable, in most cases people will call this variable app. We set this variable to express and then fire as a function.
- example:

var express = require('express');

var app = express();

- The reason for this is because what is returned to us is the module.exports is a function, when we fire that function we then have access to all of those different methods on express, which will help us with things such as routing or setting up templating engines.
- We also need to listen to a port. Much like we did before.
- example:

var express = require('express');

var app = express();

app.listen(3000);

- We have our express app running with the second line and in our thrid line we are listing to the port. But how do we respond to requests?
- When we set up the app variable, we are given access to a variety of methods that can help us respond to requests.
- And these methods all correspond to the types of requests being made they are what is known as http verbs or methods.
- HTTP verbs are the type of requests we make.
- GET: When we type a url into an address bar
- POST: Generally made when we post some data to a server from a web form.
- DELETE:
- PUT:
- These are all different HTTP methods. They are the types of requests we make.
- There is nothing really that special about these different requests methods, they are just requests working in the same way as each other. It's just that each different type of request contains a specific piece of information attached to it to say to the server what kind of request it is. Then it's up to the server to look at what type of request it is and then treat that type of request in a particular way however it sees fit.
- So by using express in node we can respond to each of these different types of requests very easily.
- The way we do that is by using the methods that express provides us with. So to respond to a get request, we use the app.get method and we pass in the route and a function separated by a coma.
- example:

GET - app.get('route',fn)
POST - app.post('route',fn)
DELETE - app.delete('route',fn)

- For now we will stick to get requests since that is what we've been working on.
- A get request is typing a URL in an address bar and then getting something back from the server.
- So back to our app.js, we are listening to a port.
- We want to respond to a get requests and we have seen that we can do that by doing app.get
- The first argument for the get() method is the route in single quotes. For now we can just do '/'.
- And then we need to fire a function as our second argument, for when a user requests the route (root directory).
- The function take the request and response object. The only difference is that express has extended these objects and has added additional functionality to them. So when a user goes to forward-slash, it will fire the function and we can respond to it in a particular way. for now we can just send a string.
- example:

var express = require('express');

var app = express();

app.get('/', function(req, res){
    res.send('this is the homepage.');
});

app.listen(3000);


- So now if we run this (now is a good opportunity to use nodemon). with this command:

nodemon app.js

- Viewing a browser at 127.0.0.1:3000/, then we will get the homepage or at least the string we set to say 'this is the homepage'.
- What is happening is express is listening for the get request, when it receives that request it will fire this function and on the response object it is saying .send, which is an express method, and finally we are send a string. You will notice that are not specifying the content-type in the headers? Express is cleaver enough to figure out what it is and do it for us.
- Setting up another route, and this time change the route to '/contact' and change the string to 'this is the contact page'. If we save that and proceed to /contact we will get the string we just wrote for contact displayed in the browser.



Express Route Params

- Route parameters in express. So far we have set up our express app and it is responding to some get requests, but thats about it. We are only responding to sort of static requests, "/contact" or "/about". But what if we want to some kind of dynamic request? For example say we had a social network site and one particular route would be "/profile/ + the id of the specific profile".
- I wouldn't want create a separate method for each ID and respond to each ID separately. I want to recognize when someone is requesting that profile page and then grab that ID from the url, so I can do something with it. We can do that by using route variables or also known as route parameters.
- So lets go ahead and create another get method that is going to respond to a particular request. In this example we will use a get request, app.get().
- We want to pass in the path which will be '/profile' because we want to view a profile and then the id of the profile, which we will use this syntax '/profile/:id'. An example of an individual profile would be 127.0.0.1:3000/profile/123, where 123 would correspond to a particular person in a database, so we can make some sort of database query and then return that data from the database and inject it into our HTML and return that to the user. (query the database with a route parameter)
- We will next fire a function, which again will take the request object and response object. Within the code block in the function we can access the user id that the user input, on the request object.
- For now what we are going to do is use the send method with the response object and send some text back to the user.
- example:

var app = express();

app.get('/', function(req, res){
    res.send('this is the homepage');
})

app.get('/', function(req, res){
    res.send('this is the contact page');
});

app.get('/profile/:id', function(req, res){
    res.send('You requested to see a profile with the id of ');
});

app.listen(3000);

- Then we are going to concatenate with the ID from the URL, but how do we access it? We will access it through the request object. The property on the request object is params, then we just need to state the parameter name which is .id, the example snippet for the res.send() would look like this:

app.get('/profile/:id', function(req, res){
    req.send('You requested to see a profile with the id of ' + req.params.id);
});


- So from here, if we run node app.js, and proceed to 127.0.0.1:3000/profile/123, we would be served a page that displays the text "You requested to see profile with the id of 123". And if you use a different ID in the URL, then you would see that ID printed accordingly.

- We have successfully accessed the ID variable or parameter we have passed through on our request. by using req.parameters.id.
- Because this dynamic we can now say anything we want to in the place of :id, lets say :name, then we make the change to how we are accessing the parameter by saying req.params.name and edit the send sting to say name instead of id just to make our statement to the user make sense. Save and enter a URL such as 127.0.0.1:3000/profile/jordy, and the browser will display "You requested to see a profile with the name of jordy".
- So what we have here is a really cool way to set up routes when we are dealing with dynamic routes that may change. But we have this same sort of structure where that all "profiles" (to look for when "profile" is in the url), then forward-slash something and then bring me back that something on the params and we can do something with that something with it, maybe query it against a database and return some data dependent on it.

- example snippet:

var express = require('express');

var app = express();

app.get('/', function(req,res){
    res.send('this is the homepage');
});

app.get('/contact', function(req, res){
    res.send('this is the contact page');
});

app.get('/profile/:name'){
  res.send('You requested to see a profile with the name of ' + req.params.name);
};

app.listen(3000);
