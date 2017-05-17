// fs module, reading and writing files
var fs = require('fs');

// use the readFileSync to read a file that you specify as an argument
// this is the synchronous version to this method, which means that it will complete one operation to completion before moving on to the next.
// the first argument is the full path to the file you want to read. Second is the character encoding, working with binary and to convert that binary into something else
var readMe = fs.readFileSync('readMe.txt', 'utf8');

// the writeFilySync method is used to write a file.
// it takes to arguments, the first being the file and path were you want to write the file. And second is the what you want to write to the file,
// in our example we are using the contents of the readMe.txt file which is stored in a variable.
fs.writeFileSync('writeMe.txt', readMe);
