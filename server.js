require('rootpath')();
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var helmet = require('helmet');
require('./ecosystem.config');


require ('./_helpers/db');
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
const { create } = require('./services/user.service');

app.use(cors());
app.use(helmet()); //Content Security
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('tiny')); //To get Http logs in console

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

// global error handler
app.use(errorHandler);

//Space is important at 'production '
// const port = process.env.NODE_ENV === 'production '? process.env.PORT_PROD : process.env.PORT_DEV; //Ternary operator
// const server = app.listen(port, () => console.log(`Express server running in ${process.env.NODE_ENV}environment with port ${port}`));

// if(process.env.NODE_ENV === 'development '){
//     port = process.env.PORT_DEV;
//     // port = PORT;
//     console.log('Development Environment port : ' + port);
// }else if(process.env.NODE_ENV === 'production '){
//     port = process.env.PORT_PROD;
//     // port = PORT;
//     console.log('Production Environment port : ' + port);
// }
port = process.env.PORT;

const server = app.listen(port, () => console.log(`Express server running in ${process.env.NODE_ENV}environment with port ${port}`));

module.exports = server;