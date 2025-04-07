import React, { useEffect, useState }  from 'react'
import toast, { Toaster } from "react-hot-toast";
import Navbar from '../Navbar/Navbar'
// import { useParams } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
import "./Product.css"
import Footer from '../Footer/Footer';
import { FaStar } from "react-icons/fa";
import { useParams } from 'react-router-dom';


function Product() {
  const {id}=useParams()
  const[product,setProduct]=useState({})
  const fetchData=async ()=>{
    let singleProduct=await fetch("http://127.0.0.1:3000/api/product/"+id)
    singleProduct=await singleProduct.json()
    const oneProduct=singleProduct.data
    setProduct(oneProduct._doc)

  }
  useEffect(()=>{
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const token=localStorage.getItem('user')

   
  const handleClick=async()=>{
    if(token){
      let responce=await fetch('http://127.0.0.1:3000/api/product/buy/'+product._id,{
        headers:{
          Authorization:`Bearer ${token}`
        } 
      })
      responce=await responce.json()
      if (responce.state) {
        toast.success(responce.message);
        window.location.reload()
      } else {
        toast.error(responce.message);
      }
      
    }else{
      toast.error('Please login First.')
    }
    
    
  }
  
    // let params=useParams()
    
  return (
    <div>
    <Navbar/>
      {/* <h1>Product of {params.id}</h1> */}
      <div className="product">
        Home  <IoIosArrowForward /> SHOP  <IoIosArrowForward /> {product.name}
      </div>
      <div className="productdisplay">
        
        <div className="productdisplay-left">
          <div className="productdisplay-img-list">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
          </div>
          <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={product.image} alt="" />
          </div>
        </div>
        <div className="productdisplay-right">
          <h1>{product.name}</h1>
          <div className='productdisplay-right-stars'>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <p>(122)</p>
          </div>
          <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-old">
              ${product.old_price}
            </div>
            <div className="productdisplay-right-price-new">
              ${product.new_price}
            </div>
          </div>
          <div className="productdisplay-right-description">
              {product.description}
          </div>
          <div className="product-display-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
              <div>S</div>
              <div>M</div>
              <div>L</div>
              <div>XL</div>
              <div>XXL</div>
            </div>
          </div>
          <button className='productdisplay-right-button' onClick={handleClick}>ADD TO CART</button>
          <p className="productdisplay-right-category"><span>Category : <span>{product.category}</span> </span></p>
        </div>
      </div>
      <div className="descriptionbox">
        <div className="descriptionbox-navigator">
          <div className="descriptionbox-nav-box">
            Description
          </div>
          <div className="descriptionbox-nav-box fade">
            Reviews (122)
          </div>
          </div>
          <div className="descriptionbox-description">
            <p>{product.description}</p>
            <p>{product.description}</p>
        </div>
      </div>
      <Footer/>
      <Toaster/>
    </div>
  )
}

export default Product
