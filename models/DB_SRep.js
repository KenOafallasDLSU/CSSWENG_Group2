const mongoose = require("mongoose");
const databaseURL = "mongodb://localhost:27012/residencydb";

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false };

mongoose.connect(databaseURL, options);

const SRepSchema = new mongoose.Schema(
    {
        username: {type: Number, required: true},
        password: {type: String, required: true},
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},

        email: {type: String, required: true},
        
        course: {type: String, required: true},
        college: {type: String, required: true},

        activeStatus: {type: Boolean, required: true, default: true},
        HRStatus: {type: Boolean, required: true, default: false},
        accStatus: {type: String, required: true, enum: ["A", "P", "R"], default: "P"}
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

module.exports = mongoose.model('SRep', SRepSchema);