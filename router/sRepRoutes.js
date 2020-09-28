const express = require('express');
const router = express();

/* controllers that provide functions depending on post or get */
const controller = require('../controllers/sRepController');
const authentication = require('../middlewares/sRepAuthentication.js');

/********* routes *********/

/* dashboard */
router.get(['/:sUsername', '/dashboard/:sUsername'] , authentication.sessionActive, authentication.isValidSRep, controller.getDashboard);
/* records */
router.get(['/recordsSRep'], controller.getRecordsSRep);
/* profile */
router.get("/profile/:sUsername", authentication.sessionActive, authentication.isValidSRep, controller.getProfile);

module.exports = router;