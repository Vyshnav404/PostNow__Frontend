import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function HotQuestions() {
    const { tokenData } = useSelector(state => state.user)
    const [hotQuestions, setHotQuestions] = useState([])

    const getHotQuestions =async()=>{
        try {
                const hotQuestion = await axios.get('/get-hot-questions',{
                headers:{
                    Authorization:tokenData
                }
            });
            setHotQuestions(hotQuestion.data)
        } catch (error) {
          console.error(error);  
        }
    }

useEffect(()=>{
    getHotQuestions();
},[])

  return (
    <>
    <div className='relatedQuestion'>
      <h1 className='mt-5'>Hot Network Questions</h1>
      <hr/>
      {hotQuestions?.map((title) => {
          return ( 
            <div key={title._id} className=" d-flex mt-3">
              <div>
                <img
                  alt=""
                  width="15px"
                  className="mr-2"
                />
              </div>
              <Link className="mt-2" to='/user/answerpage' state={{id:title?._id}}>{title?.questionName ? title?.questionName : "" }</Link>
            </div>
          ) })} 
    </div>
    </>
  )
}

export default HotQuestions
