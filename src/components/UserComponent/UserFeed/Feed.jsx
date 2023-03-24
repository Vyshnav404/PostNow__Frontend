import React from "react";
import PostnowBox from "./PostnowBox";
import "./Feed.css";
import Post from "./Post";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/features/userSlice";
import {
  setAllQuestion,
  setSearchAllQuestion,
} from "../../../redux/features/allQuestionSlice";

function Feed() {
  const [posts, setPost] = useState([]);
  const { tokenData, userDetails } = useSelector((state) => state.user);
  const { allQuestion } = useSelector((state) => state.allQuestion);
  const { searchAllQuestion } = useSelector((state) => state.allQuestion);
  const dispatch = useDispatch();

  let mail = userDetails.email;
  const getUserDetails = async () => {
    try {
      await axios.get("/usertoredux/" + mail,{
        headers:{
          Authorization:tokenData
        }
      }).then((res) => {
        dispatch(setUser(res.data[0]));
      });
    } catch (error) {}
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    axios
      .get("/Allquestions", {
        headers: {
          Authorization: tokenData,
        },
      })
      .then((res) => {
        setPost(res.data);
       dispatch(setAllQuestion(res.data.reverse()));
       dispatch(setSearchAllQuestion(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="feed">
      <PostnowBox />
      {/* {searchAllQuestion.map((allQuestion, index) => ( */}
      <Post />
      {/* ))} */}
    </div>
  );
}

export default Feed;
