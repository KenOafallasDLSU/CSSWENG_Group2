const express = require('express');
const router = express();

/* controllers that provide functions depending on post or get */
const controller = require('../controllers/indexController');

/* routes */
router.get("/" , controller.getDashboard);

/* login */
router.get("/login", /* insert session authentication,*/ controller.getLogin);
router.post("/login", /* insert loginValidation(),*/ controller.postLogin);

module.exports = router;
