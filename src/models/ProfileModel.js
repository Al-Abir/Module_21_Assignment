const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String },
    NID: {
        type: String,
        required: true,
        unique: true
    },
    PhoneNumber: { type: String },
    Password: { type: String },
    BooldGroup: { type: String },
    Role: { type: String, enum: ["user", "admin"], default: "user" } 
},
{
    timestamps: true // Automatically manages createdAt and updatedAt fields
});

const ProfileModel = mongoose.model('users', DataSchema); // Database collection name and schema

module.exports = ProfileModel;
