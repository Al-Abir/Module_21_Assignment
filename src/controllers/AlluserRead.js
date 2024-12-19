const ProfileModel = require('../models/ProfileModel');


exports.getAlluser = async (req,res)=>{
    try{
      const users = await ProfileModel.find();
      if(users.length===0){
        return res.status(404).json({message: "User Not Found"})
      }
      return res.status(200).json(users)
    }catch(error){
        res.status(500).json({error:"Internal Server Error"})
    }
}