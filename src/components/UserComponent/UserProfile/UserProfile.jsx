import React, { useState } from 'react'
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import{ useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../redux/features/userSlice'
import axios from 'axios';
import { useEffect } from 'react';
import ProfileUpdate from './ProfileUpdate';
import ProfilePicAddModal from './ProfilePicAddModal';
import PostOnProfile from './PostOnProfile';
import QuestionOnProfile from './QuestionOnProfile';
import Button from 'react-bootstrap/esm/Button';
import AddPhotoPost from '../UserPhotoPost/AddPhotoPost';

const UserProfile = () => {
  const { userDetails } = useSelector(state=> state.user);
  const { tokenData } = useSelector(state => state.user)
  const [useresponse , setResponse] = useState([])
  const [values , setValues] = useState(null)

  const dispatch = useDispatch()

  let post;
  const handlePost=()=>{
    setValues(post)
  }
 
  let questions;
  const handleQuestion =()=>{
    setValues(null)
  }

  let email = userDetails.email
  const getUser = async()=>{
    // await axios.get('/getUser/'+email).then((response)=>{
    //     setResponse(response.data)
    //     dispatch(setUser(response.data))
    // })
    const data = await axios({
      url:'/getUser/'+email,
      method:'get',
      headers:{
        Authorization:tokenData
      }
    })
    setResponse(data.data)
    dispatch(setUser(data.data))

  }

  useEffect(()=>{
    getUser()
  },[])

  // useEffect(async()=>{
  //   const data = await axios( {
  //     url:'/getUser/'+email,
  //     method:'get',
  //     headers:{
  //       Authorization:tokenData
  //     }
  //   })
  // })


 let defaultUrl = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
  return (
    <div >
        <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
      

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
               
               <img src={useresponse.imageUrl ? useresponse?.imageUrl:defaultUrl} 
               alt="avatar"
                className='rounded-circle'
                style={{width:'150px'}} />

                <p className="text-muted mb-1">{userDetails.firstName+" "}{userDetails.lastName}</p>
                <p className="text-muted mb-4">{userDetails.job}</p>
                
                <div className="d-flex justify-content-center mb-2 ">
                  {/* <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">Message</MDBBtn> */}
                  <ProfileUpdate  userData={userDetails}  /><ProfilePicAddModal />
                </div>
                <AddPhotoPost />

              </MDBCardBody>
            </MDBCard>

           
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>First Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDetails.firstName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Last Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDetails.lastName} </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDetails.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
               
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Profession</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDetails.job}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Company</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDetails.company}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        <div className='d-flex' style={{justifyContent:'center'}}>
         <div style={{marginRight:"15px"}}>
            <Button style={{backgroundColor:'rgb(155, 34, 34)'}} onClick={handlePost}>Posts</Button>
          </div> 
         <div>
          <Button  style={{backgroundColor:'rgb(155, 34, 34)'}} onClick={handleQuestion}>Questions</Button>
         </div>         
        </div>

        <div className='d-flex mt-2' style={{flexDirection:'column', alignItems:'center'}}>
         
          {
            values === post ? <PostOnProfile userData={userDetails}/> :  <QuestionOnProfile userData={userDetails}/> 
          } 

        </div>
      </MDBContainer>
    </section>
    </div>
  )
}

export default UserProfile





   
