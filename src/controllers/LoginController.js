const ProfileModel = require("../models/ProfileModel");
const jwt = require("jsonwebtoken");

exports.UserLogin = (req, res) => {
  const FirstName = req.body["FirstName"];
  const Password = req.body["Password"];

  ProfileModel.findOne({ FirstName: FirstName, Password: Password })
    .then(user => {
      if (user) {
        // Create auth token
        const payload = {
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // Token expires in 24 hours
          data: {
            FirstName: user.FirstName,
            NID: user.NID,
          },
        };

        const token = jwt.sign(payload, "abir123");

        // Set token as a cookie
        res
          .cookie("auth_token", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000, 
          })
          .status(200)
          .json({ status: "success", token: token, data: user });
      } else {
        res.status(401).json({ status: "fail", message: "Invalid credentials" });
      }
    })
    .catch(err => {
      res.status(500).json({ status: "error", message: err.message });
    });
};
