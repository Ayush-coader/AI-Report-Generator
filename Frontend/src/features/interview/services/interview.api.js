import axios from "axios";

const api = axios.create({
    baseURL:"https://ai-report-generator-lq10.onrender.com",
    withCredentials:true
})

export const generateInterviewReport = async ({resumeFile,jobDescription,selfDescription})=>{
    const formData= new FormData()
    formData.append("resume",resumeFile)
    formData.append("jobDescription",jobDescription)
    formData.append("selfDescription",selfDescription)
    const response= await api.post("/api/interview",formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
    return response.data
}

export const getInterviewReportById = async (_id)=>{
    const response = await api.get(`/api/interview/report/${_id}`)
    return response.data
}

export const getAllInterviewReport = async ()=>{
    const response = await api.get(`/api/interview`)
    return response.data
}

export const generateInterviewPdf = async({interviewId})=>{
    const response = await api.post(`/api/interview/resume/pdf/${interviewId}`,null,{
        responseType:"blob"
    })
    return response.data
}
