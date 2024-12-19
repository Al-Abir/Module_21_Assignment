const ProfileModel = require('../models/ProfileModel'); // Ensure you import your model correctly

exports.CreateProfile = async (req, res) => {
    try {
        const newProfile = await ProfileModel.create(req.body); // Use async/await
        res.status(201).json({
            message: 'Profile created successfully',
            data: newProfile,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Failed to create profile',
            error: error.message,
        });
    }
};

exports.SelectProfile = (req, res)=>{
    let FirstName = req.headers['FirstName']

    ProfileModel.find({FirstName:FirstName})
    .then(data=>{
         res.status(200).json({status:"success", data: data})
    }).catch(error=>{
        res.status(400).json({status:"fail", data:err})
    })
}


