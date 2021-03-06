const mongoose = require("mongoose");
const databaseURL = "mongodb://localhost:27017/residencydb";
//const databaseURL = "mongodb+srv://Admin:a1b2c3d4%21@occs-residency-system.jflhq.gcp.mongodb.net/residencydb?retryWrites=true&w=majority";

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false };

mongoose.connect(databaseURL, options);

const SRepSchema = new mongoose.Schema(
    {
        sUsername: {type: String, required: true},
        sPassword: {type: String, required: true},
        sFirstName: {type: String, required: true},
        sLastName: {type: String, required: true},

        sEmail: {type: String, required: true},
        
        sCourse: {type: String, required: true},
        sCollege: {type: String, required: true},

        bActiveStatus: {type: Boolean, required: true, default: true},
        bHRStatus: {type: Boolean, required: true, default: false},
        cAccStatus: {type: String, required: true, enum: ["A", "P", "R"], default: "P"}
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

SRepSchema.virtual("sFullName").get(function() {
    return this.sFirstName + " " +  this.sLastName;
});

module.exports = mongoose.model('SRep', SRepSchema);