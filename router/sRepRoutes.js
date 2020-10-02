const express = require('express');
const router = express();

/* controllers that provide functions depending on post or get */
const controller = require('../controllers/sRepController');
const authentication = require('../middlewares/sRepAuthentication.js');
const timeLogControllers = require('../controllers/timeLogController');
const authenticationHR = require('../middlewares/hrAuthentication.js');
const controllerCUH = require('../controllers/cuhController');
/********* routes *********/

/* dashboard */
router.get(['/:sUsername', '/dashboard/:sUsername'] , authentication.sessionActive, authentication.isValidSRep, controller.getDashboard);
/* records */
router.get(['/records', '/records/:sUsername'], authentication.sessionActive, authentication.isValidSRep, controller.getRecordsSRep);


// time in time out
// router.get(['/:sUsername', '/dashboard/:sUsername'] , authentication.sessionActive, authentication.isValidSRep, timeLogControllers.getDashboard);
// router.get("/" , timeLogControllers.getDashboard);

router.post(['/:sUsername', '/dashboard/:sUsername'] , authentication.sessionActive, authentication.isValidSRep, timeLogControllers.postTimeLog);
// router.post("/", timeLogControllers.postDashboard);


router.get(['/:sUsername', '/dashboard2/:sUsername'] , authentication.sessionActive, authentication.isValidSRep, controller.getDashboard2);
// router.get("/" , timeLogControllers.getDashboard);

router.post(['/:sUsername', '/dashboard2/:sUsername'] , authentication.sessionActive, authentication.isValidSRep, timeLogControllers.postTimeOut);

// send request paths
router.get(['/send-request', '/send-request/:sUsername'] , authentication.sessionActive, authentication.isValidSRep, controller.getSendRequest);
router.post(['/send-request', '/send-request/:sUsername'] , authentication.sessionActive, authentication.isValidSRep, timeLogControllers.postSendRequest);

/* profile */
router.get("/profile/:sUsername", authentication.sessionActive, authentication.isValidSRep, controller.getProfile);

router.get(['/view-analytics/:sUsername'], authentication.sessionActive, authenticationHR.isValidHR, controllerCUH.getViewAnalytics);
router.post(['/view-analytics/postHoursPerWeekday'], controllerCUH.postHoursPerWeekday);
router.post(['/view-analytics/postHoursPerSRep'], controllerCUH.postHoursPerSRep);

//router.get(['/records/:sUsername'], authentication.sessionActive, authenticationHR.isValidHR, controllerCUH.getRecordsCUH);
//router.get(['/records/:sUsername'], authentication.sessionActive, authentication.isValidSRep, controller.getRecordsSRep);
router.post(['/postRecordsCUHOne'], controllerCUH.postRecordsCUHOne);
router.post(['/postRecordsCUHAll'], controllerCUH.postRecordsCUHAll);

module.exports = router;