import React from 'react'
import './Userlogin.css'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showloading,hideloading } from '../../../redux/features/alertSlice'
import { setToken, setUser } from '../../../redux/features/userSlice'
import { useNavigate } from 'react-router-dom'
import Information from './Information'


function Userlogin() {

  const [isUserLoggedIn,setIsUserLoggedIn] = useState(false)
    const [data,setData] = useState({
      email:'',
      password:''
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [error,setError]=useState('');

    const handleChange = ({currentTarget:input})=>{
      setData({...data,[input.name]:input.value});
    };

    const handleSubmit = async(e)=>{
      e.preventDefault();
      try {
        dispatch(showloading());
        const { data: res } = await axios.post('/login', data);
        console.log('logindata',data);
        dispatch(setUser(data))
       dispatch(hideloading());
       localStorage.setItem("token", res.data);
       console.log("user token",res.data)
       dispatch(setToken(res.data))
        setIsUserLoggedIn(true);   
        navigate('/user/home')

        
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
    }

  return (
    <>
    <div className='loginbody'>
      <div className='flez' style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
        <div>
      <Information />
     </div>
     <div className="form">
            <h2>Login</h2>
            <form className="input"  onSubmit={handleSubmit}>
                <div className="inputBox">
                    <label for="htmlFor">Email</label>
                    <input name='email' onChange={handleChange} value={data.email} required type="email"/>
                </div>
                <div className="inputBox">
                    <label for="">Password</label>
                    <input name='password' onChange={handleChange} value={data.password} required type="password"/>
                </div>
                <div className="inputBox">
                    <input type="submit" name="" value="Sign In"/> 
                </div>
                {error && <div><p className='errormsg'>{error}</p></div>}
            </form>
            <p className="forgot">Not a member ? <Link to='/user/signup'>signup now</Link></p>
            <p className="forgot"> <Link to='/forget-password'>Forget Password</Link></p>
            
        </div>
      </div>
     
        </div>
        
    </>
  )
}

export default Userlogin
