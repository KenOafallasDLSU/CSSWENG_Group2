const mongoose = require("mongoose");
const databaseURL = "mongodb://localhost:27012/residencydb";

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false };

mongoose.connect(databaseURL, options);

const CUHSchema = new mongoose.Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true},
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},

        email: {type: String, required: true}
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

module.exports = mongoose.model("CUH", CUHSchema);