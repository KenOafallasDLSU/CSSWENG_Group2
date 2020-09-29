const express = require('express');
const router = express();

/* controllers that provide functions depending on post or get */
const controller = require('../controllers/cuhController');
const authentication = require('../middlewares/cuhAuthentication.js');

/********* routes *********/

/* dashboard */
router.get(['/:sUsername', '/dashboard/:sUsername'], authentication.sessionActive, authentication.isValidCUH,controller.getDashboard);

/* records */
router.get(['/recordsCUH'], authentication.sessionActive, authentication.isValidCUH, controller.getRecordsCUH);
router.post(['/postRecordsCUHOne'], controller.postRecordsCUHOne);
router.post(['/postRecordsCUHAll'], controller.postRecordsCUHAll);

/* analytics */
router.get(['/analytics'], authentication.sessionActive, authentication.isValidCUH, controller.getViewAnalytics);
router.post(['/postViewAnalytics'], controller.postViewAnalytics);

module.exports = router;