const ProfileModel = require('../models/ProfileModel');
const jwt = require('jsonwebtoken')
exports.UserLogin = (req, res) => {
    let FirstName = req.body['FirstName'];
    let Password = req.body['Password'];

    ProfileModel.find({ FirstName: FirstName, Password: Password })
        .then(data => {
            if (data.length > 0) {
                //create auth token
                let Payload = {
                    exp: Math.floor(Date.now() / 1000) + (24*60 * 60),
                    data:data[0]
                }
                const token = jwt.sign(Payload,'abir123')
                res.status(200).json({ status: "success",token:token,data: data });
            } else {
                res.status(401).json({ status: "fail", message: "Invalid credentials" });
            }
        })
        .catch(err => {
            res.status(500).json({ status: "error", message: err.message });
        });
};
