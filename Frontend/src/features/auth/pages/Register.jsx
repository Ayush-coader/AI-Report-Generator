import { useState } from 'react'
import { useNavigate,Link } from 'react-router'; 
import { useAuth } from '../hooks/useAuth';

function Register() {
    const navigate= useNavigate()
    const {loading,handleregister}= useAuth()

    const [username,setusername]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")

    const handlesubmit=async(e)=>{
        e.preventDefault();
        await handleregister({ username, email, password })
        navigate('/')
    }
    if(loading){
        return (<main><h1>loading......</h1></main>)
    }
  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handlesubmit}>
                <div className="input-section">
                    <label htmlFor="username">UserName</label>
                    <input
                    onChange={(e)=>{setusername(e.target.value)}} 
                    type="text" id="username" name='username' placeholder="Enter your Username" />
                </div>
                <div className="input-section">
                    <label htmlFor="email">Email</label>
                    <input 
                    onChange={(e)=>{setemail(e.target.value)}} 
                    type="email" id="email" name='email' placeholder="Enter your Email" />
                </div>
                <div className="input-section">
                    <label htmlFor="password">Password</label>
                    <input 
                    onChange={(e)=>{setpassword(e.target.value)}} 
                    type="password" id="password" name='password' placeholder="Enter your Password" />
                </div>
                <button className='btn btn-primary' type="submit">Register</button>
            </form>
            <p>Already have account? <Link to={"/login"}>login</Link></p>
        </div>
    </main>
  )
}

export default Register