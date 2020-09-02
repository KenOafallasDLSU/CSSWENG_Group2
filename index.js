const express = require("express");
const hbs = require("hbs");

/********* Routing *********/
const indexRoutes = require('./router/indexRoutes');

/********* Routing *********/
app.use('/', indexRoutes);

/** Helper Functions **/


/** Server online **/
app.listen(process.env.PORT, process.env.LOCAL_ADDRESS, ()=>{
    console.log("Server ready.");
})