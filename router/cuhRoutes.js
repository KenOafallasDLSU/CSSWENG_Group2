const express = require('express');
const router = express();

/* controllers that provide functions depending on post or get */
const controller = require('../controllers/cuhController');
const MAcontroller = require('../controllers/manageAccountsController');

const authentication = require('../middlewares/cuhAuthentication.js');

/********* routes *********/

/* dashboard */
router.get(['/:sUsername', '/dashboard/:sUsername'], authentication.sessionActive, authentication.isValidCUH,controller.getDashboard);

/* records */
router.get(['/records'], authentication.sessionActive, authentication.isValidCUH, controller.getRecordsCUH);
router.post(['/postRecordsCUHOne'], controller.postRecordsCUHOne);
router.post(['/postRecordsCUHAll'], controller.postRecordsCUHAll);

/* analytics */
router.get(['/analytics'], authentication.sessionActive, authentication.isValidCUH, controller.getViewAnalytics);
router.post(['/postHoursPerWeekday'], controller.postHoursPerWeekday);
router.post(['/postHoursPerSRep'], controller.postHoursPerSRep);

/*manage accounts*/

router.get(['/manage-accounts'], authentication.sessionActive, authentication.isValidCUH,MAcontroller.getManageAccount);
router.post(['/manage-accounts/postCreateCUH'], authentication.sessionActive, authentication.isValidCUH,MAcontroller.postCUHRegister);
router.post(['/manage-accounts/postGrantHRAccess'], authentication.sessionActive, authentication.isValidCUH,MAcontroller.postAccept);
router.post(['/manage-accounts/postRevokeHRAccess'], authentication.sessionActive, authentication.isValidCUH,MAcontroller.postRevoke);

module.exports = router;