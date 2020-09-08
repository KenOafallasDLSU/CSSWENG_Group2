/**Dependencies */
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

/**Database constants */
const mongoClient = mongodb.MongoClient;
const databaseURL = "mongodb://localhost:27012/residencydb"; //local URL
//const databaseURL = "mongodb+srv://Admin:a1b2c3d4%21@occs-residency-system.jflhq.gcp.mongodb.net/residencydb?retryWrites=true&w=majority"; //Atlas URL
const dbname = "residencydb";
const options = { useUnifiedTopology: true };

/**Database models */
const modelCUH = require('./models/DB_CUH');
const modelSRep = require('./models/DB_SRep');
const modelSuspension = require('./models/DB_Suspension');
const modelTimeLog = require('./models/DB_TimeLog');
const modelTimeRequest = require('./models/DB_TimeRequest');

/**Create DB Collections if they do not exist */
mongoClient.connect(databaseURL, options, function(err, client) {
    if (err) throw err;
    const dbo = client.db(dbname);

    dbo.createCollection("colCUHs", function(err, res) {
      if (err) throw err;

      dbo.createCollection("colSReps", function(err, res) {
        if (err) throw err;

        dbo.createCollection("colSuspensions", function(err, res) {
          if (err) throw err;

          dbo.createCollection("colTimeLogs", function(err, res) {
            if (err) throw err;

            dbo.createCollection("colTimeRequests", function(err, res) {
              if (err) throw err;
              client.close();
            });
          });
        });
      });
    });
});

/********* Routing *********/
const indexRoutes = require('./router/indexRoutes');

/********* Routing *********/
app.use('/', indexRoutes);

/** Helper Functions **/


/** Server online **/
app.listen(process.env.PORT, process.env.LOCAL_ADDRESS, ()=>{
    console.log("Server ready.");
})