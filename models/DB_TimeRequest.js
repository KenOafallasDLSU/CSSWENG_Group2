const mongoose = require("mongoose");
const databaseURL = "mongodb://localhost:27012/residencydb";

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false };

mongoose.connect(databaseURL, options);

const TimeRequestSchema = new mongoose.Schema(
    {
        SRep: {type: mongoose.Schema.Types.ObjectId, ref: "SRep", required: true},

        timeIn: {type: Date, required: true},
        timeOut: {type: Date, required: true},
        task: {type: String, required: true},

        reason: {type: String, required: true},
        status: {type: String, required: true, enum: ["A", "P", "R"], default: "P"}
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

module.exports = mongoose.model("TimeRequest", TimeRequestSchema);
