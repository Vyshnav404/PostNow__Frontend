import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import ReactHtmlParser from 'html-react-parser'
import { Avatar } from '@material-ui/core';
import { ArrowDownwardOutlined, ArrowUpwardOutlined,
  ChatBubbleOutlined, MoreHorizOutlined, RepeatOneOutlined,
   ShareOutlined } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import EditPost from '../UserPhotoPost/EditPost';

export default function PostOnOthersProfile({ userData }) {
const { otherUserDetails } = useSelector(state => state.otherUser)
const { tokenData } = useSelector(state=> state.user)
 let id = userData._id;
 console.log(id," id id id id id idi di");
 const [state , setState] = useState([])


 const handlePost = async()=>{
    try {
        await axios.get('/postOnProfile/'+id,{
          headers:{
            Authorization:tokenData
          }
        }).then(async(res)=>{
           await setState(res.data)
        })
    } catch (error) {
        console.log(error);
    }
}


const deletePost = async(id)=>{
  try {
    swal({
      title: "Are you sure?",
      text: "Do you want to report this question!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async(willDelete) => {
      if (willDelete) {
        
        await axios.delete('/deletePost/'+id).then(async(res)=>{
          await handlePost()
        })  
        swal("You Reported This Question!", {
            icon: "success",
        });
    } else {
        swal("Action not done!");
    }
  })
  } catch (error) {
    console.log(error);
  }
}




 useEffect(()=>{
    handlePost();
 },[])
 
  return (
    <div className='col-5'>
    {
      state ?.map(newState=>{
        return( 
<>
          <div className="post">
          <div className="post__info">
            <img src={otherUserDetails.imageUrl} alt=""  style={{width:'45px',height:'40px', borderRadius:'50%'}}/>
            <h4>{otherUserDetails.firstName +' '+ otherUserDetails.lastName}</h4>
         
            {/* <small>
              <LastSeen date="createdAt"/>
            </small> */}
          </div>
          <div className="post__body">
            {
              <img src={newState.postUrl} alt="" />
            }  
            <hr />
          </div>
            <div>
              <p>{ ReactHtmlParser(newState.caption) }</p>
            </div>
          <div className="post__footer">
            <div className="post__footerAction">
              <ArrowUpwardOutlined />
              <ArrowDownwardOutlined />
            </div>
            <RepeatOneOutlined />
            <ChatBubbleOutlined />
            {/* <div className="post__footerLeft d-flex" >
            
              <button className='post__report'><EditPost postId={newState._id}/></button>
              <button  className="post__report ms-2"  onClick={()=> deletePost(newState._id)} >Delete</button>
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
