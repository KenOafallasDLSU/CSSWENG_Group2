const express = require('express');
const router = express();

/* controllers that provide functions depending on post or get */
const controller = require('../controllers/sRepController');
const authentication = require('../middlewares/sRepAuthentication.js');
const timeLogControllers = require('../controllers/timeLogController');
/********* routes *********/

/* dashboard */
router.get(['/:sUsername', '/dashboard/:sUsername'] , authentication.sessionActive, authentication.isValidSRep, controller.getDashboard);
/* records */
router.get(['/recordsSRep'], controller.getRecordsSRep);


// time in time out
// router.get(['/:sUsername', '/dashboard/:sUsername'] , authentication.sessionActive, authentication.isValidSRep, timeLogControllers.getDashboard);
// router.get("/" , timeLogControllers.getDashboard);

router.post(['/:sUsername', '/dashboard/:sUsername'] , authentication.sessionActive, authentication.isValidSRep, timeLogControllers.postTimeLog);
// router.post("/", timeLogControllers.postDashboard);


router.get(['/:sUsername', '/dashboard2/:sUsername'] , authentication.sessionActive, authentication.isValidSRep, controller.getDashboard2);
// router.get("/" , timeLogControllers.getDashboard);

router.post(['/:sUsername', '/dashboard2/:sUsername'] , authentication.sessionActive, authentication.isValidSRep, timeLogControllers.postTimeOut);



router.get(['/:sUsername', '/sendRequest/:sUsername'] , authentication.sessionActive, authentication.isValidSRep, controller.getSendRequest);
// router.get("/" , timeLogControllers.getSendRequest);

//router.post(['/:sUsername', '/sendRequest/:sUsername'] , authentication.sessionActive, authentication.isValidSRep, timeLogControllers.postSendRequest);

module.exports = router;