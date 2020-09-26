const mongoose = require("mongoose");
const databaseURL = "mongodb://localhost:27017/residencydb";
//const databaseURL = "mongodb+srv://Admin:a1b2c3d4%21@occs-residency-system.jflhq.gcp.mongodb.net/residencydb?retryWrites=true&w=majority";

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false };

mongoose.connect(databaseURL, options);

const TimeLogSchema = new mongoose.Schema(
    {
        // objSRep: {type: mongoose.Schema.Types.ObjectId, ref: "SRep", required: true},
        sUserName: {type: String, required: true},
        objTimeIn: {type: Date, required: true},
        objTimeOut: {type: Date, required: false},
        sTask: {type: String, required: false},
        cStatus:{type:String , required:true, enum:["A" , "P", "R"], default: "P"}
     
       
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
    var sHour = this.objTimeIn.getHours().toString();
    if(this.objTimeIn.getHours() <= 9){
        sHour = "0" + sHour;
    }

    var sMin = this.objTimeIn.getMinutes().toString();
    if(this.objTimeIn.getMinutes() <= 9){
        sMin = "0" + sMin;
    }
    
    return sHour + ":" + sMin;
});


TimeLogSchema.virtual("sTimeOut").get(function() {
    if(this.objTimeOut){

        var sHour = this.objTimeOut.getHours().toString();
        if(this.objTimeOut.getHours() <= 9){
            sHour = "0" + sHour;
        }
    
        var sMin = this.objTimeOut.getMinutes().toString();
        if(this.objTimeOut.getMinutes() <= 9){
            sMin = "0" + sMin;
        }
    
        return sHour + ":" + sMin;
    }
  return false;
});

TimeLogSchema.virtual("fHours").get(function() {
    if(this.objTimeOut){
        var fTimeIn = this.objTimeIn.getTime();
        var fTimeOut = this.objTimeOut.getTime();
        var fHours = (fTimeOut - fTimeIn)/3600000;
    
        return fHours.toFixed(2);
    }
   return false;
});

module.exports = mongoose.model("TimeLog", TimeLogSchema);