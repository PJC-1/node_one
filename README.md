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
- In the count.js file we module.exports to return the counter variable, in other words we want to be able to utilize the counter variable which is the anonymous function so we export this variable.
- We then create the variable counter in app.js which is requiring the count.js file, which in return is exporting the counter variable, which makes the counter variable's anonymous function available in the app.js file.
