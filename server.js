var express = require('express');
var fileUpload = require('express-fileupload');
var app = express();
var PORT = process.env.PORT || 3000;
var fs = require("fs");

app.use(fileUpload());
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  var fullAppUrl = req.protocol + '://' + req.get('host');
  var postUrl = fullAppUrl + "/get-file-size";
  res.render('index', { postUrl });
});

app.post('/get-file-size', function(req, res) {
  var sampleFile;
  if (!req.files) {
    res.send('No files were uploaded.');
    return;
  }
 
  sampleFile = req.files.sampleFile;
  sampleFile.mv('uploads/' + sampleFile.name, function(err) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      var stats = fs.statSync('uploads/' + sampleFile.name);
      var fileSizeInBytes = stats["size"];
      res.json({ fileSizeInBytes });
    }
  }); 
});

app.listen(PORT, function () {
  console.log('App listening on port ' + PORT + '!');
});