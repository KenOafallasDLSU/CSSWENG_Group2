const recordsCUHController = {
    getRecordsCUH: function (req, res) {
        res.render("recordsCUH", {
            sPage: "CUH Records",
            sUserType: "CUH",
        })
    }
}

module.exports = recordsCUHController;