import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useSelector } from 'react-redux';


function ReasonForReport({ qid }) {
  const [show, setShow] = useState(false);
  const [reason, setReason] = useState('')
  const { tokenData } = useSelector(state=> state.user)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeReason = (e)=>{
    setReason(e.target.value)
  }

  const reportQuestion = ()=>{
    swal({
      title: "Are you sure?",
      text: "Do you want to report this question!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
         axios.post('/reportQuestion/'+qid,{reason:reason},{
          headers:{
            Authorization:tokenData
          }
         }).then((res)=>{
             
        })
        swal("You Reported This Question!", {
            icon: "success",
        });
    } else {
        swal("Action not done!");
    }
});


setShow(false)
     
   }

  return (
    <>
      <Button style={{background:'rgb(155, 34, 34)',border:'none'}} onClick={handleShow}>
        Report
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reason For Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter the reason :</Form.Label>
              <Form.Control as="textarea"  onChange={changeReason} rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={reportQuestion}>
            Report
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReasonForReport