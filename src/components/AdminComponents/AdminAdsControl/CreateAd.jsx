import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import toast,{ Toaster } from 'react-hot-toast'
import { setAllAds } from '../../../redux/features/adsSlice'

import './createAd.css'
import { useDispatch } from 'react-redux';



function CreateAd() {

const [show, setShow] = useState(false)
const [title,setTitle] = useState('')
const [description,setDescription] = useState('')
const [image,setImage] = useState('')
const dispatch = useDispatch()


const handleShow = ()=> setShow(true);
const handleClose = ()=> setShow(false);

const getAds = async()=>{
  try {
    await axios.get("/admin/adsdetails").then((res)=>{
      dispatch(setAllAds(res.data))
    })
  } catch (error) {
    console.log(error);
  }
}

let Allowed_File_Types = ["image/jpeg","image/jpg","image/png","image/webp","image/gif"]

const handleSubmit = async(e)=>{
e.preventDefault()
try {
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
      console.log("Adds image",data.url,title,description);
      await axios.post('/admin/createads',{url:data.url,title,description}).then((res)=>{
        toast.success("Ads added successfully")       
        handleClose()
        getAds()
      })
    })
  }else{
  toast.error("file not supported")

  }
  
} catch (error) {
 console.log(error); 
}
}

  return (
    <div className=''>
    <Button style={{background:'#ffc107',border:'none',color:'black'}} onClick={handleShow}>
      Add Ads
    </Button>

    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>create ads</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit} >
      <Modal.Body>
        <div>
            <label htmlFor="title" className='me-2'>Title :</label>
            <input type="text" id='title' name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div style={{display:'flex'}}>
            <label htmlFor="description" className='me-2'>Description :</label>
            <textarea  name='description' value={description} onChange={(e)=> setDescription(e.target.value) }/>
        </div>
        <div>
      <input type="file" name="image" onChange={(e)=> setImage(e.target.files[0])} />
      </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <button  type="submit" variant="primary"  >
        Save Changes
      </button>
      </Modal.Footer>
      </form>
    </Modal>
    <Toaster/>
  </div>
  )
}

export default CreateAd
