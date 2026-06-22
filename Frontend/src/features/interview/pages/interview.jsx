import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'
import axios from 'axios'
import "../style/interview.scss"
import { useInterview } from '../hooks/useinterview'

const MOCK_REPORT = {
  "_id": "6a2cd9d6f1306d78fd44ee2a",
  "matchScore": 78,
  "technicalQuestions": [
    {
      "question": "Explain the concept of polymorphism in Object-Oriented Programming (OOP) and provide a concrete example in C++ or Python.",
      "intension": "To assess the candidate's fundamental understanding of OOP principles and their ability to apply them in a programming context.",
      "answer": "Define polymorphism (many forms). Explain compile-time (method overloading, operator overloading) and run-time (method overriding, virtual functions in C++, or duck typing in Python). Provide a code example for run-time polymorphism, showing a base class with a virtual method and derived classes overriding it."
    },
    {
      "question": "Describe the typical lifecycle of a RESTful API request in a Node.js application, from the client sending the request to the server sending the response.",
      "intension": "To evaluate the candidate's understanding of backend request handling, Node.js event loop, and middleware concepts relevant to server-side development.",
      "answer": "Explain the client initiating an HTTP request (GET, POST, etc.) to a specific endpoint. The server (e.g., using Express.js) receives the request. Mention how middleware functions (for parsing body, authentication, logging) process the request before it reaches the route handler. Describe how the route handler processes business logic, potentially interacting with a database or other services. Finally, explain how the server constructs and sends back an HTTP response with appropriate status codes and data."
    },
    {
      "question": "You have a slow SQL query that involves joining three tables and performing an aggregation. What steps would you take to identify the bottleneck and optimize its performance?",
      "intension": "To assess the candidate's practical experience and knowledge in database optimization and query tuning.",
      "answer": "Explain using `EXPLAIN` or `ANALYZE` (depending on the database) to understand the query plan and identify bottlenecks (e.g., full table scans, expensive joins). Discuss adding appropriate indexes on frequently queried columns, join conditions, and columns used in WHERE clauses. Mention rewriting the query to use more efficient joins, avoiding `SELECT *`, optimizing subqueries, or considering denormalization or materialized views for complex aggregations."
    },
    {
      "question": "When designing a backend service, what factors do you consider to ensure it is scalable and what common architectural patterns support scalability?",
      "intension": "To gauge the candidate's understanding of system design principles, even if their direct experience in large-scale architecture is limited, showing their potential to grow into such roles.",
      "answer": "Factors include handling increased user load, data volume, and concurrent requests. Discuss horizontal scaling (adding more machines) vs. vertical scaling (upgrading existing machines). Common patterns include making services stateless, using load balancers, implementing caching (e.g., Redis), utilizing message queues for asynchronous processing, sharding databases, and considering a microservices architecture for decoupling components."
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Tell me about a challenging technical problem you've encountered in a project. How did you approach solving it, and what was the outcome?",
      "intension": "To evaluate the candidate's problem-solving methodology, analytical thinking, resilience when facing difficulties, and ability to learn from challenges.",
      "answer": "Use the STAR method: Describe the Situation (the project and problem), the Task (what you needed to achieve), the Action (steps you took to diagnose, research, experiment, collaborate, and implement a solution), and the Result (the successful outcome and any lessons learned). Highlight your thought process and any tools or resources you utilized."
    },
    {
      "question": "Describe a situation where you had to collaborate with team members on a project, and there was a disagreement about the best technical approach. How did you handle it?",
      "intension": "To assess the candidate's teamwork, communication, and conflict resolution skills, particularly in a technical context.",
      "answer": "Use the STAR method. Explain the situation and the differing technical opinions. Describe your actions, focusing on active listening, understanding different perspectives, presenting your own rationale clearly, and seeking common ground or data-driven evidence to reach a consensus. Emphasize prioritizing the project's success over personal preference and reaching an agreed-upon solution."
    },
    {
      "question": "The job requires continuous learning and adapting to new technologies. How do you stay updated with the latest trends and best practices in backend development, and how have you applied new knowledge?",
      "intension": "To understand the candidate's initiative, passion for continuous learning, and their ability to integrate new skills into their work.",
      "answer": "Mention specific ways you stay updated, such as following industry blogs, participating in online communities, taking courses (e.g., Udemy, Coursera), reading documentation, attending webinars/conferences, or working on personal projects. Provide an example of a specific technology or best practice you learned and how you applied it to improve a project or solve a problem."
    }
  ],
  "skillGaps": [
    {
      "skill": "Backend Architecture Design and Optimization",
      "severity": "Medium"
    },
    {
      "skill": "Advanced Database Design and Query Optimization",
      "severity": "Medium"
    },
    {
      "skill": "Ensuring Application Performance, Reliability, and Security",
      "severity": "Medium"
    },
    {
      "skill": "Participating in Code Reviews and Following Best Practices (explicit experience)",
      "severity": "Low"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "Data Structures & Algorithms Refresher",
      "task": [
        "Review fundamental data structures (Arrays, Linked Lists, Trees, Graphs, Hash Maps) and their common operations.",
        "Practice core algorithms (Sorting, Searching, Recursion).",
        "Solve 2-3 medium-difficulty coding problems on platforms like LeetCode or HackerRank focusing on optimal time and space complexity."
      ]
    },
    {
      "day": 2,
      "focus": "Object-Oriented Programming & Language Fundamentals (C++/Python)",
      "task": [
        "Deep dive into OOP principles: Encapsulation, Inheritance, Polymorphism, Abstraction. Understand their real-world applications.",
        "Practice writing clean, modular, and object-oriented code in C++ or Python.",
        "Review advanced language features relevant to backend development (e.g., concurrency in Python, memory management in C++)."
      ]
    },
    {
      "day": 3,
      "focus": "Databases & Advanced SQL",
      "task": [
        "Review database concepts: ACID properties, Normalization (1NF, 2NF, 3NF).",
        "Practice writing complex SQL queries involving joins, subqueries, aggregations, window functions.",
        "Study query optimization techniques: understanding `EXPLAIN` plans, indexing strategies, and common pitfalls for slow queries."
      ]
    },
    {
      "day": 4,
      "focus": "Node.js & REST API Design",
      "task": [
        "Revisit Node.js core concepts: Event Loop, Asynchronous programming, Callbacks, Promises, Async/Await.",
        "Review Express.js fundamentals: Routing, Middleware, Error Handling.",
        "Learn best practices for RESTful API design: proper HTTP methods, status codes, request/response formats, API versioning, basic authentication (e.g., JWT)."
      ]
    },
    {
      "day": 5,
      "focus": "Backend Architecture & Scalability Concepts",
      "task": [
        "Read about common backend architectural patterns: Monolithic vs. Microservices.",
        "Study concepts related to scalability: Load Balancing, Caching (e.g., Redis), Message Queues (e.g., Kafka/RabbitMQ) for asynchronous processing.",
        "Understand basic security considerations for APIs (HTTPS, input validation, rate limiting)."
      ]
    },
    {
      "day": 6,
      "focus": "Git, GitHub & Development Workflow",
      "task": [
        "Review advanced Git commands: `rebase`, `cherry-pick`, managing merge conflicts.",
        "Understand collaborative development workflows: Branching strategies (e.g., GitFlow, GitHub Flow), Pull Requests, Code Reviews.",
        "Familiarize yourself with Continuous Integration/Continuous Deployment (CI/CD) basics."
      ]
    },
    {
      "day": 7,
      "focus": "Mock Interview & Behavioral Preparation",
      "task": [
        "Conduct a mock technical interview to practice problem-solving and explaining concepts under pressure.",
        "Practice answering common behavioral questions using the STAR (Situation, Task, Action, Result) method.",
        "Review your resume, projects, and be prepared to discuss specific challenges and learnings from them."
      ]
    }
  ]
}

function Interview() {
  const { _id } = useParams()
  const navigate = useNavigate()
  const { user, handlelogout } = useAuth()
  const { report, setReport, loading, getreportbyId, setLoading, getResumePdf } = useInterview()

  // Navigation tab states matching the columns
  const [activeTab, setActiveTab] = useState("technical") // 'technical', 'behavioral', 'roadmap'
  const [expandedIndex, setExpandedIndex] = useState(null)

  // Interactive checklist state for the roadmap tasks
  const [checkedTasks, setCheckedTasks] = useState(() => {
    const saved = localStorage.getItem(`roadmap_checked_${_id || 'default'}`)
    return saved ? new Set(JSON.parse(saved)) : new Set()
  })

  useEffect(() => {
    const fetchReport = async () => {
      try {
        await getreportbyId(_id)
      } catch (err) {
        console.warn("Failed to fetch report from server", err)
      }
    }

    if (_id && _id !== "test-report-id" && _id !== "test") {
      fetchReport()
    } else {
      setReport(null)
      setLoading(false)
    }
  }, [_id])

  const toggleTask = (dayNum, taskIndex) => {
    const taskKey = `${dayNum}_${taskIndex}`
    const newChecked = new Set(checkedTasks)
    if (newChecked.has(taskKey)) {
      newChecked.delete(taskKey)
    } else {
      newChecked.add(taskKey)
    }
    setCheckedTasks(newChecked)
    localStorage.setItem(`roadmap_checked_${_id || 'default'}`, JSON.stringify([...newChecked]))
  }

  const toggleQuestion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  if (!report) {
    return (
      <div className="report-container">
        {/* Animated Glowing Background Orbs */}
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>

        {/* Header bar */}
        <header className="navbar">
          <div className="logo-container" onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>
            <svg className="logo-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#logo-grad)" stroke="#8b5cf6" strokeWidth="2" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="logo-grad" x1="2" y1="2" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a78bfa" />
                  <stop offset="1" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
            <span className="logo-text">Intervue<span className="logo-accent">.ai</span></span>
          </div>
          <div className="nav-actions">
            <button className="back-btn" onClick={() => navigate("/")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="back-icon">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to Workspace
            </button>
            {user && (
              <div className="user-profile">
                <div className="user-avatar">
                  {(user.email || user.username || 'U').charAt(0).toUpperCase()}
                </div>
                <button className="logout-btn" onClick={handlelogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="report-main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 66px)' }}>
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading prep materials...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="report-container">
      {/* Animated Glowing Background Orbs */}
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>

      {/* Header bar */}
      <header className="navbar">
        <div className="logo-container" onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>
          <svg className="logo-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#logo-grad)" stroke="#8b5cf6" strokeWidth="2" strokeLinejoin="round" />
            <path d="M2 17L12 22L22 17" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="logo-grad" x1="2" y1="2" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a78bfa" />
                <stop offset="1" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
          <span className="logo-text">Intervue<span className="logo-accent">.ai</span></span>
        </div>
        <div className="nav-actions">
          <button className="back-btn" onClick={() => navigate("/")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="back-icon">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Workspace
          </button>
          {user && (
            <div className="user-profile">
              <div className="user-avatar">
                {(user.email || user.username || 'U').charAt(0).toUpperCase()}
              </div>
              <button className="logout-btn" onClick={handlelogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main dashboard content dividing into 3 columns matching the visual layout */}
      <main className="report-main">
        <div className="dashboard-grid">

          {/* Left Column: Sidebar Navigation Menu & Match Score */}
          <aside className="column-left">
            <div className="sidebar-group">
              <h4 className="sidebar-title">Menu</h4>
              <nav className="nav-menu">
                <button
                  className={`nav-menu-item ${activeTab === 'technical' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('technical'); setExpandedIndex(null); }}
                >
                  <span className="nav-dot"></span>
                  Technical questions
                </button>
                <button
                  className={`nav-menu-item ${activeTab === 'behavioral' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('behavioral'); setExpandedIndex(null); }}
                >
                  <span className="nav-dot"></span>
                  Behavioral questions
                </button>
                <button
                  className={`nav-menu-item ${activeTab === 'roadmap' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('roadmap'); setExpandedIndex(null); }}
                >
                  <span className="nav-dot"></span>
                  Road Map
                </button>
              </nav>
            </div>

            {/* Match Score Indicator widget */}
            <div className="match-score-card">
              <div className="score-header">
                <span>Match Score</span>
                <span className="score-value">{report.matchScore}%</span>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${report.matchScore}%` }}
                ></div>
              </div>
              <span className="score-desc">
                {report.matchScore >= 80 ? "Excellent Alignment" : report.matchScore >= 70 ? "Good Alignment" : "Partial Alignment"}
              </span>
            </div>
            <button className='btn btn-secondary' onClick={()=>getResumePdf(_id)}>
              <svg height={"0.8rem"} style={{ marginRight: "0.2rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>Download Resume</button>
          </aside>

          {/* Middle Column: Active Tab Content Area */}
          <section className="column-middle">
            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading prep materials...</p>
              </div>
            ) : (
              <div className="tab-content">

                {/* 1. Technical Questions Tab Content */}
                {activeTab === 'technical' && (
                  <div className="content-view fade-in">
                    <div className="content-view-header">
                      <h2>Technical Questions prep</h2>
                      <p>Custom questions based on the job requirements and your resume skill profile.</p>
                    </div>

                    <div className="questions-list">
                      {report.technicalQuestions?.map((q, idx) => (
                        <div
                          key={idx}
                          className={`question-accordion-card ${expandedIndex === idx ? 'expanded' : ''}`}
                          onClick={() => toggleQuestion(idx)}
                        >
                          <div className="question-card-header">
                            <span className="question-index">Q{idx + 1}</span>
                            <p className="question-text">{q.question}</p>
                            <svg className="caret-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </div>

                          {expandedIndex === idx && (
                            <div className="question-card-body" onClick={(e) => e.stopPropagation()}>
                              <div className="info-block intent-block">
                                <h5>Interviewer Intent</h5>
                                <p>{q.intension}</p>
                              </div>
                              <div className="info-block answer-block">
                                <h5>Key points to mention in response</h5>
                                <p>{q.answer}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Behavioral Questions Tab Content */}
                {activeTab === 'behavioral' && (
                  <div className="content-view fade-in">
                    <div className="content-view-header">
                      <h2>Behavioral Questions prep</h2>
                      <p>Common scenarios and character questions tailored to evaluate soft skills and cultural fit.</p>
                    </div>

                    <div className="questions-list">
                      {report.behavioralQuestions?.map((q, idx) => (
                        <div
                          key={idx}
                          className={`question-accordion-card ${expandedIndex === idx ? 'expanded' : ''}`}
                          onClick={() => toggleQuestion(idx)}
                        >
                          <div className="question-card-header">
                            <span className="question-index">Q{idx + 1}</span>
                            <p className="question-text">{q.question}</p>
                            <svg className="caret-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </div>

                          {expandedIndex === idx && (
                            <div className="question-card-body" onClick={(e) => e.stopPropagation()}>
                              <div className="info-block intent-block">
                                <h5>Interviewer Intent</h5>
                                <p>{q.intension}</p>
                              </div>
                              <div className="info-block answer-block">
                                <h5>Suggested Response Structure (STAR Method)</h5>
                                <p>{q.answer}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Road Map (7-Day Study Timeline) Content */}
                {activeTab === 'roadmap' && (
                  <div className="content-view fade-in">
                    <div className="content-view-header">
                      <h2>Day-by-Day Preparation Road Map</h2>
                      <p>A structured 7-day sprint plan to address identified gaps and review vital concepts.</p>
                    </div>

                    <div className="roadmap-timeline">
                      {report.preparationPlan?.map((plan, dayIdx) => (
                        <div key={dayIdx} className="roadmap-day-card">
                          <div className="day-card-header">
                            <span className="day-badge">Day {plan.day}</span>
                            <h4 className="day-focus">{plan.focus}</h4>
                          </div>

                          <ul className="day-tasks-list">
                            {plan.task?.map((t, taskIdx) => {
                              const taskKey = `${plan.day}_${taskIdx}`
                              const isChecked = checkedTasks.has(taskKey)
                              return (
                                <li
                                  key={taskIdx}
                                  className={`task-item ${isChecked ? 'completed' : ''}`}
                                  onClick={() => toggleTask(plan.day, taskIdx)}
                                >
                                  <div className={`task-checkbox ${isChecked ? 'checked' : ''}`}>
                                    {isChecked && (
                                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                      </svg>
                                    )}
                                  </div>
                                  <span className="task-text">{t}</span>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}
          </section>

          {/* Right Column: Skill Gaps pill tags matching diagram */}
          <aside className="column-right">
            <div className="skill-gaps-panel">
              <h4 className="skills-title">Skill Gaps</h4>
              <div className="skills-tags-container">
                {report.skillGaps?.map((gap, idx) => (
                  <div
                    key={idx}
                    className={`skill-tag-pill severity-${gap.severity?.toLowerCase() || 'medium'}`}
                  >
                    <span className="tag-pulse"></span>
                    <span className="tag-name">{gap.skill}</span>
                    <span className="tag-badge">{gap.severity} severity</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  )
}

export default Interview
