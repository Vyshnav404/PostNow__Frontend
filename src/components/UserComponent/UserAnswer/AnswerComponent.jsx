import React, { useEffect, useState } from 'react'
import { ArrowDownwardOutlined, ArrowUpwardOutlined,
    ChatBubbleOutlined, MoreHorizOutlined, RepeatOneOutlined,
     ShareOutlined } from '@material-ui/icons';
import axios from 'axios';     
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSingleQuestion } from '../../../redux/features/singleQuestionSlice'
import { setShowAnswers } from '../../../redux/features/showAnswersSlice'
import { useSelector } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { Avatar } from '@material-ui/core'
import ReactTimeAgo from 'react-time-ago'
import { Modal } from 'react-responsive-modal'
import ReactQuill from "react-quill";
import { useNavigate } from 'react-router-dom';
import ReactHtmlParser from 'html-react-parser'
import './Answer.css'
import ReasonForReport from './ReasonForReport';
import { setQuesId }  from '../../../redux/features/singleQuestionSlice'
 
 function LastSeen({ date }) {
  return (
    <div>
     <ReactTimeAgo date={new Date(date).getTime()} locale="en-US" timeStyle="round"/>
    </div>
  )
}


function AnswerComponent(){

    const { questionDetails } = useSelector(state => state.singleQuestion);
    const { quesId } = useSelector(state => state.singleQuestion);
    const { answerDetails } = useSelector(state => state.showAnswers)
    const { tokenData,userDetails } = useSelector(state=> state.user)

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [question,setQuestion]= useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [answer,setAnswer] = useState('')
    const Close = (<CloseIcon />)


    const location = useLocation();
  const qid = location.state?.id;
  dispatch(setQuesId(qid))
  console.log("eeeeeqidd",qid);
 
  const handleQuill = (value)=>{
    setAnswer(value)
  }

  const getOneQuestion = async()=>{
    await axios.get('/onequestion/'+quesId,{
      headers:{
        Authorization:tokenData
      }
    }).then((res)=>{
       console.log("datas",res.data)
       setQuestion(res.data)
       dispatch(setSingleQuestion(res.data))
      });
  }

  
  useEffect(()=>{
    getOneQuestion()
  },[])
  
 const handleSubmit = async()=>{
  if(questionDetails?._id && answer !==''){
    const config = {
      headers:{
        "Content-Type":"application/json"
      }
    }
    const body = {
      user:userDetails,
      answer : answer,
      questionId : questionDetails?._id
    }
    await axios.post('/answers',body,{
      headers:{
        Authorization:tokenData
      },
      config,
    }).then((res)=>{
      console.log("answer is comming",res.data)
      alert("Answer added successfully")
     axios.get('/getAnswers/'+qid).then((res)=>{
        console.log("answer from back",res.data)
        dispatch(setShowAnswers(res.data))
  
      })
      setIsModalOpen(false)
     
      
    })
  }
 }

 const getAnswers = async()=>{
  try {
    await axios.get('/getAnswers/'+qid).then((res)=>{
      console.log("answer from back",res.data)
      dispatch(setShowAnswers(res.data))

    })
  } catch (error) {
    console.log(error)
  }
 }

 useEffect(()=>{
  getAnswers()
 },[])
   

//  const reportQuestion = ()=>{
//   swal({
//     title: "Are you sure?",
//     text: "Do you want to report this question!",
//     icon: "warning",
//     buttons: true,
//     dangerMode: true,
//   })
//   .then((willDelete) => {
//     if (willDelete) {
      
//        axios.post('/reportQuestion/'+qid).then((res)=>{
    
//       })
//       swal("You done a action report to this question!", {
//         icon: "success",
//       });
//     } else {
//       swal("Action not done!");
//     }
//   });
  
//  }



    return(
        <div className="post">
      <div className="post__info">
        {
          questionDetails?.user?.imageUrl ? <img style={{ width:'45px',height:"40px",borderRadius:'20px'}} src={questionDetails?.user?.imageUrl}/> :  <Avatar />
        }
        <h4 className='mt-2'>{questionDetails?.user?.firstName+" "+ questionDetails?.user?.lastName}</h4>
     
         <small>
          <LastSeen date={questionDetails?.createdAt}/>
        </small> 
      </div>
      <div className="post__body">
        <div className="post__question">
          <p>{questionDetails?.questionName}</p>
          <button  onClick={()=>{
            setIsModalOpen(true);
           
          } }     
            className="post__btnAnswer">
            Answer
          </button>
          <Modal 
          open = {isModalOpen} closeIcon={Close} onClose={()=> setIsModalOpen(false)}
          closeOnEsc
          center 
          closeOnOverlayClick={false}
          styles={{
            overlay:{
              height:'auto'
            },
          }}>
            <div className='modal__question'>
              <h1>{questionDetails?.questionName}</h1>
              <p>asked by {" "}<span className='name'>Username</span>{" "}on{" "}
              <span className='name'>{new Date(questionDetails?.createdAt).toLocaleString()}</span></p>
            </div>
            <div className='modal__answer'>
              <ReactQuill value={answer} onChange={handleQuill} placeholder='Enter your answer' />
            </div>
            <div className='modal__button'>
                        <button className='cancle' onClick={()=> setIsModalOpen(false)}>
                          Cancel
                        </button>
                        <button  onClick={handleSubmit} type='submit' className='add' >
                          Add Answer
                        </button>
                      </div>
          </Modal>
        </div>
       {
        questionDetails.questionUrl !=='' && <img src={questionDetails.questionUrl} alt="" />
       }
      </div>
      <div className="post__footer">
        <div className="post__footerAction">
          <ArrowUpwardOutlined />
          <ArrowDownwardOutlined />
        </div>
        <RepeatOneOutlined />
        <ChatBubbleOutlined />
        <div className="post__footerLeft">
          {/* <button  className="post__report" onClick={reportQuestion} >Report</button> */}
          {
            <ReasonForReport  qid={qid} />
          }
          {/* <ShareOutlined />
          <MoreHorizOutlined /> */}
        </div>
      </div>
      <p
        style={{
          color: "rgba(0,0,0,0.5)",
          fontSize: "12px",
          fontWeight: "bold",
          margin: "10px 0",
        }}
      >
       {answerDetails?.length}Answers
      </p>
  
      <div
        style={{
          margin: "5px 0px 0px 0px ",
          padding: "5px 0px 0px 20px",
          borderTop: "1px solid lightgray",
        }}
        className="post__answer"
      >
          
            
                {
                  answerDetails?.map((_a)=>(
                  <>
                  
                  <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "10px 5px",
                borderTop: "1px solid lightgray",
              }}
              className="post-answer-container">
  
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#888",
                }}
                className="post-answered"
              >
                {
                  _a?.user.imageUrl ? (<img style={{width:'50px',height:'40px',borderRadius:'50%'}} src={_a?.user.imageUrl} alt="" />) : (<Avatar  />)
                }
                
                
                <div
                  style={{
                    margin: "0px 10px",
                  }}
                  className="post-info">
                    <h6>{_a?.user.firstName+" "+_a?.user.lastName}</h6>
                  <span>
                    <LastSeen date = {_a?.createdAt}/>
                  </span>
                </div>
              </div>
              <div className="post-answer">{ReactHtmlParser(_a?.answer)}</div>
            </div>
              </>))
                }
          
        
      </div>
    </div>
    )
}
export default AnswerComponent