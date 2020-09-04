const mongoose = require("mongoose");
const databaseURL = "mongodb://localhost:27012/residencydb";

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false };

mongoose.connect(databaseURL, options);

const SuspensionSchema = new mongoose.Schema(
    {
        date: {type: Date, required: true},
        reason: {type: String, required: true}
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

module.exports = mongoose.model('Suspension', SuspensionSchema);
