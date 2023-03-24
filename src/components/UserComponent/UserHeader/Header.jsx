import React, { useEffect } from "react";
import logo from "../../../assets/mylogo.png";
import HomeIcon from "@material-ui/icons/Home";
import {
  AssessmentOutlined,
  Close,
  ExpandMore,
  FeaturedPlayListOutlined,
  NotificationsOutlined,
  PeopleAltOutlined,
  Search,
  Style,
} from "@material-ui/icons/";
import { Avatar, Button, Input } from "@material-ui/core";
import { Modal } from "react-responsive-modal";
import CloseIcon from "@material-ui/icons/Close";
import "./Header.css";
import { useState } from "react";
import "react-responsive-modal/styles.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  setAllQuestion,
  setSearchAllQuestion,
} from "../../../redux/features/allQuestionSlice";
import toast,{ Toaster } from 'react-hot-toast'
import { setAllPost } from '../../../redux/features/allPostSlice'



function Header() {
  const { userDetails } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { tokenData } = useSelector((state) => state.user);
  const { allQuestion } = useSelector((state) => state.allQuestion);

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [image, setImage] = useState("");
  const [searchQuery, setSearchQuery] = useState(allQuestion);
  const Close = <CloseIcon />;
  const navigate = useNavigate();

  const getAllQuestions = async()=>{
    try {
      await axios.get("/Allquestions",{
        headers:{
          Authorization:tokenData,
        },
      }).then((res)=>{
        dispatch(setAllQuestion(res.data.reverse()))
        
      })
    } catch (error) {
      console.log(error);
    }
  }

  let Allowed_File_Types = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  const handleSubmit = async () => {
    if (question !== "") {
      if (Allowed_File_Types.includes(image.type)) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_UPLOAD_NAME);

        await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_UPLOAD_NAME}/image/upload`, {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then(async (data) => {
            // setInputUrl(data.url);
            if (data.url) {
              const config = {
                headers: {
                  "Content-Type": "application/json",
                },
              };

              const body = {
                questionName: question,
                questionUrl: data.url,
                user: userDetails,
              };
              console.log(body, "body");
              // await axios.post('/questions',body,config).then((res)=>{
              //   console.log("eroor");
              //   console.log(res.data);
              //     alert(res.data.message)
              //     navigate('/')
              // })
              const datas = await axios.post("/questions", body, {
                headers: {
                  Authorization: tokenData,
                },
                config,
              }).then((res)=>{
                getAllQuestions();
              })
             
              alert("Question added succesfully");
              toast.success("Question Added Successfully")
              navigate("/").catch((e) => {
                console.log(e);
                alert("Error in adding question");
              });
            }
          });
      } else {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = {
          questionName: question,
          questionUrl: inputUrl,
          user: userDetails,
        };
        await axios
          .post("/questions", body, {
            headers:{
              Authorization:tokenData
            },config
          })
          .then((res) => {
            getAllQuestions();
            alert("successfull",res.data.message);
            toast.success("Question Added Successfully")
            navigate("/");
          })
          .catch((e) => {
            console.log(e);
            alert("Error in adding question");
          });
      }
    } ///
  };

  // useEffect(()=>{
  //   const result = allQuestion.filter(searchPost=>{
  //     return searchPost.questionName.toLowerCase().match(search.toLocaleLowerCase());
  //   })
  //   dispatch(setAllQuestion(result))
  // },[])

  const handleSearch = async (value) => {
    console.log("val", value);
    if (value === "") {
      console.log(123);
      dispatch(setAllQuestion(allQuestion));
    } else {
      const result = allQuestion.filter((searchPost) =>
        searchPost.questionName.toLowerCase().includes(value.toLowerCase())
      );
      console.log("search result", result);
      //  dispatch(setAllQuestion(result))
      dispatch(setSearchAllQuestion(result));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const getAllPosts = async()=>{
    try {
      await axios.get('/getAllPosts/',{
        headers:{
          Authorization:tokenData
        }
      }).then((response)=>{
        dispatch(setAllPost(response.data.reverse()))
        navigate('/user/userpost')
      })
    } catch (error) {
      
    }
  }

  let defaultUrl =
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp";

  return (
    <div className="qHeader">
      <div className="qHeader-content">
          <Link to="/user/home">
        <div className="qHeader__logo">
          <img src={logo} alt="logo" />
        </div>
          </Link>
        <div className="qHeader__icons">
          <div className="qHeader__icon">
            <Link className="qHeader__icon" to="/user/home">
              <HomeIcon />
            </Link>
          </div>
          <div className="qHeader__icon">
            {/* <Link className="qHeader__icon" to={"/user/userpost"}>
            </Link> */}
              <FeaturedPlayListOutlined  onClick={getAllPosts}/>
          </div>
          {/* <div className="qHeader__icon">
            <AssessmentOutlined />
          </div> */}
          <div className="qHeader__icon">
            <Link className="qHeader__icon" to='/user/messenger'>
            <PeopleAltOutlined />
            </Link>
          </div>
          {/* <div className="qHeader__icon">
            <div className="notification_counter">2</div>
            <NotificationsOutlined />
          </div> */}
        </div>
        <div className="qHeader__input">
          <Search />
          <input
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search questions"
          />
        </div>
        <div className="qHeader__Rem">
          <Link to="/user/profile">
            <img
              src={userDetails?.imageUrl ? userDetails?.imageUrl : defaultUrl}
              alt="avatar"
              className="rounded-circle"
              style={{ width: "50px", height: "35px" }}
            />
          </Link>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          style={{
            backgroundColor: "#9b2222",
            color: "lightgrey",
            marginLeft: "8px",
          }}
        >
          Add Question
        </Button>
        <Modal
          open={isModalOpen}
          closeIcon={Close}
          onClose={() => setIsModalOpen(false)}
          closeOnEsc
          center
          closeOnOverlayClick={false}
          styles={{
            overlay: {
              height: "auto",
            },
          }}
        >
          <div className="modal__title">
            <span className="modalspan">Add Question</span>
            <span>Share Link</span>
          </div>
          <div className="modal__info">
            <Avatar className="avatar" />
            <div className="modal__scope">
              <PeopleAltOutlined />
              <span>Public</span>
              <ExpandMore />
            </div>
          </div>
          <div className="modal__Field">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              type="text"
              placeholder="Start your question with 'What','How' ,'Why' ,etc.."
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <input
                type="file"
                className="inputSize mt-5"
                // value={inputUrl}
                onChange={(e) => setImage(e.target.files[0])}
                style={{
                  margin: "5px 0",
                  border: "1px solid lightgray",
                  padding: "10px",
                  outline: "2px solid #000",
                }}
                placeholder="Optional: include a link that gives context"
              />
              {inputUrl !== "" && (
                <img
                  style={{
                    height: "40vh",
                    objectFit: "contain",
                  }}
                  src={inputUrl}
                  alt="image"
                />
              )}
            </div>
          </div>
          <div className="modal__buttons">
            <button className="cancle" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button onClick={handleSubmit} type="submit" className="add">
              Add Question
            </button>
          </div>
        </Modal>

        <Button
          onClick={handleLogout}
          style={{
            backgroundColor: "#9b2222",
            color: "lightgrey",
            marginLeft: "8px",
          }}
        >
          Logout 
        </Button>
      </div>
      <Toaster />
    </div>
  );
}

export default Header;
