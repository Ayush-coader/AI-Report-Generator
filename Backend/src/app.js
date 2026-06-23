const express=require('express')
const cookieParser=require('cookie-parser')
const cors=require("cors")
const rateLimit = require('express-rate-limit');
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));

const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"https://ai-report-generator-green.vercel.app",
    credentials:true
}))

const authRouter=require("./routes/auth.route")
const interviewRouter=require("./routes/interview.route")



app.use("/api/auth",authRouter)
app.use("/api/interview",interviewRouter)








module.exports=app