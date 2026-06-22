const express=require("express")
const authmiddleware = require("../middlewares/auth.middleware")
const interviewcontroller=require("../controller/interview.controller")
const upload= require("../middlewares/pdf.middleware")

const interviewRouter= express.Router()

/**
 * @route POST/api/interview
 * @description generate new interview report on the basis of user selfdescription, resume pdf and jobdescription
 * @access private
 */

interviewRouter.post("/",authmiddleware.authuser, upload.single("resume") ,interviewcontroller.generateInterViewReportController)

/**
 * @route GET/api/interview/report/:interviewId
 * @description get interview report by interviewId
 * @access private
 */

interviewRouter.get("/report/:interviewId",authmiddleware.authuser,interviewcontroller.getInterviewReportByIdController)

/**
 * @route GET/api/interview
 * @description get all the reports of the user
 * @access private
 */

interviewRouter.get("/",authmiddleware.authuser,interviewcontroller.getAllInterviewReportsController)


/**
 * @route POST/api/interview/resume/pdf/:interviewId
 * @description generate new resume pdf of a specific interview on the basis of user selfdescription, resume pdf and jobdescription
 * @access private
 */

interviewRouter.post("/resume/pdf/:interviewId",authmiddleware.authuser,interviewcontroller.generateResumePdfController)






module.exports=interviewRouter