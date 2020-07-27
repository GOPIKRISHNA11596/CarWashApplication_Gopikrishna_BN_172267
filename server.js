require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var morgan = require('morgan');

require ('./_helpers/db');
const errorHandler = require('./_helpers/error-handler');
const UserController = require('./controllers/user.controller');
const CarController = require('./controllers/car.controller');
const BookingController = require('./controllers/booking.controller');
const PaymentController = require('./controllers/payment.controller');
const ServicesController = require('./controllers/carwashservices.controller');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('tiny')); //To get Http logs in console

app.use('/hello', (req, res)=>{
    res.json('Hello World');
})

//Routing Controllers
app.use('/users', UserController);
app.use('/cars', CarController);
app.use('/booking', BookingController);
app.use('/payment', PaymentController);
app.use('/services', ServicesController);



// global error handler
app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000; //Ternary operator
app.listen(3000, () => console.log(`Express server running on port 3000`));
