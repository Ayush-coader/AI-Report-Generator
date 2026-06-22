const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username is already used!"],
        required:true
    },
    email:{
        type:String,
        unique:[true,"email is already registered"],
        required:true,
    },
    password:{
        type:String,
        required:[true,"password is required"],
    }
})

const userModel= mongoose.model("users",userSchema)

module.exports=userModel