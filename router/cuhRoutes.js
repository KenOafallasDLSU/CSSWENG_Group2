const express = require('express');
const router = express();

/* controllers that provide functions depending on post or get */
const controller = require('../controllers/cuhController');

/********* routes *********/

/* dashboard */
router.get(['/', '/dashboard'] , controller.getDashboard);

module.exports = router;