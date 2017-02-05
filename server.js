var express = require('express');
var fileUpload = require('express-fileupload');
var app = express();
var PORT = process.env.PORT || 3000;
 
app.use(fileUpload());
 
app.post('/upload', function(req, res) {
  var sampleFile;
 
  if (!req.files) {
    res.send('No files were uploaded.');
    return;
  }
 
  sampleFile = req.files.sampleFile;
 
  console.log(sampleFile);
  res.json(sampleFile);
});

app.listen(PORT, function () {
  console.log('App listening on port ' + PORT + '!');
});