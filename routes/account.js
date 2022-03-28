const express = require('express');
const router = express.Router();

const accountController = require('../controllers/account');
//const locals = require('../middleware/locals');

router.get('/login', accountController.getLogin);
router.post('/login', accountController.postLogin);

router.get('/register', accountController.getRegister);
router.post('/register', accountController.postRegister);

//router.get('/logout', accountController.getLogout);

router.get('/reset-password', accountController.getReset);
router.post('/reset-password', accountController.postReset);

//router.get('/reset-password/:token', accountController.getNewPassword);
//router.post('/new-password', accountController.postNewPassword);

module.exports = router;
