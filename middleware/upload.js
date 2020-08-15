const util = require('util');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const config = require('config.json');
const path = require('path');


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({storage: storage});