import React, { useEffect, useRef, useState } from 'react'
import ChatOnline from '../ChatOnline/ChatOnline'
import Conversation from '../Conversations/Conversation'
import Message from '../Message/Message'
import './Messenger.css'
import { useSelector } from "react-redux"
import axios from 'axios'
import {io} from "socket.io-client"
import SearchBar from './SearchBar'
import InputEmoji from 'react-input-emoji'
import { MdOutlineAttachFile } from "react-icons/md";
import { BiVideoPlus, BiImageAdd } from "react-icons/bi";
import { GrSend } from "react-icons/gr";






function Messenger() {
 const { userDetails } = useSelector((state) => state.user)
 const [conversations, setConversations] = useState([]);
 const [currentChat, setCurrentChat] = useState(null);
 const [messages, setMessages] = useState([]);
 const [newMessages, setNewMessages] = useState("");
 const [arrivalMessages, setArrivalMessages] = useState(null);
 const socket = useRef()
 const scrollRef = useRef();
 const imageRef = useRef();
 const videoRef = useRef();
const [showMenu,setShowMenu] = useState(false)
const [image, setImage] = useState(null);
const [videoFile, setVideoFile] = useState(null);



useEffect(()=>{
socket.current = io(import.meta.env.VITE_APP_SOCKET_URL);
socket.current.on('getMessage',data =>{
  setArrivalMessages({
    sender: data.senderId,
    text: data.text,
    createdAt: Date.now(),
  })
})
},[])


useEffect(()=>{
  arrivalMessages && 
  currentChat?.members.includes(arrivalMessages.sender) && 
  setMessages((prev)=> [...prev,arrivalMessages])
},[arrivalMessages,currentChat]);


 useEffect(()=>{
  socket.current.emit("addUser",userDetails._id);
  socket.current.on("getUsers",users=>{
    console.log(users);
  })
 },[userDetails])

 useEffect(()=>{
  const getConversations = async ()=>{
    try {
      const res = await axios.get('/conversation/'+userDetails._id);
      setConversations(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  getConversations();
 },[userDetails._id])


useEffect(()=>{
  const getMessages = async()=>{
    try {
      const res = await axios.get('/message/'+ currentChat?._id);
      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  getMessages()
},[currentChat,messages])


// const handleSubmit = async(e) =>{
//   e.preventDefault();
//   const message = {
//     sender:userDetails._id,
//     text: newMessages,
//     conversationId:currentChat._id,
//   }
  
//   const receiverId = currentChat.members.find(member=> member !==userDetails._id)

//   socket.current.emit("sendMessage",{
//     senderId:userDetails._id,
//     receiverId,
//     text:newMessages
//   })

//   try {
//     const res = await axios.post('/message',message)
//     setMessages([...messages,res.data])
//     setNewMessages('')
//   } catch (error) {
//     console.log(error);
//   }
// }



useEffect(()=>{
  scrollRef.current?.scrollIntoView({behavior: "smooth"});
},[messages]);


const handleSubmit = async () => {
  try {
    const message = {
      conversationId: currentChat._id,
      sender: userDetails._id,
      text: newMessages,
      type: "text",
    };

    //sending messages to socket server
    const recieverId = currentChat?.members?.find(
      (member) => member !== userDetails._id
    );
    socket.current.emit("sendMessage", {
      senderId: userDetails._id,
      recieverId,
      text: newMessages,
    });

    //sending messages to database
    const res = await axios.post('/message',message)
    setMessages([...messages, res]);
    setNewMessages("");
  } catch (error) {
    console.log(error)
  }
};


///=====upload image and video 
const UploadFile = async () => {
  if (videoFile === null && image === null) {
    return;
  }
  const type = !image ? "video" : "image";
  const file = !image ? videoFile : image;
  if (file.size > 70000000) {
    toast.error("seems lik ebidg a filen take some time");
  }
  const data = new FormData();
  data.append("file", file);
  data.append(
    "upload_preset",
    "imagetesting"
  );
  data.append("cloud_name", "dv5vyqpjh");
  try {
    const res = await axios.post('https://api.cloudinary.com/v1_1/dv5vyqpjh/image/upload',data);
    // console.log("Url",res);
    const message = {
      sender: userDetails._id,
      text: res.data.secure_url,
      conversationId: currentChat._id,
      type: type,
    };
    const url = res.data.secure_url;

    //sending file to socket server
    const recieverId = currentChat?.members?.find(
      (member) => member !== userDetails._id
    );
    socket.current.emit("sendMessage", {
      message,
    });

    //sending to the database
    await axios.post('/message',message).then((response) => {
      console.log("response ", response);
      setMessages([...messages]);
      setVideoFile(null);
      setImage(null);
    });
  } catch (error) {
    console.log("error wile uploading to cloudinary ", error);
  }
};


  return (
    <div className='messenger'>
      <div className='chatMenu'>
      <div className='chatMenuWrapper'>
        <SearchBar />
        <div className='card-scroll'
        style={{height:"407px",overflowY:'scroll'}}>
       
        {
          conversations.map((c)=>(

            <div onClick={()=>setCurrentChat(c)} >
            <Conversation conversation={c} currentUser={userDetails}/>
            </div>
          ))
        }
         </div>
      </div>
      </div>

      <div className='chatBox'>
      <div className='chatBoxWrapper'>
        {
          currentChat ?
        <>
        <div className='chatBoxTop'>
          {
            messages.map((m)=>(
              <div ref={scrollRef}>
              <Message  message={m} own={m.sender === userDetails?._id}/>
              </div>
            ))
          }
      
        </div>
        <div className="chatBoxBottom">
                  <div
                    onClick={() => {
                      setShowMenu(!showMenu);
                    }}
                    style={{ width: "29px", height: "29px", cursor: "pointer" }}
                  >
                    <MdOutlineAttachFile />
                  </div>
                  {showMenu && (
                    <div
                      style={{
                        display: "block",
                        textAlign: "center",
                        height: "max-content",
                        position: "absolute",
                        marginTop: "-7em",
                        marginLeft: "-0.7em",
                      }}
                    >
                      <div
                        onClick={() => imageRef.current.click()}
                        style={{
                          padding: "5px",
                          borderRadius: "50%",
                          marginBottom: "0.7em",
                        }}
                      >
                        <BiImageAdd
                          style={{ fontSize: "2em", color: "#21F052" }}
                        />
                        <input
                          disabled={videoFile}
                          onChange={(e) => {
                            setImage(e.target.files[0]);
                          }}
                          type="file"
                          id="file"
                          ref={imageRef}
                          style={{ display: "none" }}
                          accept="image/x-png,image/gif,image/jpeg"
                        />
                      </div>
                      <div
                        onClick={() => videoRef.current.click()}
                        style={{
                          padding: "5px",
                          borderRadius: "50%",
                          marginBottom: "0.7em",
                        }}
                      >
                        <BiVideoPlus
                          style={{ fontSize: "2em", color: "#EC4768" }}
                        />
                        <input
                          disabled={image}
                          onChange={(e) => {
                            setVideoFile(e.target.files[0]);
                          }}
                          type="file"
                          id="file"
                          ref={videoRef}
                          style={{ display: "none" }}
                          accept="video/mp4,video/x-m4v,video/*"
                        />
                      </div>
                    </div>
                  )}

                  <InputEmoji
                    className="chatMessageInput"
                    onChange={(value) => setNewMessages(value)}
                    value={newMessages}
                    placeholder="write Something...."
                  />
                  <GrSend
                    style={{ marginLeft: "1em" ,cursor:'pointer'}}
                    onClick={() =>
                      newMessages !== "" ? handleSubmit() : UploadFile()
                    }
                    className="sendIcon"
                  />
                  <input
                    type="file"
                    name=""
                    id=""
                    style={{ display: "none" }}
                    ref={imageRef}
                  />
                </div></> : <span className='noConversationText' >
          Open a conversation to start a chat.</span>}
      </div>
      </div>

      <div className='chatOnLine'>
        <div className='chatOnLineWrapper'>
          {/* <ChatOnline /> */}
        </div>
      </div>

    </div>
  )
}

export default Messenger
