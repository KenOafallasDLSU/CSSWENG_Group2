const express = require('express');
const router = express();

/* controllers that provide functions depending on post or get */
const controller = require('../controllers/indexController');
const validation = require('../middlewares/validation');

/* routes */
router.get("/" , controller.getDashboard);

/* login */
router.get("/login", /* insert session authentication,*/ controller.getLogin);
router.post("/login", /* insert loginValidation(),*/ controller.postLogin);

/* register */
router.get('/register', controller.getRegister);
router.post('/register', validation.registerValidation(),controller.postRegister);
router.get('/checkID', controller.checkID);

module.exports = router;
