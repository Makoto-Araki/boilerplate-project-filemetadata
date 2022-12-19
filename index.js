// Import
var express = require('express');
var cors = require('cors');
var path = require('path');
var multer = require('multer');
require('dotenv').config();

// App Instance
var app = express();

// Configuration
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Upload settings
var storage = multer.diskStorage({
  // Destination
  destination: function(req, file, cb){
    cb(null, path.join(__dirname, '/uploads'))
  },
  // Save file name
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
});

// Load upload settings
var upload = multer({ storage: storage });

// GET - [base_url]/
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// POST - [base_url]/api/fileanalyse
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  let result = {
    name: req.file.filename,
    type: req.file.mimetype,
    size: req.file.size
  }
  res.json(result);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
