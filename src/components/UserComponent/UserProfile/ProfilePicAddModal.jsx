import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import toast,{ Toaster } from 'react-hot-toast'

function ProfilePicAddModal() {
  
  const { userDetails } = useSelector(state => state.user)
  const { tokenData } = useSelector(state => state.user)

  const id = userDetails._id
  const email = userDetails.email
  const [show, setShow] = useState(false);
  const [ image,setImage] = useState('')
  const [ url, setUrl ] = useState('')

 let Allowed_File_Types = ["image/jpeg","image/jpg","image/png","image/webp","image/gif" ]

  const handleSubmit = async()=>{
    if(Allowed_File_Types.includes(image.type)){
      const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","imagetesting")
    data.append("cloud_name",'dv5vyqpjh') 
    
    await fetch('https://api.cloudinary.com/v1_1/dv5vyqpjh/image/upload',{
      method:"post",
      body:data
    }).then((res)=>res.json())
    .then(async(data)=>{
      console.log("image",data.url);
      // setUrl(data.url) 
      // console.log("url=     ==========",url);
      await axios.put('/profilePicture/'+id,{url:data.url},{
        headers:{
          Authorization: tokenData
        }
      }).then(async(res)=>{
        toast.success("image updated")
        await axios.get('/getUser/'+email,{
          headers:{
            Authorization:tokenData
          }
        }).then((res)=>{
          setShow(false)
        })
      })
    })
   .catch((err)=>{
      console.log(err);
    })
    }else{
     toast.error("File type is not good")
    }
    
  }



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='ms-2'>
      <Button style={{background:'rgb(155, 34, 34)',border:'none'}} onClick={handleShow}>
        Add Profile Pic
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Profile Pic</Modal.Title>
        </Modal.Header>
        {/* <form  onSubmit={handleSubmit}> */}
        <input type="file" name="image" onChange={(e)=> setImage(e.target.files[0])} />
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button onClick={handleSubmit}  type="submit" variant="primary"  >
          Save Changes
        </button>
        </Modal.Footer>
        {/* </form> */}
      </Modal>
      <Toaster/>
    </div>
  );
}

export default ProfilePicAddModal
