import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast,{Toaster} from 'react-hot-toast'
import axios from "axios";
import { resetOTP } from '../../../redux/features/userSlice'
import { useDispatch } from "react-redux";

function Otp() {

  const [otp , setOtp] = useState('');
  const navigate = useNavigate()
  const dispatch  = useDispatch()
  

  const { userDetails } = useSelector((state) => state.user);
  console.log("otp comming", userDetails);
  const mail = userDetails.data.email;
  console.log(mail,"uuuuuuseeer iiiid");

  const handleChange = (e)=>{
    setOtp(e.target.value)
  }

  let verifyOTP = userDetails.data.OTP
  console.log(verifyOTP,"pinnnnnuuummm otp");

  const handleOTP =()=>{
    if(verifyOTP === otp && counter){
      axios.post('/otpVerify',{mail:mail}).then((res)=>{
      })
      // alert('correct')
      toast.success('otp verified')
      navigate('/')
    }else{
      // alert("wrong")
      toast.error("otp wrong")
      
      
    }

  }

  const [ counter,setCounter ] = useState(20);
  const setTime = ()=>{
    const timer = 
    counter > 0 && setInterval(()=> setCounter(counter - 1),1000);
    
    return ()=> clearInterval(timer);
  }

  useEffect(()=>{
    const timer = 
    counter > 0 && setInterval(()=> setCounter(counter - 1),1000);
    
    return ()=> clearInterval(timer);
  },[counter])

  const resendOTP = async()=>{
   await axios.post('/resendotp/'+mail).then((res)=>{
     console.log("reeeesend otp",res.data.OTP)
     dispatch(resetOTP(res.data.OTP))
    setCounter(20)
     let timeout = setTime()
     console.log(timeout," timeout")

    })
  }

  return (
    <>
      <div className="loginbody">
        <div className="form">
          <h2>OTP verification</h2>
          <div className="input" >
            <div className="inputBox">
              <input name="otp"  value={otp} onChange={handleChange} required type="number" />
            </div>

            <div className="inputBox">
              <input  onClick={handleOTP} type="submit" name="" value="OK" />
            </div>
          </div>
        <div>
          <p style={{color:"white",marginTop:'10px'}}>Resend otp <span style={{fontWeight:"bold",color:"red"}} > 00:{counter}</span> </p>
        </div>
        <div>
          <button onClick={resendOTP} >Resend OTP</button>
        </div>
        </div>
      </div>
      <Toaster/>
    </>
  );
}

export default Otp;
