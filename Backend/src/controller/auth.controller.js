const userModel=require("../models/user.model")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const blacklistModel=require("../models/blacklist.model")



/**
 * @name registerusercontroller
 * @description register new user
 * @access public
 */

async function registerusercontroller(req,res){
    const {username,email,password}=req.body
    try {
        if(!username||!email||!password){
            return res.status(400).json({message:"all fields are required"})
        }

        const isUserAlreadyexist=await userModel.findOne({
            $or:[{email},{username}]
        })

        if(isUserAlreadyexist){
            return res.status(400).json({message:"user already exists"})
        }

        const hash=await bcrypt.hash(password,10)

        const user= await userModel.create({
            username,
            email,
            password:hash
        })

        const token=jwt.sign({
            id:user._id,username:user.username},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
    )
        res.cookie("token",token)
        res.status(201).json({
            message:"user registed successfully",
            user:{
                _id:user._id,
                username:user.username,
                email:user.email
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
}

/**
 * @name loginusercontroller
 * @description login user
 * @access public
 */

async function loginusercontroller(req,res){
    const {email,password}=req.body
    
    const user= await userModel.findOne({email})

    if(!user){
       return res.status(400).json({message:"user not found"})
    }

    const ispasswordvalid=await bcrypt.compare(password,user.password)

    if(!ispasswordvalid){
        return res.status(400).json({message:"invalid password"})
    }

    const token=jwt.sign({
        id:user._id,
        username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000
});
    res.status(200).json({
        message:"user login successfully",
        user:{
            _id:user._id,
            username:user.username,
            email:user.email
        }
    })
    
}

/**
 * @name logoutusercontroller
 * @description logout user
 * @access public
 */

async function logoutusercontroller(req,res){
    try {
        const token=req.cookies?.token
        if(token){
            await blacklistModel.create({
                token
            })
            res.clearCookie("token")
        }
        res.status(200).json({message:"user logged out successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
}

/**
 * @name getusercontroller
 * @description get user profile
 * @access private
 */

async function getusercontroller(req,res){
   const user=await userModel.findById(req.user.id)
   res.status(200).json({
    message:"user profile fatched successfully",
    user:{
        _id:user._id,
        username:user.username,
        email:user.email
    }
   })
}





module.exports={
    registerusercontroller,
    loginusercontroller,
    logoutusercontroller,
    getusercontroller
}
