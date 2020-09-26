const express = require('express');
const router = express();

/* controllers that provide functions depending on post or get */
const controller = require('../controllers/sRepController');
const authentication = require('../middlewares/sRepAuthentication.js');
const timeLogControllers = require('../controllers/timeLogController');
/********* routes *********/

/* dashboard */
router.get(['/:sUsername', '/dashboard/:sUsername'] , authentication.sessionActive, authentication.isValidSRep, controller.getDashboard);


// time in time out
// router.get(['/:sUsername', '/dashboard/:sUsername'] , authentication.sessionActive, authentication.isValidSRep, timeLogControllers.getDashboard);
// router.get("/" , timeLogControllers.getDashboard);

router.post(['/:sUsername', '/dashboard/:sUsername'] , authentication.sessionActive, authentication.isValidSRep, timeLogControllers.postTimeLog);
// router.post("/", timeLogControllers.postDashboard);


router.get(['/:sUsername', '/dashboard2/:sUsername'] , authentication.sessionActive, authentication.isValidSRep, controller.getDashboard2);
// router.get("/" , timeLogControllers.getDashboard);
module.exports = router;