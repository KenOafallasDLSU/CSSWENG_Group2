const registerController = {
    getRegister: function (req, res) {
        res.render("dashboard", {
            sPage: "Register",
        })
    }
}

module.exports = registerController;