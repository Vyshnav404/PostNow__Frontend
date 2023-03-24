import React, { useState } from 'react'
import './forgotPassword.css'
import { useFormik } from  'formik'
import toast,{ Toaster } from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'

function ForgotPassword() {
 const [msg,setMsg] = useState('');
 const [error, setError] = useState("");


 const onSubmit = async(values)=>{
   try {
    const data = await axios.post('/password-reset',{email:values.email})
    setMsg(data.message);
    setError("");
    toast.success('Reset password link sent to your email')
  } catch (error) {
    setError(error.response?.data?.message || "Something went wrong");
          setError(error.response?.data?.message || "something went wrong")
            setMsg("");
  }
 }

 const { values , handleChange,handleSubmit } = useFormik({
  initialValues:{
    email:""
  },
  onSubmit,
 });


  return (
    <>
    <Toaster />
    <div className='loginbody'>
      <div className='flez' style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
     <div className="form">
            <h2>Forgot Password</h2>
            <form className="input"  onSubmit={handleSubmit}>
                <div className="inputBox">
                    <label for="htmlFor">Email</label>
                    <input name='email'  value={values.email} onChange={handleChange} required type="email"/>
                </div>
                <div className="inputBox">
                    <input type="submit" name="" value="Sign In"/> 
                </div>
                {error && <div><p className='errormsg'>{error}</p></div>}

            </form>
            <Link  to='/' style={{color:'red'}}>Go to Login Page</Link>
            
        </div>
      </div>
     
        </div>
        
    </>
  )
}

export default ForgotPassword
