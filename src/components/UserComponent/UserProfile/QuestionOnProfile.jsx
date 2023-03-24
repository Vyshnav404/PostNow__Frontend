import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ArrowDownwardOutlined, ArrowUpwardOutlined,
    ChatBubbleOutlined, MoreHorizOutlined, RepeatOneOutlined,
     ShareOutlined } from '@material-ui/icons';
     import { Avatar } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { setAllQuestion } from '../../../redux/features/allQuestionSlice'




function QuestionOnProfile({ userData }) {

const { tokenData } = useSelector(state=> state.user)
let id = userData._id
const [ question , setQuestion ] = useState([])
const dispatch = useDispatch()

const getAllQuestions = async()=>{
  try {
    await axios.get('/Allquestions',{
      headers:{
        Authorization:tokenData,
      }
    }).then((res)=>{
      dispatch(setAllQuestion(res.data.reverse()))
    })
  } catch (error) {
    console.log(error);
  }
}

const callQuestions = async()=>{
    try {
        console.log("errorrr===");
        await axios.get('/questionOnProfile/'+id,{
          headers:{
            Authorization:tokenData
          }
        }).then(async(res)=>{
           await setQuestion(res.data)
        })
    } catch (error) {
        console.log(error);
    }
}


const deleteQuestion = async(id) =>{
  try {
    swal({
      title: "Are you sure?",
      text: "Do you want to report this question!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await axios
          .delete("/deletequestion/" + id, {
            headers: {
              Authorization: tokenData,
            },
          })
          .then(async (res) => {
            await callQuestions();
            await getAllQuestions();
          });
        swal("You Reported This Question!", {
          icon: "success",
        });
      } else {
        swal("Action not done!");
      }
    });
  } catch (error) {
    console.log(error);
  }
}

useEffect(()=>{
    callQuestions();
},[])

  return (
    <div className='col-5'>
    {
      question ?.map(newQuestion=>{
        return( 
<>
          <div className="post">
            
            
          <div className="post__info">
            {

           newQuestion.user.imageUrl ? <img src={newQuestion.user.imageUrl} alt=""  style={{width:'10%', borderRadius:'50%'}}/> : <Avatar />
            }
             
             <div className='ms-2'>
               <div>
            <h6>{newQuestion.user.firstName +' '+newQuestion.user.lastName}</h6>
                </div>     
               <div style={{
                fontWeight:'bold',
                cursor:'pointer'
               }}>
           <p>{newQuestion.questionName}</p>
                </div>     
                </div> 
           
            {/* <small>
              <LastSeen date="createdAt"/>
            </small> */}
          </div>
          <div className="post__body">
            {
              <img src={newQuestion.questionUrl} alt="" />
            }  
            <hr />
          </div>
          <div className="post__footer">
            <div className="post__footerAction">
              <ArrowUpwardOutlined />
              <ArrowDownwardOutlined />
            </div>
            <RepeatOneOutlined />
            <ChatBubbleOutlined />
            <div className="post__footerLeft">
            
              <button  className="post__report " onClick={()=> deleteQuestion(newQuestion._id)} >Delete</button>
            </div>
          </div>
          </div>
         
          </>
        )
        })
      }
      </div>
  )
}

export default QuestionOnProfile
