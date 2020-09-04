const mongoose = require("mongoose");
const databaseURL = "mongodb://localhost:27012/residencydb";

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false };

mongoose.connect(databaseURL, options);

const TimeRequestSchema = new mongoose.Schema(
    {
        objSRep: {type: mongoose.Schema.Types.ObjectId, ref: "SRep", required: true},

        objTimeIn: {type: Date, required: true},
        objTimeOut: {type: Date, required: true},
        sTask: {type: String, required: true},

        sReason: {type: String, required: true},
        cStatus: {type: String, required: true, enum: ["A", "P", "R"], default: "P"}
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

module.exports = mongoose.model("TimeRequest", TimeRequestSchema);
