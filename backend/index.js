const express = require("express");
const session = require("express-session-jwt");
const { Collection } = require("mongoose");
const bodyParser = require('body-parser');
const morganBody = require('morgan-body');
const mongoose = require('mongoose')
const cors = require('cors');



const MongoDBStore = require("connect-mongodb-session")(session)

const fs= require('fs');
const signupRoutes = require("./routes/signup");
const signRoutes = require("./routes/signin");
const { openRoutes } = require("./routes/open_apis");

//middlewares
const app = express();
app.use(bodyParser.json());
morganBody(app);

app.use((req,res, next)=>{
    next();
})

app.use(cors())

// connecting to db
const dbURI = 'mongodb+srv://veda:CVVIujYG4dX9UXo5@cluster0.qyxkleo.mongodb.net/?retryWrites=true&w=majority';
const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  };

mongoose.connect(dbURI, options,(err)=>{
    if(err) {
        console.log('error conencting to db');
    }
    console.log('successfully connected to db');
});

// session configuration
const store = new MongoDBStore({
    uri:dbURI,
    databaseName:'hollow',
    collection:'session_history'
});

store.on('error',(err)=>{
    console.log('error connecting to mongo session collections :'+err);
});



app.use(session({
    secret:'i have willed it',
    cookie: {
        maxAge: 15*3600
    } ,
    keys:{
        public:fs.readFileSync('/Users/s0a00ri/Documents/personal/study/dukan/backend/secerts/public-key.pem','utf8'),
        private:fs.readFileSync('/Users/s0a00ri/Documents/personal/study/dukan/backend/secerts/private-key.pem','utf8'),
    },
    store: store,
    resave: true,
    saveUninitialized:true
}));




// router defintions

const openapis = require('./routes/open_apis')
app.use('/opens', openapis)

const safeapis = require('./routes/safe_apis')
app.use('/safe', safeapis)

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
});

//startup script
app.listen(3000, (req,res)=>{
    console.log("server start at port : 3000");
})
