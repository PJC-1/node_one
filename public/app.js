var events = require('events');
// util module, used to inherit from objects built into node.js
var  util = require('util');

// so when we create a new person we need to pass in a name
var Person = function(name){
    this.name = name;
}

// what I want to do is inherit the EventEmitter(), in other words I want each person to inherit the EventEmitter() so that they can bind custom events to the person object
// first argument is who is inheriting, in this case Person
// the second argument is what is being inherited, in our example events.EventEmitter
util.inherits(Person, events.EventEmitter);

// making three people
var phill = new Person('phill');
var sherry = new Person('sherry');
var max = new Person('max');

var people = [phill, sherry, max];

people.forEach(function(person){
    // we are binding the custom event 'speak' to each person
    person.on('speak', function(mssg){
        // this will log the name of the person who is speaking and the message passed into the call back function
        console.log(person.name + ' said: ' + mssg);
    });
});

// here we are manually emitting the custom event 'speak' and passing the message 'hello world' into the call back function which will log "phill said: hello world"
phill.emit('speak', 'hello world');
sherry.emit('speak', 'hi dude')
