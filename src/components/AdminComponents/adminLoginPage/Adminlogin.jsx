import React from "react";
import "./AdminLogin.css";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showloading,hideloading } from "../../../redux/features/alertSlice";
import toast,{ Toaster } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { setAdminToken } from '../../../redux/features/adminSlice'

function Adminlogin() {

  
  const [isAdminLoggedIn,setIsAdminLoggedIn]= useState(false)
  const { adminToken } =useSelector(state => state.admin)
  const [data,setData] = useState({
    userName:'',
    password:'',
  })

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = ({currentTarget : input})=>{
    setData({...data,[input.name]:input.value});
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
    
      dispatch(showloading())
       const { data:res } = await axios.post('/admin/adminLogin',data);
        dispatch(hideloading())
       localStorage.setItem("Admintoken",res.data);
       dispatch(setAdminToken(res.data))
       setIsAdminLoggedIn(true);
       navigate('/admin/admindashboard')
    } catch (error) {
      console.log(error);
      if(error.response &&
        error.response.status >= 400 &&
        error.response.status <500){
          toast.error("Invalid Password or Admin Name")
        }
    }
  }

  return (
    <>
      <div className="adminlogin">
        <form className="box" action=""  target="_self" onSubmit={handleSubmit}>
          <h1>login</h1>
          <input
            type="text"
            name="userName"
            id="username"
            value={data.userName}
            onChange={handleChange}
            placeholder="Username"
           
          />
          <input
            type="password"
            name="password"
            id="pass"
            value={data.password}
            onChange={handleChange}
            placeholder="Password"
           
          />
          <input type="submit" id="submit" value="login" />
        </form>
      </div>
      <Toaster/>
    </>
  );
}

export default Adminlogin;
