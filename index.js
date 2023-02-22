const db = require('./config/mongoose');

//import express module to the main entry point file of our project
const express = require('express');
//store express function in app constant
const app = express();
const port = 8000;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static(path.join(__dirname,'assets')));
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.use(session({
    name: 'dimsocial',
    secret: 'jangid',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*10)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/dimsocial_dev',
        autoRemove: 'disabled'
    },function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//This will create a middleware which route our request from the entry page to further pages

app.use('/', require('./routes/index'));

//For listening the request from designated port
app.listen(port, function(err){
    if(err){
        console.log(`Error while connecting to the server: ${err}`);
        return;
    }
    console.log(`Server running on port: ${port}`);
});