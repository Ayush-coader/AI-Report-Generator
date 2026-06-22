const jwt=require('jsonwebtoken')
const blacklistModel=require("../models/blacklist.model")

async function authuser(req,res, next){
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({message:"token not provided"})
    }
    const istokenblacklisted= await blacklistModel.findOne({
        token
    })
    
    if(istokenblacklisted){
        return res.status(401).json({
            message:"toaken is invalid"
        })
    }


    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
    }
    catch(err){
        return res.status(401).json({message:"token is invalid"})
    }    
}

module.exports={authuser}