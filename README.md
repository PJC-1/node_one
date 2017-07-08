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
- Why would we want to return some JSON you ask? Why would someone request this in a browser? Just imagine, that we had some javascript running on the front end in the browser
