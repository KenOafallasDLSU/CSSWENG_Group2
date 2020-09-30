const express = require('express');
const router = express();

router.use(express.static('public'));
//router.use(express.static('pending-requests'));

/* controllers that provide functions depending on post or get */
const controller = require('../controllers/cuhController');
const authentication = require('../middlewares/cuhAuthentication.js');

/********* routes *********/

/* dashboard */
//router.get(['/:sUsername', '/dashboard/:sUsername'], authentication.sessionActive, authentication.isValidCUH,controller.getDashboard);

/* records */
router.get(['/:sUsername'], authentication.sessionActive, authentication.isValidCUH, controller.getRecordsCUH);
router.post(['/postRecordsCUHOne'], controller.postRecordsCUHOne);
router.post(['/postRecordsCUHAll'], controller.postRecordsCUHAll);

/* changePassword */
router.get(['/changePassword/:sUsername'], authentication.sessionActive, authentication.isValidCUH,controller.getChangePassword);
router.post(['/changePassword/:sUsername'], authentication.sessionActive, authentication.isValidCUH,controller.postChangePassword);


/* analytics */
router.get(['/view-analytics/:sUsername'], authentication.sessionActive, authentication.isValidCUH, controller.getViewAnalytics);
router.post(['/view-analytics/postHoursPerWeekday'], controller.postHoursPerWeekday);
router.post(['/view-analytics/postHoursPerSRep'], controller.postHoursPerSRep);

/* suspensions */
router.get(['/holidays/:sUsername'], authentication.sessionActive, authentication.isValidCUH, controller.getSuspensions);
router.post(['/holidays/postInsertSuspension'], controller.postInsertSuspension);

/* requests */
router.get(['/pending-requests/:sUsername'], authentication.sessionActive, authentication.isValidCUH, controller.getPendingTimelogs);
router.post(['/pending-requests/postUpdateRequest'], controller.postUpdateRequest);

module.exports = router;