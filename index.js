/**Dependencies */
const express = require("express");
const hbs = require("hbs");
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

/**Engine creation */
const index = express();

const port = 3000;

/**Database constants */
const mongoClient = mongodb.MongoClient;
const databaseURL = "mongodb://localhost:27017/residencydb"; //local URL
//const databaseURL = "mongodb+srv://Admin:a1b2c3d4%21@occs-residency-system.jflhq.gcp.mongodb.net/residencydb?retryWrites=true&w=majority"; //Atlas URL
const dbname = "residencydb";

/**Database models */
const modelCUH = require('./models/DB_CUH');
const modelSRep = require('./models/DB_SRep');
const modelSuspension = require('./models/DB_Suspension');
const modelTimeLog = require('./models/DB_TimeLog');
const modelTimeRequest = require('./models/DB_TimeRequest');

/**Create DB Collections if they do not exist */
const options = { useUnifiedTopology: true };
mongoClient.connect(databaseURL, options, function(err, client) {
  console.log("Connected to DB at " + databaseURL);
  if (err) throw err;
  const dbo = client.db(dbname);

  dbo.createCollection("colCUHs", function(err, res) {
    //if (err) throw err;

    dbo.createCollection("colSReps", function(err, res) {
      //if (err) throw err;

      dbo.createCollection("colSuspensions", function(err, res) {
        //if (err) throw err;

        dbo.createCollection("colTimeLogs", function(err, res) {
          //if (err) throw err;

          dbo.createCollection("colTimeRequests", function(err, res) {
            //if (err) throw err;
            console.log("All collections created!");
            client.close();
          });
        });
      });
    });
  });
});

/**** Partials ****/
hbs.registerPartials(__dirname+ "/views/partials");

index.set("view engine", "hbs");

/**Configuration for handling API endpoint data */
index.use(bodyParser.json());
index.use(bodyParser.urlencoded({ extended: true }));

/********* Routing *********/
const indexRoutes = require('./router/indexRoutes');
const profileRoutes = require('./router/profileRoutes');
const recordsRoutes = require('./router/recordsRoutes');
const sendRequestRoutes = require('./router/sendRequestRoutes');
const pendingRequestsRoutes = require('./router/pendingRequestsRoutes');
const viewAnalyticsRoutes = require('./router/viewAnalyticsRoutes');
const manageAccountsRoutes = require('./router/manageAccountsRoutes');
const sendNotificationRoutes = require('./router/sendNotificationRoutes');
const holidaysRoutes = require('./router/holidaysRoutes');
const registerRoutes = require('./router/indexRoutes');
const recordsCUHRoutes = require('./router/recordsCUHRoutes');

/********* Routing *********/
index.use('/', indexRoutes); //logout will also be directed here
index.use('/profile', profileRoutes);
index.use('/records', recordsRoutes);
index.use('/send-request', sendRequestRoutes);
index.use('/pending-request', pendingRequestsRoutes);
index.use('/view-analytics', viewAnalyticsRoutes);
index.use('/manage-accounts', manageAccountsRoutes);
index.use('/send-notification', sendNotificationRoutes);
index.use('/holidays', holidaysRoutes);
index.use('/register', registerRoutes);
index.use('/recordsCUH', recordsCUHRoutes);

/** Helper Functions **/
hbs.registerHelper("navBuilder", (sPage, sUserType)=>{
    let element = '';
    let navs = ['Dashboard', 'Profile', 'Records', 'Send Request', 'Pending Requests', 'View Analytics', 'Manage Accounts', 'Send Notification','Holidays', 'Logout'];
    let url = ['/', '/profile', '/records', '/send-request', '/pending-requests', '/view-analytics', '/manage-accounts', '/send-notification','/holidays', '/logout'];
    let visible = [];

    if (sUserType === 'Student Representative'){
        visible = [true, true, true, true, false, false, false, false, false, true];
    }
    else if (sUserType === 'Human Resource Representative'){
        visible = [true, true, true, true, true, true, false, true, false, true];
    }
    else{
        visible = [true, true, true, false, true, true, true, true, true, true];
    }

    let i=0;
    while (i<navs.length){
        if (visible[i]){
            if (sPage === navs[i]){
                element += '<a class="nav-link active" href="'+ url[i] + '">' + navs[i] + '</a>';
            }
            else{
                element += '<a class="nav-link" href="'+ url[i] + '">' + navs[i] + '</a>';
            }
        }
        i++;
    }
    return new hbs.SafeString(element);
});

/**Static hosting */
index.use(express.static('public'));

/** Server online **/
index.listen(port, function()
{
    console.log("Server ready.");
});
// app.listen(process.env.PORT, process.env.LOCAL_ADDRESS, ()=>{
//     console.log("Server ready.");
// });