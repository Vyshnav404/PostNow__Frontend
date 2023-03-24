import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ArrowDownwardOutlined, ArrowUpwardOutlined,
    ChatBubbleOutlined, MoreHorizOutlined, RepeatOneOutlined,
     ShareOutlined } from '@material-ui/icons';
import { Avatar } from '@material-ui/core';
import { setOthersQuestion } from '../../../redux/features/othersQuestionSlice'
import { useDispatch,useSelector } from 'react-redux';




function QuestionOnOthersProfile({ userData }) {

const { othersQuestiononProfile } = useSelector(state => state.othersQuestion)
const { tokenData } = useSelector(state=> state.user)
console.log("otherssss profile",othersQuestiononProfile);
let id = userData._id
const dispatch = useDispatch();
const [ question , setQuestion ] = useState([])
console.log(question,"question kaanik");


useEffect(()=>{ 
    const callQuestions = async()=>{
        try {
            console.log("errorrr===");
            await axios.get('/questionOnProfile/'+id,{
              headers:{
                Authorization:tokenData
              }
            }).then(async(res)=>{
                dispatch(setOthersQuestion(res.data))
                setQuestion(res.data)
            })
        } catch (error) {
            console.log(error);
        }
    }
    callQuestions();
},[])

  return (
    <div className='col-5'>
    {
      question?.map(newQuestion=>{
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
            {/* <div className="post__footerLeft">
            
              <button  className="post__report me-2" onClick={()=> editPost(newState._id)} >Edit</button>
              <button  className="post__report " onClick={()=> deletePost(newState._id)} >Delete</button>
            </div> */}
          </div>
          </div>
         
          </>
        )
        })
      }
      </div>
  )
}

export default QuestionOnOthersProfile
