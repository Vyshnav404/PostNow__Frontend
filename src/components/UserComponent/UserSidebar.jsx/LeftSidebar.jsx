import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Qimg from "../Images/question.png";
import axios from "axios";
import { setAllPost } from '../../../redux/features/allPostSlice'
import { useDispatch } from "react-redux";

const LeftSidebar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  let value1 = 'Programming'
  let value2 = 'History'
  let value3 = 'Science'
  let value4 = 'India'
  let value5 = "World"

  const handleProgramming = async()=>{
    try {
      await axios.get('/postbycategory/'+value1).then((res)=>{
      dispatch(setAllPost(res.data))
      navigate('/user/userpost')
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handleHistory = async()=>{
    try {
      await axios.get('/postbycategory/'+value2).then((res)=>{
      dispatch(setAllPost(res.data))
      navigate('/user/userpost')
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handleScience = async()=>{
    try {
      await axios.get('/postbycategory/'+value3).then((res)=>{
      dispatch(setAllPost(res.data))
      navigate('/user/userpost')
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handleIndia = async()=>{
    try {
      await axios.get('/postbycategory/'+value4).then((res)=>{
      dispatch(setAllPost(res.data))
      navigate('/user/userpost')
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handleWorld = async()=>{
    try {
      await axios.get('/postbycategory/'+value5).then((res)=>{
      dispatch(setAllPost(res.data))
      navigate('/user/userpost')
      })
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
     <button onClick={handleProgramming}
        className="btn text-muted list-group-item list-group-item-action my-1 mt-2"
      
        style={{ width:'50%',fontSize: "15px",height:"50px",border:'1px solid grey', background:'transparent',textAlign:'center',margin:'auto',display:'block'}}
      >
        <i class="fa-solid fa-laptop-code"></i>Programming
      </button>
      <button 
        onClick={handleHistory}
        className=" btn text-muted list-group-item list-group-item-action my-1 mt-3"
        href="#list-item-1"
        style={{ width:'50%',fontSize: "15px",height:"50px",border:'1px solid grey', background:'transparent',textAlign:'center',margin:'auto',display:'block'}}
      >
        <i class="fa-solid fa-binoculars"></i> History
      </button>
      <button
      onClick={handleScience}
        className=" btn text-muted list-group-item list-group-item-action my-1 mt-3"
        href="#list-item-1"
        style={{ width:'50%',fontSize: "15px",height:"50px",border:'1px solid grey', background:'transparent',textAlign:'center',margin:'auto',display:'block'}}
      >
       <i class="fa-solid fa-flask"></i> Science
      </button>
      <button
        onClick={handleIndia}
        className=" btn text-muted list-group-item list-group-item-action my-1 mt-3"
        href="#list-item-1"
        style={{ width:'50%',fontSize: "15px",height:"50px",border:'1px solid grey', background:'transparent',textAlign:'center',margin:'auto',display:'block'}}
      >
        <i class="fa-solid fa-indian-rupee-sign"></i> India
      </button>
      <button
        onClick={handleWorld}
        className=" btn text-muted list-group-item list-group-item-action my-1 mt-3"
        href="#list-item-1"
        style={{ width:'50%',fontSize: "15px",height:"50px",border:'1px solid grey', background:'transparent',textAlign:'center',margin:'auto',display:'block'}}
      >
        <i class="fa-solid fa-earth-asia"></i> World
      </button>

      
      <div className="card text-left m-0 p-0 mt-5">
        <div className="card-body">
          <p>
            <b>Post Now for Teams -</b>Collaborate and share knowledge with a
            private group.
          </p>
          <img src={Qimg} alt="IMG" width="120px" />
          <button className="btn btn-primary btn-sm my-2">
            <small> Create a free Team</small>
          </button>
          <Link className="text-muted text-center" to="/user">
            <small>What is Teams?</small>
          </Link>
        </div>
      </div>

    </>
  );
};

export default LeftSidebar;
