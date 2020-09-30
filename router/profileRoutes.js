const express = require('express');
const router = express();

/* controllers that provide functions depending on post or get */
const controller = require('../controllers/profileController');

/* routes */
router.get("/" , controller.getProfile);

module.exports = router;