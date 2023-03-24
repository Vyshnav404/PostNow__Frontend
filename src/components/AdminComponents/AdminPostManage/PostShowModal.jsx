import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ReactHtmlParser from 'html-react-parser'
import axios from 'axios'

function PostShowModal({row}) {

 const [lgShow,setLgShow] = useState(false);
 const [postDetails,setPostDetails] = useState('')

 const getReportPostDetails = async()=>{
    try {
        await axios.get(`/admin/singlereportedpost/${row}`).then((res)=>{
            setPostDetails(res.data)
        })
    } catch (error) {
        console.log(error);
    }
 }

 useEffect(()=>{
    getReportPostDetails();
 },[])

  return (
    <div>
       <Button className='btn btn-dark'  onClick={()=> setLgShow(true)}>View Post</Button>

<Modal 
 size='lg'
 show={lgShow}
 onHide={()=> setLgShow(false)}
 aria-labelledby="example-modal-sizes-title-lg"
 >
  <Modal.Header closeButton>
    <Modal.Title id='example-modal-sizes-title-lg'>
      Reported Post
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <div className='text-center'>
  <h4>{postDetails?.caption}</h4>
  </div>
  <div className='text-center'>
  <img style={{width:"30vw"}} src= {postDetails?.postUrl} />
  </div>
  <div className='text-center'>
    {/* <h6>{ReactHtmlParser(questionDetails?.body)}</h6> */}
  </div>
  </Modal.Body>
</Modal>
    </div>
  )
}

export default PostShowModal
