import React from 'react'
import "./Footer.css"
import logo from "../assets/images.png"
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";

import { BiSolidPhoneCall } from "react-icons/bi";


function Footer() {
  return (
    <div className='footer'>
      <div className='footer-logo'>
        <img src={logo} alt="" />
        <p >E-Commerce</p>
        
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
        <FaInstagramSquare size={20}/>
        </div>
        <div className="footer-icons-container"><FaFacebook size={20}/></div>
        <div className="footer-icons-container"><FaTwitter size={20}/></div>
        
        {/* <MdEmail /> */}
        {/* <BiSolidPhoneCall /> */}
        <div className='footer-icons-container'>
        <IoLogoWhatsapp size={20}/>

        </div>
    </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @ 2025 -All Rights Reserved</p>
        </div>
      
    </div>
  )
}

export default Footer
