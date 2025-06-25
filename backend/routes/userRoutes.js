const express = require('express');
const router = express.Router();
const {userController} = require('../controllers/index');

router.post('/register',userController.register);
console.log('register in userController');

router.post('/login',userController.login);

module.exports=router;