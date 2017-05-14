var events = require('events');

// one thing returned from the events modules is the EventEmitter class, used for creating custom events and then react to those events when they are emitted.
// storing a new EventEmitter object into the var myEmitter
// EventEmitter is a node class. It is a constructor.
// We can now wire up events to myEmitter
var myEmitter = new events.EventEmitter();

// the .on method is from the node EventEmitter class.
// it is used to bind event handlers to events by their string name.
// Node.js is event based similar to that of jquery, so in node you usually bind functions to listen to events.
// in this example we use the .on method and bind that to an event we have created named 'someEvent', when this 'someEvent' emits (occurs) we want it to do something and
// that is defined by the second argument as a callback function.
// in this example we are using an anonymous function.
// we are allowed to pass through a parameter into the callback function.
// In this example when the event happens, it fires the anonymous function and logs a message.
//
myEmitter.on('someEvent', function(mssg){
    console.log(mssg);
});

// we use the method .emit to emit an event
// The .emit method allows you to manually invoke the event, which casuses the callback registered to the event to be called.
// In our example we are emitting our 'someEvent' event and the anonymous callback function is invoked, the second argument in the method is the mssg, so the string that is used int he callback to log the message.
// The basic structure is the first argument is the event and all arguments after are parameters passed intot the function
myEmitter.emit('someEvent', 'the event was emitted');
