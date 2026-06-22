import React, { useState, useRef, useEffect } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useinterview'
import { useNavigate } from 'react-router'

function home() {

    const { loading, generateReport, reports, getAllReports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [generating, setGenerating] = useState(false)
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    useEffect(() => {
        getAllReports()
    }, [])

    const handlegeneratereport = async () => {
        setGenerating(true)
        try {
            const resumeFile = resumeInputRef.current.files[0]
            const data = await generateReport({ resumeFile, jobDescription, selfDescription })
            if (data && data._id) {
                navigate(`/interview/${data._id}`)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setGenerating(false)
        }
    }

    if (generating) {
        return <main className='home'>
            <p>Generating report...</p>
        </main>
    }

    return (
        <main className='home'>
            <div className="interview-input-grp">
                <div className="left">
                    <textarea
                        onChange={(e) => { setJobDescription(e.target.value) }}
                        name="job_description" id="" placeholder='enter your job description'></textarea>

                </div>
                <div className="right">
                    <div className="input-group">
                        <label className="file-type" htmlFor="resume">Upload Resume</label>
                        <input ref={resumeInputRef} hidden type="file" name='resume' id='resume' accept='.pdf' />

                    </div>
                    <div className="input-group">
                        <label htmlFor="selfDescription">Self Description</label>
                        <textarea
                            onChange={(e) => { setSelfDescription(e.target.value) }}
                            name="selfDescription" id="selfDescription" placeholder='write about your self'></textarea>
                    </div>
                    <button
                        onClick={handlegeneratereport}
                        className='generate-btn'>Generate Interview Report</button>

                </div>
            </div>
            <section className="reports-section">
                <h2 className="section-title">Recent Preparations</h2>
                <div className="report-grid">
                    {loading ? (
                        <div className="loading-reports">
                            <div className="spinner"></div>
                            <p>Fetching your reports...</p>
                        </div>
                    ) : reports?.length > 0 ? (
                        reports?.map((report, index) => (
                            <div
                                key={report._id || index}
                                className="report-card"
                                onClick={() => navigate(`/interview/${report._id}`)}
                            >
                                <div className="card-header">
                                    <h3 className="report-title">{report.title || "Interview Preparation"}</h3>
                                    <span className="score-badge" style={{
                                        background: report.matchScore >= 80 ? 'rgba(16, 185, 129, 0.1)' : report.matchScore >= 70 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(139, 92, 246, 0.1)',
                                        color: report.matchScore >= 80 ? '#34d399' : report.matchScore >= 70 ? '#fbbf24' : '#c084fc',
                                        border: report.matchScore >= 80 ? '1px solid rgba(16, 185, 129, 0.2)' : report.matchScore >= 70 ? '1px solid rgba(245, 158, 11, 0.2)' : '1px solid rgba(139, 92, 246, 0.2)'
                                    }}>
                                        {report.matchScore}% Match
                                    </span>
                                </div>
                                <p className="report-meta">
                                    Click to view technical questions, behavioral insights, and day-by-day roadmap.
                                </p>
                                <div className="card-footer">
                                    <span className="action-link">Open Workspace</span>
                                    <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-reports">
                            <p>No preparation reports found. Paste a job description above to get started!</p>
                        </div>
                    )}
                </div>
            </section>

            <footer className="home-footer">
                <div className="footer-left">
                    <p>© {new Date().getFullYear()} Interview.ai. All rights reserved.</p>
                </div>
                <div className="footer-right">
                    <div className="status-indicator">
                        <span className="status-dot"></span>
                        <span className="status-text">AI Engine Online</span>
                    </div>
                </div>
            </footer>
        </main>
    )
}

export default home