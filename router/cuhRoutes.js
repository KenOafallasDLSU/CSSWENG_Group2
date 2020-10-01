
const express = require('express');
const router = express();

router.use(express.static('public'));
<<<<<<< Updated upstream

/* controllers that provide functions depending on post or get */
const controller = require('../controllers/cuhController');
=======
/* controllers that provide functions depending on post or get */
const controller = require('../controllers/cuhController');
const MAcontroller = require('../controllers/manageAccountsController');

>>>>>>> Stashed changes
const authentication = require('../middlewares/cuhAuthentication.js');

/********* routes *********/


/* dashboard */
router.get(['/:sUsername', '/dashboard/:sUsername'], authentication.sessionActive, authentication.isValidCUH,controller.getDashboard);

/* records */
router.get(['/records/:sUsername'], authentication.sessionActive, authentication.isValidCUH, controller.getRecordsCUH);
router.post(['/postRecordsCUHOne'], controller.postRecordsCUHOne);
router.post(['/postRecordsCUHAll'], controller.postRecordsCUHAll);

/* changePassword */
router.get(['/changePassword/:sUsername'], authentication.sessionActive, authentication.isValidCUH,controller.getChangePassword);
router.post(['/changePassword/:sUsername'], authentication.sessionActive, authentication.isValidCUH,controller.postChangePassword);


/* analytics */
router.get(['/view-analytics/:sUsername'], authentication.sessionActive, authentication.isValidCUH, controller.getViewAnalytics);
router.post(['/postHoursPerWeekday'], controller.postHoursPerWeekday);
router.post(['/postHoursPerSRep'], controller.postHoursPerSRep);
<<<<<<< Updated upstream
=======

/*manage accounts*/
>>>>>>> Stashed changes

router.get(['/manage-accounts/:sUsername'], authentication.sessionActive, authentication.isValidCUH,MAcontroller.getManageAccount);
router.post(['/manage-accounts/postCreateCUH'], MAcontroller.postCUHRegister);
router.post(['/manage-accounts/postGrantHRAccess'] ,MAcontroller.postAccept);
router.post(['/manage-accounts/postRevokeHRAccess'],MAcontroller.postRevoke);
/* suspensions */
router.get(['/holidays/:sUsername'], authentication.sessionActive, authentication.isValidCUH, controller.getSuspensions);
router.post(['/postInsertSuspension'], controller.postInsertSuspension);

/* requests */
router.get(['/pending-requests/:sUsername'], authentication.sessionActive, authentication.isValidCUH, controller.getPendingTimelogs);
router.post(['/postUpdateRequest'], controller.postUpdateRequest);

module.exports = router;