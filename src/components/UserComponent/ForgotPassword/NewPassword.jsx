import React, { useEffect, useState } from 'react'
import './forgotPassword.css'
import { useFormik } from 'formik'
import { useParams ,useNavigate} from 'react-router-dom'
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast'


function NewPassword() {
 const [validUrl,setValidUrl] = useState(false);
 const [password,setPassword] = useState('');
 const [msg,setMsg] = useState("");
 const [error,setError] = useState('');
 const param = useParams()
 const navigate = useNavigate()
 const url =  `${import.meta.env.VITE_APP_BACKEND_URL}/password-reset/${param.id}`;

 useEffect(()=>{
    const verifyUrl = async()=>{
        try {
            setValidUrl(true)
        } catch (error) {
            setValidUrl(false)
        }
    };
    verifyUrl();
 },[param,url])

 const onSubmit = (values)=>{
    try {
        (async()=>{
            console.log("data of password");
            let id = param.id
            const data = await axios.post('/password-reset/'+id,{password:values.password});
            setMsg(data.message);
            setError("");
            navigate("/")
        })()
    } catch (error) {
        console.log("erooor in reset");
        console.log(error);
    }
 }

 const { values, handleChange,handleSubmit } = useFormik({
    initialValues:{
        password:''
    },
    onSubmit
 })

  return (
    <>
    <Toaster />
    <div className='loginbody'>
      <div className='flez' style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
     <div className="form">
            <h2>Add a new Password</h2>
            <form className="input"  onSubmit={handleSubmit}>
                <div className="inputBox">
                    <label for="htmlFor">Email</label>
                    <input name='password'  value={values.password} onChange={handleChange} required type="password" placeholder='New password'/>
                </div>
                <div className="inputBox">
                    <input type="submit" name="" value="Sign In"/> 
                </div>
                {error && <div><p className='errormsg'>{error}</p></div>}

            </form>
            
        </div>
      </div>
     
        </div>
        
    </>
  )
}

export default NewPassword
