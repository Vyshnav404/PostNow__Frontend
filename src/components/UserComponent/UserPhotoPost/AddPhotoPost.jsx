import React, { useState } from "react";
import ReactQuill from "react-quill";
import { Modal } from "react-responsive-modal";
import Button from "react-bootstrap//Button";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { setAllPost } from '../../../redux/features/allPostSlice'
import './AddPhoto.css'

function AddPhotoPost() {
  const { userDetails, tokenData } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState('');
  const Close = <CloseIcon />;
  console.log("immage data", image);
  const dispatch = useDispatch()

  const getPosts = async()=>{
    try {
      await axios.get("/getAllPosts",{
        headers:{
          Authorization:tokenData
        }
      }).then((response)=>{
        dispatch(setAllPost(response.data.reverse()))
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handleQuill = (value) => {
    setCaption(value);
  };
  let Allowed_File_Types = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  const handleSubmit = async () => {
    if (Allowed_File_Types.includes(image.type)) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
      data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_UPLOAD_NAME);

      await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_UPLOAD_NAME}/image/upload`, data)
        // .then((res) => res.json())
        .then(async (res) => {
          if (res.data.url) {
            const config = {
              headers: {
                "Content-Type": "application/json",
              },
            };
            
            const body = {
              postUrl: res.data.url,
              caption: caption,
              user: userDetails,
              category:category,
            };
            
            await axios
            .post("/addPost", body, {
              headers: {
                Authorization: tokenData,
              },
              config,
            })
            .then((res) => {
                 getPosts();
                toast.success("Post Added Successfully");

                // >>>>>>>> Add balance after Post page complete <<<<<<<<
              });
          }
        });
    }
    setIsModalOpen(false);
  };

  const handleShow = () => setIsModalOpen(true);
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Button
          style={{ background: "rgb(155, 34, 34)", border: "none" }}
          onClick={handleShow}
        >
          Add Post
        </Button>
      </div>
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
        <div className="modal__question">
          <h1>Create a Post</h1>
          {/* <p>asked by {" "}<span className='name'>Username</span>{" "}on{" "}
              <span className='name'>{new Date(questionDetails?.createdAt).toLocaleString()}</span></p> */}
        </div>
        <div>
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="image"
              style={{ width: "50%" }}
            />
          )}
        </div>
        <div className="category mt-4">
          <div>
          <p style={{ marginRight: "10px"}}>Select Category:</p>
          </div>
            <div>
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option></option>
            <option>History</option>
            <option>Science</option>
            <option>Programming</option>
            <option>India</option>
            <option>World</option>
          </select>
            </div>
        </div>

        <div className="modal__answer">
          <ReactQuill
            value={caption}
            onChange={handleQuill}
            placeholder="Enter your answer"
          />
        </div>
       
        <div className="modal__button">
          <button className="cancle" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
          <button onClick={handleSubmit} type="submit" className="add">
            Add Post
          </button>
        </div>
      </Modal>

      <Toaster />
    </div>
  );
}

export default AddPhotoPost;
