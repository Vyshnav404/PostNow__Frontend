import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ReactHtmlParser from 'html-react-parser'
import axios from 'axios'


function QuestionShowModal({row}){

  const [lgShow, setLgShow] = useState(false);
  const [questionDetails, setQuestionDetails] = useState('')


  const getreportQuestionDetails = async()=>{
    try {
      
     await axios.get(`/admin/getReportQuestionDetails/${row}`).then((res)=>{
       console.log("response report",res.data)
       setQuestionDetails(res.data)
      
     })
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getreportQuestionDetails();
  },[])

  return (
    <>
      
    <Button className='btn btn-dark'  onClick={()=> setLgShow(true)}>View Question</Button>

    <Modal 
     size='lg'
     show={lgShow}
     onHide={()=> setLgShow(false)}
     aria-labelledby="example-modal-sizes-title-lg"
     >
      <Modal.Header closeButton>
        <Modal.Title id='example-modal-sizes-title-lg'>
          Reported Question
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className='text-center'>
      <h4>{questionDetails?.questionName}</h4>
      </div>
      <div className='text-center'>
      <img style={{width:"30vw"}} src= {questionDetails?.questionUrl} />
      </div>
      <div className='text-center'>
        {/* <h6>{ReactHtmlParser(questionDetails?.body)}</h6> */}
      </div>
      </Modal.Body>
    </Modal>
    </>
  )
}

export default QuestionShowModal
