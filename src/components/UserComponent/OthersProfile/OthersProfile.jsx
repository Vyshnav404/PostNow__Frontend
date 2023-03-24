import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
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
import axios from 'axios';
import { setOtherUser } from '../../../redux/features/otherUserSlice'
import { useDispatch,useSelector } from 'react-redux';
import PostOnOthersProfile from './PostOnOthersProfile';
import QuestionOnOthersProfile from './QuestionOnOthersProfile';

const ProfilePage =()=> {

  const { otherUserDetails } = useSelector(state => state.otherUser)
  const { tokenData,userDetails } = useSelector(state => state.user)

 const [ values, setValues] = useState(null)
 const location = useLocation();
 const dispatch = useDispatch();
 let userId = location.state?.id
 let currentId = userDetails._id
 const [ isFollowing,setIsFollowing ] = useState(otherUserDetails.following.includes(currentId));


 
 const handleFollowClick = async()=>{
  try {
    await axios.put('/follow/'+userId,{currentUserId:currentId}).then((response => {
      console.log(response)
      getOthersDetails();
     setIsFollowing(true)
    }))
   
  } catch (error) {
    console.log(error);
  }
 }

 const handleUnfollowClick = async()=>{
  try {
    await axios.put('/unfollow/'+userId,{currentUserId:currentId}).then(response =>{
      console.log(response)
      getOthersDetails();
      setIsFollowing(false)
    })
  } catch (error) {
    console.log(error);
  }
 }
 console.log("unfollow",otherUserDetails);
 console.log("unfol======low",currentId);
   
 const getOthersDetails = async()=>{
  try {
    await axios('/getOthersDetail/'+userId,{
      headers:{
        Authorization:tokenData
      }
    }).then((res)=>{
        dispatch(setOtherUser(res.data))
    })
  } catch (error) {
    console.log(error); 
  }
 }

let post;
const handlePost = async()=>{
  setValues(post)
}

let question;
const handleQuestion = async()=>{
   setValues(null)
}

 useEffect(()=>{
  getOthersDetails();
 },[])

 const defaultUrl = 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
 console.log(isFollowing)
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">

                <img src={otherUserDetails.imageUrl ? otherUserDetails.imageUrl : defaultUrl}
                
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px',height:'150px' }}
                  fluid />
                  
                <h4 className="text-muted mb-">{otherUserDetails.firstName+" "+otherUserDetails.lastName}</h4>
                <p className="text-muted mb-4">{otherUserDetails.job}</p>
                <div>
                  { 
                  otherUserDetails.followers.includes(currentId) ? <Button onClick={handleUnfollowClick}>Unfollow</Button> : <Button onClick={handleFollowClick}>Follow</Button>
                  }
                                   
                </div>
               
              </MDBCardBody>
            </MDBCard>

          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>FirstName</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{otherUserDetails.firstName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>LastName</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{otherUserDetails.lastName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{otherUserDetails.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Job</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{otherUserDetails.job}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Company</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{otherUserDetails.company}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                
              </MDBCardBody>
            </MDBCard>           
          </MDBCol>
        </MDBRow>

        <div className='d-flex' style={{justifyContent:'center'}}>
         <div style={{marginRight:"15px"}}>
            <Button onClick={handlePost}>Posts</Button>
          </div> 
         <div>
          <Button onClick={handleQuestion}>Questions</Button>
         </div>         
        </div>

        <div className='d-flex' style={{flexDirection:'column', alignItems:'center'}}>
          {
            values === post ? <PostOnOthersProfile userData={otherUserDetails}/> : <QuestionOnOthersProfile userData={otherUserDetails}/> 
           
          } 

        </div>
      </MDBContainer>
    </section>
  );
}

export default ProfilePage