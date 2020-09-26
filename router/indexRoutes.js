const express = require('express');
const router = express();

/* controllers that provide functions depending on post or get */
const controller = require('../controllers/indexController');

const validation = require('../middlewares/validation');
const authentication = require('../middlewares/indexAuthentication.js');

const timeLogControllers = require('../controllers/timeLogController');

/* routes */
router.get("/" , controller.getDashboard);


// time in
// const timeLogController = require('../controllers/timeLogController');
router.get("/" , timeLogControllers.getDashboard);
router.post("/" , timeLogControllers.postTimeLog);
router.post("/"), timeLogControllers.postDashboard;

/* login */
router.get(['/','/login'], authentication.sessionNotActive, controller.getLogin);
router.post(['/', '/login'], validation.loginValidation(), controller.postLogin);

/* register */
router.get('/register', controller.getRegister);
router.post('/register', validation.registerValidation(), controller.postRegister);
router.get('/checkID', controller.checkID);

/* logout */
router.get('/logout', controller.getLogout);

module.exports = router;
