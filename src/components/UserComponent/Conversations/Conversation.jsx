import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../helpers/UsersChatHelper';
import { setFriendData } from '../../../redux/features/friendSlice'
import './Conversation.css'

function Conversation({conversation, currentUser}) {
const [user, setUser] = useState(null);
const { tokenData } = useSelector(state => state.user)
const dispatch = useDispatch()

useEffect(()=>{
const friendId = conversation.members.find((m)=>m !== currentUser._id);

try {
  (async()=>{
    const data = await getUser(friendId,tokenData);
    dispatch(setFriendData(data))
    setUser(data)
  })();
} catch (error) {
  console.log("ivde eroor",error);
}
},[currentUser,conversation])


  return (
    <div className='conversation'>
      <img
      className='conversationImg'
      src={user?.imageUrl}
       alt="" />
       <span  className='conversationName'>{user?.firstName}</span>
    </div>
  )
}

export default Conversation
