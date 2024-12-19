const ProfileModel = require('../models/ProfileModel');

exports.CreateProfile = async (req, res) => {
    try {
        if (!req.body.FirstName || !req.body.NID) {
            return res.status(400).json({ message: "FirstName and NID are required" });
        }

        const newProfile = await ProfileModel.create(req.body);

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


exports.SelectProfile = (req, res) => {
    const { FirstName, NID } = req.user;

    ProfileModel.find({ FirstName, NID })
        .then((data) => {
            res.status(200).json({ status: "success", data });
        })
        .catch((error) => {
            res.status(400).json({ status: "fail", message: error.message });
        });
};


exports.UpdateProfile = async (req, res) => {
    const { FirstName, NID } = req.user;
    const updateData = req.body;

    if (!FirstName || !NID) {
        return res.status(400).json({ message: 'FirstName and NID are required' });
    }

    try {
        const updatedProfile = await ProfileModel.updateOne({ NID }, { $set: updateData });

        if (updatedProfile.matchedCount === 0) {
            return res.status(404).json({ message: "Profile not found with the given NID" });
        }

        res.status(200).json({ status: "success", message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ status: "fail", message: "Failed to update profile", error: error.message });
    }
};



exports.DeleteProfile = async (req, res) => {
    const { NID } = req.user;

    if (!NID) {
        return res.status(400).json({ message: 'NID is required to delete a profile' });
    }

    try {
        const deleteResult = await ProfileModel.deleteOne({ NID });

        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: "Profile not found with the given NID" });
        }

        res.status(200).json({ status: "success", message: "Profile deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: "fail", message: "Failed to delete profile", error: error.message });
    }
};