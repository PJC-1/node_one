var fs = require('fs');

// the unlink() method is used to delete files, it takes an argument which is the file name/path
// beware that if you call this method again, and the file does not exists. it will throw an error. in this case it would error: no such file or directory.

fs.unlink('writeMe.txt');
