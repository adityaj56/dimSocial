//import express module to the main entry point file of our project
const express = require('express');
//store express function in app constant
const app = express();
const port = 8000;

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