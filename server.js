require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var fs = require('fs');
const util = require('util');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const path = require('path');

require ('./_helpers/db');
//const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');
const UserController = require('./controllers/user.controller');
const AdminController = require('./controllers/admin.controller');
const CarController = require('./controllers/car.controller');
const BookingController = require('./controllers/booking.controller');
const PaymentController = require('./controllers/payment.controller');
const CarServicesController = require('./controllers/servicepackage.controller');
const WasherController = require('./controllers/washer.controller');
const ServiceSelectedController = require('./controllers/service-selected.controller');
const ServiceRequestController = require('./controllers/service-request.controller');
const ServiceRequestAcceptedController = require('./controllers/service-request-accepted.controller');
const RatingController = require('./controllers/rating.controller');
const OderAcceptedController = require('./controllers/order-accepted.controller');

// const ImageController = require('./controllers/image.controller');


//app.use(jwt());
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('tiny')); //To get Http logs in console

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({storage: storage});

app.use('/hello', (req, res)=>{
    res.json('Hello World');
})

//Routing Controllers
app.use('/users', UserController);
app.use('/admins', AdminController);
app.use('/cars', CarController);
app.use('/booking', BookingController);
app.use('/payments', PaymentController);
app.use('/carservices', CarServicesController);
app.use('/washers', WasherController);
app.use('/serviceselected', ServiceSelectedController);
app.use('/servicerequests', ServiceRequestController);
app.use('/servicerequestacc', ServiceRequestAcceptedController);
app.use('/ratings', RatingController);
app.use('/orderaccepted', OderAcceptedController);


// app.use('/img', ImageController);


// global error handler
app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000; //Ternary operator
const server = app.listen(3000, () => console.log(`Express server running on port 3000`));
module.exports = server;