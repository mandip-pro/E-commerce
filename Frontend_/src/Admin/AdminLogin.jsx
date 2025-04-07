import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";
function AdminLogin() {
  const navigate=useNavigate()
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signUp, setSignUp] = useState(false);
  function handleChange(e) {
    let inputData = e.target.value;
    let inputName = e.target.name;
    setLoginData((prev) => {
      return {
        ...prev,
        [inputName]: inputData,
      };
    });
  }

  async function handlesubmit() {
    if (signUp) {  
     
      //register code    
      try {
        let responce = await fetch("http://127.0.0.1:3000/api/admin", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });
        responce = await responce.json();
        if (responce.state) {
          toast.success(responce.message);
          setSignUp(!signUp)
          //navigate
        } else {
          toast.error(responce.message);
        }
      } catch (err) {
        console.log(err);
      }
    }else{
      //login code
      try {
        let responce = await fetch("http://127.0.0.1:3000/api/admin/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });
        responce = await responce.json();
        if (responce.state) {
          toast.success(responce.message)
          navigate('/admin/dashboard')
         localStorage.setItem("admin",responce.token)
         localStorage.setItem('adminId',responce.user._id)
        
          
        } else {
          toast.error(responce.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <div className="body">
        <div className="login-box">
          <div className="login-header">
            <header>{signUp ? "Admin Register" : "Admin Login"}</header>
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="email"
              name="email"
              onChange={handleChange}
              required
              className="input-field"
              autoComplete="off"
            ></input>
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="password"
              name="password"
              onChange={handleChange}
              required
              className="input-field"
              autoComplete="off"
            ></input>
          </div>
          <div
            className="input-box"
            style={{ display: signUp ? "inline" : "none" }}
          >
            <input
              type="text"
              placeholder="confirm-password"
              name="password"
              required
              className="input-field"
              autoComplete="off"
            ></input>
          </div>
          <div className="forgot">
            <section>
              <input type="checkbox" id="check"></input>
              <label htmlFor="check">Remember me</label>
            </section>
          </div>
          <div className="input-submit">
            <button
              className="submit-btn"
              id="submit"
              onClick={handlesubmit}
            ></button>
            <label htmlFor="submit">{signUp ? "Register" : "Login"}</label>
          </div>
          <div
            className="sign-up-link"
            style={{ display: signUp ? "none" : "inline" }}
          >
            <p>
              Don't have account?
              <button
                className="a"
                onClick={() => {
                  setSignUp(!signUp);
                }}
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default AdminLogin;
