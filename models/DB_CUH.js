const mongoose = require("mongoose");
const databaseURL = "mongodb://localhost:27012/residencydb";

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false };

mongoose.connect(databaseURL, options);

const CUHSchema = new mongoose.Schema(
    {
        sUsername: {type: String, required: true},
        sPassword: {type: String, required: true},
        sFirstName: {type: String, required: true},
        sLastName: {type: String, required: true},

        sEmail: {type: String, required: true}
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

module.exports = mongoose.model("CUH", CUHSchema);