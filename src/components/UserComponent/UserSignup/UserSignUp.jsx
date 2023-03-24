import React from "react";
import "./UserSignup.css";
import { useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import axios from "axios";
import { styled } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/features/userSlice";

function UserSignUp() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios
        .post("/signup", data)
        .then((response) => {
          console.log(response.data.OTP,"goood");
          console.log(response.data,"goood");
 
          dispatch(setUser(response, response.data.OTP));
          navigate("/user/otp-page");
        });
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="Signup-container">
        <div className="signbody">
          <div className="Signup-lf-container">
            <p className="signup-title">Create New Account</p>
            <div className="Signup-gf-login">
              <a href="#">
                <i className="fab fa-google-plus-g"></i>
                <p>Signup with Google</p>
              </a>
              <a href="#">
                <i className="fab fa-facebook"></i>
                <p>Signup with facebook</p>
              </a>
            </div>
            <form
              action="#"
              className="Signup-login-form"
              onSubmit={handleSubmit}
              
              
            >
              <div className="Signup-form-group">
                <input
                  type="text"
                  id="nama"
                  name="firstName"
                  value={data.firstName}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                ></input>
              </div>
              <div className="Signup-form-group">
                <input
                  type="text"
                  id="lastname"
                  name="lastName"
                  value={data.lastName}
                  onChange={handleChange}
                  placeholder="Lastname"
                  required
                ></input>
              </div>
              <div className="Signup-form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                ></input>
              </div>
              <div className="Signup-form-group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                ></input>
              </div>

              {error && (
                <div>
                  <p className="error_msg">{error}</p>
                </div>
              )}

              <div className="Signup-form-group">
                <button type="submit" className="Signup-button">
                  Create account
                </button>
              </div>
            </form>
          <div><p className="forgot" >Already have an account <Link to='/'>Login</Link></p></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSignUp;
