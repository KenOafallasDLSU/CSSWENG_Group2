const mongoose = require("mongoose");
const databaseURL = "mongodb://localhost:27017/residencydb";
//const databaseURL = "mongodb+srv://Admin:a1b2c3d4%21@occs-residency-system.jflhq.gcp.mongodb.net/residencydb?retryWrites=true&w=majority";

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false };

mongoose.connect(databaseURL, options);

const SuspensionSchema = new mongoose.Schema(
    {
        objDate: {type: Date, required: true},
        sReason: {type: String, required: true}
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

TimeLogSchema.virtual("sDate").get(function() {
    var sYear = this.objDate.getFullYear().toString();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var sMonth = months[this.objTimeIn.getMonth()];
    var sDay = this.objTimeIn.getDate().toString();

    return sMonth + " " + sDay + ", " + sYear; 
});

module.exports = mongoose.model('Suspension', SuspensionSchema);
