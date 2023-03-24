import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { BiGroup } from "react-icons/bi";
import { FiActivity } from "react-icons/fi";
import { cardStyles } from "./ReusableStyles";
import { useSelector } from "react-redux";
import axios from "axios";
export default function Analytics() {

  const { usersDetails } =useSelector(state => state.allUsers) 
  const [ posts,setPosts ] = useState([])
  const [ questions,setQuestions ] = useState([])
  const [ ads,setAds] = useState([])
  const { adminToken } = useSelector(state => state.admin)

  const getAllPosts = async()=>{
    try {
      await axios.get('/admin/getallposts',{
        headers:{
          Authorization:adminToken
        }
      }).then((res)=>{
        setPosts(res.data)
      })
    } catch (error) {
      console.log(error);
    }
  }

  const getAllQuestions = async()=>{
    try {
      await axios.get('/admin/getallquestion',{
        headers:{
          Authorization:adminToken
        }
      }).then((res)=>{
        setQuestions(res.data)
      })
    } catch (error) {
      console.log(error);
    }
  }

  const getAllAds = async()=>{
    try {
      await axios.get('/admin/getallads',{
        headers:{
          Authorization:adminToken,
        }
      }).then((res)=>{
          setAds(res.data)
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getAllAds();
  },[])

  useEffect(()=>{
    getAllQuestions();
  },[])

  useEffect(()=>{
    getAllPosts();
  },[])


  return (
    <Section>
      <div className="analytic ">
        <div className="content">
          <h5>Posts</h5>
          <h2>{posts.length}</h2>
        </div>
        <div className="logo">
          <BsFillCalendar2WeekFill />
        </div>
      </div>
      <div className="analytic">
        <div className="logo">
          <IoStatsChart />
        </div>
        <div className="content">
          <h5>Questions</h5>
          <h2>{questions.length}</h2>
        </div>
      </div>
      <div className="analytic">
        <div className="logo">
          <BiGroup />
        </div>
        <div className="content">
          <h5>Users</h5>
          <h2>{usersDetails.length}</h2>
        </div>
      </div>
      <div className="analytic ">
        <div className="content">
          <h5>ADS</h5>
          <h2>{ads.length}</h2>
        </div>
        <div className="logo">
          <FiActivity />
        </div>
      </div>
    </Section>
  );
}
const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  .analytic {
    ${cardStyles};
    padding: 1rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #ffc107;
      color: black;
      svg {
        color: white;
      }
    }
    .logo {
      background-color: black;
      border-radius: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;
      svg {
        font-size: 1.5rem;
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    .analytic {
      &:nth-of-type(3),
      &:nth-of-type(4) {
        flex-direction: row-reverse;
      }
    }
  }
`;
