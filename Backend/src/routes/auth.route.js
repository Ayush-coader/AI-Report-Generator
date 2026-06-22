const {Router}=require('express')
const authController=require("../controller/auth.controller")
const authmiddleware=require("../middlewares/auth.middleware")

const authRouter=Router()
/**
 * @route POST /api/auth/register
 * @description register new user
 * @access public
 */

authRouter.post("/register",authController.registerusercontroller)

/**
 * @route POST/api/auth/login
 * @description login user
 * @access public
 */

authRouter.post("/login",authController.loginusercontroller)

/**
 * @route GET/api/auth/logout
 * @description logout user
 * @access public
 */
 authRouter.get("/logout",authController.logoutusercontroller)

 /**
  * @route GET/api/auth/getprofile
  * @description get user profile
  * @access private
  */
authRouter.get("/getuser",authmiddleware.authuser,authController.getusercontroller)

module.exports=authRouter