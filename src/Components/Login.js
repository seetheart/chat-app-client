import React, { useEffect, useImperativeHandle, useState } from 'react'
import './login.css'
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [action, setAction] = useState("Sign Up")
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const token = JSON.parse(localStorage.getItem('user_data'))?.token
  const handleSignup = () => {
    if(action === 'Sign Up'){
        //call api
        console.log("call api sign")
        axios.post('http://localhost:3000/register', {
            name: name,
            email: email,
            password: password
        }
        ).then( (res) => { 
            console.log(res.data)
            setAction('Login')
        })
    }
    else setAction('Sign Up')
  }

  useEffect(() => {
    if(token){
      navigate('/');
      return;
    }
  }, [])

  const handleLogin = () => {
    if(action === 'Login'){
        //call api
        console.log("call api logi")
        axios.post('http://localhost:3000/login', {
            email: email,
            password: password
        }
        ).then( (res) => { 
            console.log(res.data)
            localStorage.setItem('user_data', JSON.stringify(res.data )) 
            navigate('/')
        })
    
    }
    else setAction('Login')
  }
  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>
            {action}
        </div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        { action === 'Sign Up' &&
        <div className='input'>
            <img src={user_icon} alt='' />
            <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)}/>
        </div>}
        <div className='input'>
            <img src={email_icon} alt='' />
            <input type='email' placeholder='Email Id' onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className='input'>
            <img src={password_icon} alt='' />
            <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
        </div>
      </div>
      {action === 'Login' && <div className='forgot-password'>Forgot Password</div>}
      <div className='submit-container'>
        <div className={action === 'Login' ? 'submit gray' : 'submit'} onClick={handleSignup}>Sign Up</div>
        <div className={action === 'Sign Up' ? 'submit gray' : 'submit'} onClick={handleLogin}>Login</div>
      </div>
    </div>
  )
}

export default Login
