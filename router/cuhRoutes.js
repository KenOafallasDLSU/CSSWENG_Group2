const express = require('express');
const router = express();

/* controllers that provide functions depending on post or get */
const controller = require('../controllers/cuhController');
const authentication = require('../middlewares/cuhAuthentication.js');

/********* routes *********/

/* dashboard */
router.get(['/:sUsername', '/dashboard/:sUsername'], authentication.sessionActive, authentication.isValidCUH,controller.getDashboard);

/* records */
router.get(['/'], controller.getRecordsCUH);

module.exports = router;