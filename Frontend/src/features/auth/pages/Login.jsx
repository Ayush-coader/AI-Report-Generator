import { useState } from 'react'
import { useNavigate,Link } from 'react-router'; 
import '../auth.form.scss'
import { useAuth } from '../hooks/useAuth';

function Login() {
    const {loading,handlelogin}=useAuth()
    const navigate= useNavigate()

    const [email ,setEmail]=useState("")
    const [password ,setPassword]=useState("")

    const handlesubmit=async(e)=>{
        e.preventDefault();
        await handlelogin({ email, password })
        navigate('/')
    }

    if(loading){
        return (<main><h1>loading......</h1></main>)
    }

  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handlesubmit}>
                <div className="input-section">
                    <label htmlFor="email">Email</label>
                    <input 
                    onChange={(e)=>{setEmail(e.target.value)}}
                    type="email" id="email" name='email' placeholder="Enter your Email" />
                </div>
                <div className="input-section">
                    <label htmlFor="password">Password</label>
                    <input 
                    onChange={(e)=>{setPassword(e.target.value)}}
                    type="password" id="password" name='password' placeholder="Enter your Password" />
                </div>
                <button className='btn btn-primary' type="submit">Login</button>
            </form>
            <p>Do not have account? <Link to={"/register"}>Register</Link></p>

        </div>
    </main>
  )
}

export default Login