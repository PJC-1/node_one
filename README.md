Learning about node.js

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
Example:
var events = require('events');

var util = require('util');

In this example we are going to create a new object constructor named Person, and every time a new person is created we will pass in a name and set a key of name to equal name. example:

var events = require('events');

var util = require('util');

var Person = function(name){
    this.name = name;
}

Next, we will utilize the 'util' module that we required in order to inherit the EventEmitter(). In other words we want each person to inherit the EventEmitter() so that they can bind custom events to the person object. The .inherits() takes to arguments, the first being who/what will be doing the inheriting, in our example this will be Person. And the second argument will be what is being inherited, in our example the events.EventEmitter is what we want to be inherited. example:

var events = require('events');
var util = require('util');

var Person = function(name){
    this.name = name;
}

util.inherits(Person, events.EventEmitter);

After Person inherits the ability to listen to custom events. We can now create some people. If we take a look at our constructor object, when we create a new person we pass in a string which will be their name. After create a few different people store those people in an array. example:

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
