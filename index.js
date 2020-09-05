const express = require("express");
const hbs = require("hbs");

const index = express();

const port = 3000;

/**** Partials ****/
hbs.registerPartials(__dirname+ "/views/partials");

index.set("view engine", "hbs");

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

/** Server online **/
index.listen(port, function()
{
    console.log("Server ready.");
});
// app.listen(process.env.PORT, process.env.LOCAL_ADDRESS, ()=>{
//     console.log("Server ready.");
// });