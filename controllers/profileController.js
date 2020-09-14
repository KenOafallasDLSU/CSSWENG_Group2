const profileController = {
    getProfile: function (req, res) {
        res.render("profile", {
            sPage: "profile",
            sUserType: "Student Representative",
        })
    }
}

module.exports = profileController;