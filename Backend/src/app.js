const express=require('express')
const cookieParser=require('cookie-parser')
const cors=require("cors")
const rateLimit = require('express-rate-limit');

const app=express()

// Enable trust proxy to correctly identify client IPs behind reverse proxies (Render/Vercel)
app.set('trust proxy', 1)

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    message: {
        message: "Too many requests from this IP, please try again after 15 minutes."
    }
}));
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