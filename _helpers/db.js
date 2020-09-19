const config = require('config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

if(process.env.NODE_ENV === 'production '){
    var connectionToDB = config.connectionStringProd;
}else{
    var connectionToDB = config.connectionStringDev;
}

mongoose.connect(connectionToDB, connectionOptions);

// mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

