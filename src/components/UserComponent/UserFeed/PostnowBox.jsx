import React from 'react'
import { Avatar } from '@material-ui/core'
import './PostnowBox.css';
import { useSelector } from 'react-redux'

function PostnowBox() {
  const { userDetails } = useSelector(state => state.user)
  return (
    <div className='postnowBox'>
      <div className='postnowBox__info'>
        {
        
          userDetails.imageUrl ? <img style={{width:'45px',height:'40px',borderRadius:"20px"}}  src={userDetails?.imageUrl} /> : <Avatar />
        }
        <div className='userName ms-3'>{userDetails.firstName+" "+userDetails.lastName}</div>
      </div>
      <div className='postnowBox__post'>
        <h5>What is your question or link ?</h5>
        </div>
    </div>
  )
}

export default PostnowBox
