var events = require('events');
var  util = require('util');

var Person = function(name){
    this.name = name;
}

util.inherits(Person, events.EventEmitter);

var phill = new Person('phill');
var sherry = new Person('sherry');
var max = new Person('max');

var people = [phill, sherry, max];

people.forEach(function(person){
    person.on('speak', function(mssg){
        console.log(person.name + ' said: ' + mssg);
    });
});

// here we are manually emitting the custom event 'speak' and passing the message 'hello world' into the call back function which will log "phill said: hello world"
phill.emit('speak', 'hello world');
sherry.emit('speak', 'hi dude')
