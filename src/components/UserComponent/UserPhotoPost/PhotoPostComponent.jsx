import React, { useEffect, useState } from 'react'
import { Avatar, Button, TextField } from '@material-ui/core';
import { ArrowDownwardOutlined, ArrowUpwardOutlined,
  ChatBubbleOutlined, MoreHorizOutlined, RepeatOneOutlined,
   ShareOutlined } from '@material-ui/icons';
import ReactTimeAgo from 'react-time-ago';  
import './PhotoPost.css' 
import axios from 'axios';
import ReactHtmlParser from 'html-react-parser'
import { useDispatch, useSelector } from 'react-redux';
import ReasonForPostReport from './ReasonForPostReport';
import { Link, } from 'react-router-dom';
import PostComment from './PostComment';
import toast,{ Toaster } from 'react-hot-toast'
import { setAllPost } from '../../../redux/features/allPostSlice'



function LastSeen({ date }) {
  return (
    <div>
     <ReactTimeAgo date={new Date(date).getTime()} locale="en-US" timeStyle="round"/>
    </div>
  )
}

function PhotoPostComponent() {
  const { allPost } = useSelector(state => state.allPost)
  const { userDetails,tokenData } = useSelector(state => state.user)
  const dispatch = useDispatch()
  let userId = userDetails._id
 
  const [imagePost, setImagePost] = useState([])
  const [comment,setComment] = useState("")
  const [show, setShow] = useState(false)
  const [postId,setPostId]=useState('')
  const getPosts = async()=>{
    await axios.get('/getAllPosts/',{
      headers:{
        Authorization:tokenData
      }
    }).then((response)=>{
      dispatch(setAllPost(response.data.reverse()))
      // setImagePost(response.data.reverse())
    })
  }

  // useEffect(()=>{
  //   getPosts();
  // },[])




const handleLike = async(id)=>{
  try {
    await axios.put('/addLike/'+id,{userId}).then((res)=>{
      getPosts();
    })
  } catch (error) {
    
  }
}


const handleDisLike = async(id)=>{
  try {
    await axios.put('/disLike/'+id,{userId}).then((res)=>{
      getPosts();
    })
  } catch (error) {
    console.log(error);
  }
}



const commentSubmit = async(id)=>{
try {
  if(comment==""){
    console.log("ithila");
    toast.error("Enter something in comment ")
  }else{
  await axios.put('/addcomment/'+id,{userId,comment:comment}).then((res)=>{
   setComment("")
   toast.success("Comment added successfully")
  })
}
 
} catch (error) {
  console.log(error);
}
}

const handlChange = async(id)=>{

  if(show) {
    setShow(false)
  }else{
    setShow(true)
    setPostId(id)
  }
}

  return (
    
   
      <div className='col-5'>
    {
      allPost.length === 0 ? (
        <h1>No Posts  To Show</h1>
      ): (
      allPost ?.map(imagepost=>{
        return( 
<>
          <div className="post">
          <div className="post__info">
            {
              imagepost.user.imageUrl ? <img style={{width:'45px',height:"40px" ,borderRadius:'20px'}} src={imagepost.user.imageUrl}/> :   <Avatar />
            }
          
          <Link to='/user/othersprofile' state={{id:imagepost.user._id}} style={{textDecoration:'none',color:'black'}} > <h6 className='post-userName ms-3 mt-2'>{imagepost.user.firstName+" "+imagepost.user.lastName}</h6> </Link>  
         
            <small >
              <LastSeen date={imagepost?.createdAt}/>
            </small>
          </div>
          <div className="post__body">
            {
              <img src={imagepost.postUrl} alt="" />
            }  
            <hr />
          </div>
            <div>
              <p>{ReactHtmlParser(imagepost.caption)}</p>
            </div>
          <div className="post__footer">
            <div className="post__footerAction">
              <div className='likeLength me-3'>
               <ArrowUpwardOutlined onClick={()=> handleLike(imagepost._id)} />
              <span>{imagepost.like.length}</span>
              </div>
               
               <div className='me-3'>
              <ArrowDownwardOutlined  onClick={()=> handleDisLike(imagepost._id)} />
              <span>{imagepost.dislike.length}</span>
               </div>

            </div>
            <RepeatOneOutlined />
            <ChatBubbleOutlined onClick={()=> handlChange(imagepost._id)}/>
            
            <div className="post__footerLeft">
            
              {/* <button  className="post__report" onClick={()=> reportPost(imagepost._id)} >Report</button> */}
              <ReasonForPostReport postData={(imagepost._id)}/>
            </div>
          </div>
          {
            show && postId === imagepost._id && <PostComment postData={imagepost._id} />
          }
          <div>
          
         <textarea type="text" className='w-50  mt-2' value={comment} onChange={(e)=> setComment(e.target.value)} placeholder='add comment' required/>
         <button className='btn mb-5 ms-1' style={{background:'rgb(155, 34, 34)',border:'none',color:"white"}} onClick={()=> commentSubmit(imagepost._id)}>add</button>
         
          </div>

          </div>
         
          </>
        )
        }))


      }
      <Toaster />
      </div>
     
     

  )
}

export default PhotoPostComponent
