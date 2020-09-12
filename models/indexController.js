const indexController = {
    getDashboard: function (req, res) {
        res.render("dashboard", {
            sPage: "Dashboard",
            sUserType: "Student Representative",
        })
    },

    getLogin: function (req, res, next){
        res.render("login", {
            sPage: "Login"
        })
    },

    getRegister: function (req, res){
        res.render("register", {
            sPage: "Register"
        })
    },

    postRegister: function (req, res) {
		
		var errors = validationResult(req);
		
		if (!errors.isEmpty()) {

            errors = errors.errors;
			
            var details = {};
            for(i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;

            res.render('register', details);
        }
		else{
			
			var sUsername = req.body.sUsername;
			var sPassword = req.body.sPassword;
			var sFirstname = req.body.sFirstname;
			var sLastname = req.body.sLastname;
			
			
			var sEmail = req.body.sEmail;
			
			var sCollege = req.body.sCollege;
			var sCourse = req.body.sCourse;
			
			
			bcrypt.hash(sPassword, saltRounds, function(err, hash) {
			
				db.insertOne(SRep, {
					sUsername: sUsername,
					password: hash,
					sFirstname: sFirstname,
					sLastname : sLastname,
					
					sEmail: sEmail,
					
                    sCollege: sCollege,
                    
					sCourse: sCourse,
					bActiveStatus: true,
					bHRStatus: false,
					cAccStatus:'P'

				}, function(flag){});
			
			});

			console.log('Created account of ' + sLastname + "," + sFirstname );
			res.render('register');
		}
    },

	checkID: function (req, res) {
        var Username = req.query.Username;
        db.findOne(SRep, {Username: Username}, "Username", function (result) {
            res.send(result);
        });
    },
}

module.exports = indexController;