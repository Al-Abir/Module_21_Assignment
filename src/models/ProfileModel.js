const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    FirstName: {type:String,require:true},
    LastName:{type:String},
    NID: {
        type:String,
        require: true,
        unique: true

     },
     PhoneNumber: {type:String},
     Password:{type:String},
     BooldGroup: {type:String}
},{versionKey:false})

const ProfileModel = mongoose.model('users',DataSchema)// datrabase collection name and dataSchema

module.exports = ProfileModel;