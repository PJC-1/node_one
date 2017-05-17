var fs = require('fs');

// when using the asynchronyous version of the method, a third parameter is required
// which is the call backfunction for when it is finished reading the file. This call back function takes two arguments
// The first being the err if there is an error reading the file and the data that we retrive.
fs.readFile('readMe.txt', 'utf8', function(err,data){
    console.log(data);
});

// the readFile() will now block the code, so any code after the method will run even while the file is being read.
// we will test a log here, and the out put will log this before logging the data retrived from reading the file.
console.log("test");
