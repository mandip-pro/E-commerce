import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { FaRegHandPeace } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import model from "../assets/download.avif";

import "./Home.css";
import Item from "./Item";
import Footer from "../Footer/Footer";


function Home() {
  const navigate=useNavigate()
  const [data, setData] = useState([]);
  const fetchData = async () => {
    let product = await fetch("http://127.0.0.1:3000/api/product");
    product = await product.json();
    setData(product.data);
    
  };
 
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="initial-page">
        <div className="left-container">
          <h2>New Arrivals Only</h2>
          <div>
            <div className="hand-icon">
              <p>New</p>
              <FaRegHandPeace size={60} />
            </div>
            <p>Collections</p>
            <p>for everyone</p>
          </div>
          <div className="latest-collection-button" onClick={()=>navigate('/Product')}>
            <div>Latest Collection</div>
            <IoIosArrowForward />
          </div>
        </div>
        <div className="right-container">
          <img src={model} alt="" />
        </div>
      </div>

      {/* Item Component  */}
      <div className="popular">
        <h1>Popular Products</h1>
        <hr />
        <div className="popular-item">
          {data.map((datum, index) => {
            const {_id,name,image,new_price,old_price}=datum._doc
            return (
              <Item
                key={index}
                id={_id}
                name={name}
                image={image}
                new_price={new_price}
                old_price={old_price}
              />
            );
          })}
        </div>
      </div>
      {/* offer Component */}

      <div className="offers">
        <div className="offers-left">
          <h1>Exclusive</h1>
          <h1>50% offer for you</h1>
          <p>ONLY ON BEST SELLER PRODUCT</p>
          <button>Check Now</button>
        </div>
        <div className="offers-right">
          <img src={model} alt="" />
        </div>
      </div>
      <hr />
      <Footer />
    </div>
  );
}

export default Home;
