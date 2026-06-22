import { getAllInterviewReport, getInterviewReportById, generateInterviewReport,generateInterviewPdf } from "../services/interview.api"
import { useContext } from "react"
import { InterviewContext } from "../interview.context"

export const useInterview = () => {
    const context = useContext(InterviewContext)
    if (!context) {
        throw new Error("useInterview must be used within InterviewProvider")
    }
    const {loading,setLoading,report,setReport,reports,setreports}=context
    
    const generateReport = async({resumeFile,jobDescription,selfDescription})=>{
        setLoading(true)
        try{
            const response = await generateInterviewReport({resumeFile,jobDescription,selfDescription})
            setReport(response.interviewReport)
            return response.interviewReport
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const getreportbyId = async (_id)=>{
        setLoading(true)
        try{
            const response = await getInterviewReportById(_id)
            setReport(response.interviewReport)
            return response.interviewReport
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const getAllReports = async ()=>{
        setLoading(true)
        try{
            const response = await getAllInterviewReport()
            setreports(response.interviewReports || [])
            return response.interviewReports || []
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const getResumePdf = async (interviewId) => {
        setLoading(true)
        let response = null
        try {
            response = await generateInterviewPdf({ interviewId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }



    return {
        loading,
        setLoading,
        generateReport,
        getreportbyId,
        getAllReports,
        getResumePdf,
        report,
        setReport,
        reports
    }
}