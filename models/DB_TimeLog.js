const mongoose = require("mongoose");
const databaseURL = "mongodb://localhost:27012/residencydb";

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

module.exports = mongoose.model("TimeLog", TimeLogSchema);