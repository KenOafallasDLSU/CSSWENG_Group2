const mongoose = require("mongoose");
const databaseURL = "mongodb://localhost:27017/residencydb";
//const databaseURL = "mongodb+srv://Admin:a1b2c3d4%21@occs-residency-system.jflhq.gcp.mongodb.net/residencydb?retryWrites=true&w=majority";

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false };

mongoose.connect(databaseURL, options);

const TimeLogSchema = new mongoose.Schema(
    {
        objSRep: {type: mongoose.Schema.Types.ObjectId, ref: "SRep", required: true},

        objTimeIn: {type: Date, required: true, default: new Date()},
        objTimeOut: {type: Date, required: false},
        sTask: {type: String, required: false}
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

TimeLogSchema.virtual("sDate").get(function() {
    var sYear = this.objTimeIn.getFullYear().toString();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var sMonth = months[this.objTimeIn.getMonth()];
    var sDay = this.objTimeIn.getDate().toString();

    return sMonth + " " + sDay + ", " + sYear; 
});

TimeLogSchema.virtual("sTimeIn").get(function() {
    var bIsAM = true;
    var nHour = this.objTimeIn.getHours();
    var sHour = nHour.toString();
    if(nHour <= 9){
        sHour = "0" + sHour;
    } else if(nHour >= 12 && nHour <= 21){
        sHour = "0" + (nHour - 12).toString();
        bIsAM = false;
    } else if(nHour >= 22){
        bIsAM = false;
    }

    var nMin = this.objTimeIn.getMinutes();
    var sMin = nMin.toString();
    if(nMin <= 9){
        sMin = "0" + sMin;
    }

    var sTimeOut = sHour + ":" + sMin;
    if(bIsAM){
        sTimeOut = sTimeOut + " AM";
    } else{
        sTimeOut = sTimeOut + " PM";
    }

    return sTimeOut;
});

TimeLogSchema.virtual("sTimeOut").get(function() {
    var bIsAM = true;
    var nHour = this.objTimeOut.getHours();
    var sHour = nHour.toString();
    if(nHour <= 9){
        sHour = "0" + sHour;
    } else if(nHour >= 12 && nHour <= 21){
        sHour = "0" + (nHour - 12).toString();
        bIsAM = false;
    } else if(nHour >= 22){
        bIsAM = false;
    }

    var nMin = this.objTimeOut.getMinutes();
    var sMin = nMin.toString();
    if(nMin <= 9){
        sMin = "0" + sMin;
    }

    var sTimeOut = sHour + ":" + sMin;
    if(bIsAM){
        sTimeOut = sTimeOut + " AM";
    } else{
        sTimeOut = sTimeOut + " PM";
    }

    return sTimeOut;
});

TimeLogSchema.virtual("fHours").get(function() {
    var fTimeIn = this.objTimeIn.getTime();
    var fTimeOut = this.objTimeOut.getTime();
    var fHours = (fTimeOut - fTimeIn)/3600000;

    return fHours.toFixed(2);
});

module.exports = mongoose.model("TimeLog", TimeLogSchema);