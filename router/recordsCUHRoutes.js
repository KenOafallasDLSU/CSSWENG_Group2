const express = require('express');
const router = express();

/* controllers that provide functions depending on post or get */
const controller = require('../controllers/recordsCUHController');

/* routes */
router.get("/" , controller.getRecordsCUH);

module.exports = router;