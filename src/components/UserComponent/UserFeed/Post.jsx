import { Avatar } from '@material-ui/core'
import { ArrowDownwardOutlined, ArrowUpwardOutlined,
     ChatBubbleOutlined, MoreHorizOutlined, RepeatOneOutlined,
      ShareOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import './Post.css'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import CloseIcon from '@material-ui/icons/Close';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import ReactTimeAgo from 'react-time-ago'
import axios from 'axios';
import ReactHtmlParser from 'html-react-parser'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllQuestion, setSearchAllQuestion } from '../../../redux/features/allQuestionSlice';



 function LastSeen({ date }) {
  return (
    <div>
     <ReactTimeAgo date={new Date(date).getTime()} locale="en-US" timeStyle="round"/>
    </div>
  )
}

function Post({post}) {
  const { allQuestion,searchAllQuestion } = useSelector(state => state.allQuestion)
  const { userDetails } = useSelector(state => state.user)
  const { tokenData } = useSelector(state => state.user)
  let userId = userDetails._id
  const Close = (<CloseIcon />)
  const dispatch = useDispatch();

const getQuestion = async()=>{
  try {
    await axios.get("/Allquestions",{
      headers:{
        Authorization:tokenData,
      },
    }).then((res)=>{
      dispatch(setSearchAllQuestion(res.data.reverse()));
      dispatch(setAllQuestion(res.data.reverse()));
    })
  } catch (error) {
    console.log(error);
  }
}


  const handleUpvote = async(id)=>{
    try {
      await axios.put('/upvote/'+id,{userId},{
        headers:{
          Authorization:tokenData
        }
      }).then((res)=>{
        getQuestion()
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handleDownvote = async(id)=>{
    try {
      console.log("in front",userId);
      await axios.put('/downvote/'+id,{userId},{
        headers:{
          Authorization:tokenData
        },
        
      }).then((res)=>{
        getQuestion()
      })
    } catch (error) {searchAllQuestion
      console.log(error);
    }
  }
 
 
  

    
  return (
    <>
    {searchAllQuestion.map((post)=>{
      return (
      <div className="post">
      <div className="post__info">
        {
          post.user.imageUrl ? <img style={{ width:'45px',height:"40px",borderRadius:'20px'}} src={post.user.imageUrl}/> :  <Avatar />
        }
       
        <Link to='/user/othersprofile' state={{id:post.user._id}} style={{textDecoration:'none',color:'black'}} ><h6 className='ms-2 mt-2'>{post.user.firstName+" "+post.user.lastName}</h6></Link>
     
        <small>
          <LastSeen date={post?.createdAt}/>
        </small>
      </div>
      <div className="post__body">
        <div className="post__question">
          
        <Link to='/user/answerpage' state={{id:post?._id}} style={{textDecoration:'none',color:"black"}}><p>{post?.questionName}</p></Link>
         
        </div>
       {
        post.questionUrl !=='' && <img src={post.questionUrl} alt="" />
       }
      </div>
      <div className="post__footer">
        <div className="post__footerAction">
          <div className='likeLength me-3'>
          <ArrowUpwardOutlined onClick={()=>handleUpvote(post._id)} />
          <span>{post.upVote?.length}</span>
          </div>
          <div className='dislikeLength'>
          <ArrowDownwardOutlined onClick={()=>handleDownvote(post._id)}/>
          <span>{post.downVote?.length}</span>
          </div>
        </div>
        <RepeatOneOutlined />
        {/* <ChatBubbleOutlined /> */}
        <div className="post__footerLeft">
          <ShareOutlined />
          <MoreHorizOutlined />
        </div>
      </div>
      <p
        style={{
          color: "rgba(0,0,0,0.5)",
          fontSize: "12px",
          fontWeight: "bold",
          margin: "10px 0",
        }}
      >
       {post?.allAnswers.length}Answers
      </p>
      </div>
      )
    })}
    </>
    
  
    )
}

export default Post
