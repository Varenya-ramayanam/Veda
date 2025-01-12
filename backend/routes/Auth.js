const router = require('express').Router();
const authController = require('../controllers/Auth');

router
    .post('/signup', authController.signup)
    .post('/login', authController.login);


module.exports = router;