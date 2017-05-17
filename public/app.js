// fs module, reading and writing files
var fs = require('fs');

// use the readFileSync to read a file that you specify as an argument
// this is the synchronous version to this method, which means that it will complete one operation to completion before moving on to the next.
// the first argument is the full path to the file you want to read. Second is the character encoding, working with binary and to convert that binary into something else
var readMe = fs.readFileSync('readMe.txt', 'utf8');

// remember when running this module in the terminal to be cd into the directory
console.log(readMe);
