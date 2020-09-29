const mongoose = require("mongoose");
const databaseURL = "mongodb://localhost:27017/residencydb";
//const databaseURL = "mongodb+srv://Admin:a1b2c3d4%21@occs-residency-system.jflhq.gcp.mongodb.net/residencydb?retryWrites=true&w=majority";

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false };

mongoose.connect(databaseURL, options);

const SuspensionSchema = new mongoose.Schema(
    {
        nYear: {type: Number, required: true},
        nMonth: {type: Number, required: true},
        nDay: {type: Number, required: true},
        sReason: {type: String, required: true}
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

module.exports = mongoose.model('Suspension', SuspensionSchema);
