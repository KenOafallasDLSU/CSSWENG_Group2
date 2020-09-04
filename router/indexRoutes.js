const express = require('express');
const router = express();

/* controllers that provide functions depending on post or get */
const controller = require('../controllers/indexController');

/* routes */
router.get("/" , controller.getDashboard);

module.exports = router;