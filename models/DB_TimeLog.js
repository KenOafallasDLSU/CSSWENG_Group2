const mongoose = require("mongoose");
const databaseURL = "mongodb://localhost:27012/residencydb";

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false };

mongoose.connect(databaseURL, options);

const TimeLogSchema = new mongoose.Schema(
    {
        SRep: {type: mongoose.Schema.Types.ObjectId, ref: "SRep", required: true},

        timeIn: {type: Date, required: true, default: new Date()},
        timeOut: {type: Date, required: false},
        task: {type: String, required: false}
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

module.exports = mongoose.model("TimeLog", TimeLogSchema);