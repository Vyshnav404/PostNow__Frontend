import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import toast,{ Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../redux/features/userSlice';
import axios from 'axios';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'

function ProfileUpdate({ userData }) {

    const { tokenData } = useSelector(state=> state.user)
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const  initialValue = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      job: userData.job,
      company : userData.company
    }
    const [ userDetail , setUserDetail ] = useState(initialValue);
    // console.log("userDetails",userDetail);

    var data_id = userData._id;
    const getUserDetails = async()=>{
      console.log("userData");
      await axios.get('/getUserDetails/'+data_id,{
        headers:{
          Authorization:tokenData
        }
      }).then((response)=>{
       setUserDetail(response.data) 
      dispatch(setUser(response.data))
      })
    }


  //  const handleChange = (e) => {
  //   var name = e.target.name;
  //   var value = e.target.value;
  //   console.log(name,"name");
  //   console.log(value,"value");
  //   setUserDetail({
  //     ...userData,
  //     [name]:value,
  //   });
  //  }

   const id = userData._id
   const updateData = { ...userDetail, id };
   const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      await axios.put('/update-user/',updateData,{
        headers:{
          Authorization:tokenData
        }
      }).then(async(res)=>{
        console.log("updated");
        await axios.get('/getUserDetails/'+data_id,{
          headers:{
            Authorization:tokenData
          }
        }).then((response)=>{
       
          dispatch(setUser(response.data))
          setUserDetail(response.data)
        
          toast.success("profile updated")
          navigate("/user/profile")
        })
        
      })
    } catch (error) {
      console.log(error);
    }
   }

    useEffect(()=>{
      getUserDetails()
    },[])

  return (
    <>
      <Button style={{background:'rgb(155, 34, 34)',border:'none'}} onClick={handleShow}>
        Edit Profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                value={userDetail.firstName}
                onChange={(e)=>setUserDetail({...userDetail,firstName:e.target.value})}
                name="firstName"
                type="text"
                placeholder="New Name"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={userDetail.lastName}
                onChange={(e)=>setUserDetail({...userDetail,lastName:e.target.value})}
                name="lastName"
                type="text"
                placeholder="New Name"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={userDetail.email}
                onChange={(e)=>setUserDetail({...userDetail,email:e.target.value})}
                name="email"
                type="email"
                placeholder="New email"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Profession</Form.Label>
              <Form.Control
                value={userDetail.job}
                onChange={(e)=>setUserDetail({...userDetail,job:e.target.value})}
                name="job"
                type="text"
                placeholder="Your Profession"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Company</Form.Label>
              <Form.Control
                value={userDetail.company}
                onChange={(e)=>setUserDetail({...userDetail,company:e.target.value})}
                name="company"
                type="text"
                placeholder="Your Company"
                autoFocus
              />
            </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button className='btn btn-primary' type='submit'>
            Update
          </button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
        </form>
        <Toaster />
      </Modal>
    </>
  )
}

export default ProfileUpdate
