const express = require('express');
const  ProfileController = require("../controllers/ProfileController")
const  LoginController =  require("../controllers/LoginController")
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware")
const router = express.Router();

// // Add your routes here
// router.get('/test', (req, res) => {
//   res.json({ message: "API Working!" });
// });

router.post('/CreateProfile',ProfileController.CreateProfile)
router.post('/UserLogin',LoginController.UserLogin);
router.get('/SelectProfile',  AuthVerifyMiddleware,ProfileController.SelectProfile)
router.post('/UpdateProfile',AuthVerifyMiddleware,ProfileController.UpdateProfile)
router.post('/DeleteSingleApi',AuthVerifyMiddleware, ProfileController.DeleteSingleApi)

module.exports = router;
