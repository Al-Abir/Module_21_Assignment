const express = require('express');
const  ProfileController = require("../controllers/ProfileController")
const  LoginController =  require("../controllers/LoginController")
const AlluserRead = require('../controllers/AlluserRead')
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware")

const router = express.Router();


router.post('/CreateProfile',ProfileController.CreateProfile)
router.post('/UserLogin',LoginController.UserLogin);
router.get('/SelectProfile',  AuthVerifyMiddleware,ProfileController.SelectProfile)
router.put('/UpdateProfile',AuthVerifyMiddleware,ProfileController.UpdateProfile)
router.delete('/DeleteProfile',AuthVerifyMiddleware, ProfileController.DeleteProfile)
router.get('/getAlluser',AlluserRead.getAlluser)

module.exports = router;
