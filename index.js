const express = require("express");
const hbs = require("hbs");

/********* Routing *********/
const indexRoutes = require('./router/indexRoutes');

/********* Routing *********/
app.use('/', indexRoutes);

/** Helper Functions **/
hbs.registerHelper("navBuilder", (sPage, sUserType)=>{
    let element = '';
    let navs = ['Dashboard', 'Profile', 'Records', 'Send Request', 'Pending Requests', 'View Analytics', 'Manage Accounts', 'Send Notification','Holidays', 'Logout'];
    let url = ['/dashboard', '/profile', '/records', '/send-request', '/pending-requests', '/view-analytics', '/manage-accounts', '/send-notification','/holidays', '/logout'];
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
app.listen(process.env.PORT, process.env.LOCAL_ADDRESS, ()=>{
    console.log("Server ready.");
});