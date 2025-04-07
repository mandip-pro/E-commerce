import React, { useState ,useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import logo from "../assets/images.png";
import { Link, NavLink } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {    
  const token=localStorage.getItem("user")
  const [menu, setMenu] = useState("Home");

  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const [count,setCount]=useState(0)
 const checkIsLoggedIN=async()=>{

    if(token){
      setIsLoggedIn(!isLoggedIn)            

    }else{
      setIsLoggedIn(isLoggedIn)
    }
  }
  const handleLogout=async()=>{
    try {
      let responce = await fetch("http://127.0.0.1:3000/api/auth/logout");
      responce = await responce.json();
      if (responce.state) {
         toast.success(responce.message);
        setIsLoggedIn(!isLoggedIn)
        localStorage.clear()
      } else {
        toast.error(responce.message);
      }
  }catch (err) {
    console.log(err);
  }
}
const findCartCount=async()=>{
    let responce = await fetch("http://127.0.0.1:3000/api/users/purchase", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    responce = await responce.json();
    setCount(responce.purchasedProductId.length)
  
}
  useEffect(() => {
    checkIsLoggedIN()
  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(()=>{
    if (isLoggedIn){
      findCartCount()
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isLoggedIn])
  return (
    <div className="navbar">
      <div className="nav-logo">
        <NavLink to="/"><img src={logo} alt="" /></NavLink>
        <p>E-commerce</p>
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("Home");
          }}
        >
          <NavLink style={{ textDecoration: "none" }} to="/">
            Home
          </NavLink>
          {menu==="Home" ? <hr></hr> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("about")
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/about">
            About Us
          </Link>
          {menu==="about" ?  <hr></hr> :<></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {isLoggedIn?
          <button onClick={handleLogout}>Logout</button>
        :<NavLink to="/login">
          <button>LogIn / SignUp</button>
        </NavLink>}
        
        <NavLink to="/Cart">
          <FaCartPlus size={35} />
        </NavLink>
        <div className="nav-cart-count">{count}</div>
      </div>
      <Toaster />
    </div>
  );
}

export default Navbar;
