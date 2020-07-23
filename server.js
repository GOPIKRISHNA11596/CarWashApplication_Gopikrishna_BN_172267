require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var morgan = require('morgan');

require ('./_helpers/db');
const errorHandler = require('_helpers/error-handler');
const UserControllerUser = require('./controllers/users.controller');

app.use(bodyParser.json());
app.use(morgan('tiny')); //To get Http logs in console

app.use('/hello', (req, res)=>{
    res.json('hello gopi');
})

//Routing Controllers
app.use('/users', UserControllerUser);

// global error handler
app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000; //Ternary operator
app.listen(3000, () => console.log(`Express server running on port 3000`));
