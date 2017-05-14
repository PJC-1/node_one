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
