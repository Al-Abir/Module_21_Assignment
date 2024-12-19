const jwt = require('jsonwebtoken');


module.exports =(req,res,next)=>{

     let token = req.headers['token'];
    jwt.verify(token,"abir123",(err,decoded)=>{
      if(err){
        res.status(401).json({status:"unautorized"})
      }else{
        let FirstName = decoded['data']['FirstName'];
        req.headers.FirstName = FirstName;
        next()
      }
    })

}