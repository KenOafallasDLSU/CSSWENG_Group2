const express = require('express');
const router = express();

/* controllers that provide functions depending on post or get */
const controller = require('../controllers/sRepController');
// const timeLogController = require('../controllers/timeLogController');
/********* routes *********/

/* dashboard */
router.get(['/', '/dashboard'] , controller.getDashboard);

// router.get("/" , timeLogController.getDashboard);
// router.post("/" , timeLogController.postDashboard);

module.exports = router;