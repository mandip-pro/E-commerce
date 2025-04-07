import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./Cart.css";
import { CiSquareRemove } from "react-icons/ci";
import Footer from "../Footer/Footer.jsx";
import Navbar from "../Navbar/Navbar.jsx";
let productQuantity = 1;

function Cart() {
  const navigate = useNavigate();
  const token = localStorage.getItem("user");
  const [data, setData] = useState([]);
  const [boughtIds, setboughtIds] = useState([]);
  const [total, setTotal] = useState(0);
  const fetchData = async () => {
    let responce = await fetch("http://127.0.0.1:3000/api/users/purchase", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    responce = await responce.json();
    setData(responce.purchasedProductDetails);
    setboughtIds(responce.purchasedProductId);
  };
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setQuantity() {
    const counts = {};
    boughtIds.forEach((x) => {
      counts[x] = (counts[x] || 0) + 1;
    });
    return counts;
  }
  useEffect(() => {
    const newTotal = data.reduce((acc, datum) => {
      const { new_price, _id } = datum._doc;
      productQuantity = setQuantity()[_id] || 1;

      return acc + parseInt(new_price) * parseInt(productQuantity);
    }, 0);

    setTotal(newTotal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, boughtIds]);

  const handleCross = async (a) => {
    let responce = await fetch(
      "http://127.0.0.1:3000/api/users/purchase/" + a._id,
      {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    responce = await responce.json();
    if (responce.state) {
      fetchData();
      toast.success(responce.message);
      window.location.reload();
    } else {
      toast.error(responce.message);
    }
  };

  const handleClick=async()=>{
    if(token){
      const pay={
        amount:total
      }
      let responce=await fetch('http://127.0.0.1:3000/api/users/purchase/',{
        method:'post',
        headers:{
          Authorization:`Bearer ${token}`,
          'Content-Type': 'application/json',
        } ,
        body:JSON.stringify(pay)
      })
      responce=await responce.json()
      if (responce.state) {
        navigate("/buy" ,{state:{secret:responce.clientSecret,data:responce.purchasedProductDetails,price:total ,quantity:responce.purchasedProductId}})
      } else {
        toast.error(responce.message);
      }
      
    }else{
      toast.error('Please login First.')
    } 
  }
  function handlePress(){
    navigate('/orders')
  }

  return (
    <>
      <Navbar />
      <div className="cartitems">
        <div className="cartitems-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {/* //if product in cart >0 */}

        {data.map((datum) => {
          const { _id, name, new_price, image, quantity } = datum._doc;
          const productQuantity = setQuantity()[_id] || 1;
          return (
            <div className="cartitems-format cartitems-format-main">
              <img src={image} alt="" className="carticon-product-icon" />
              <p>{name}</p>
              <p>${new_price}</p>
              <button className="cartitems-quantity">{productQuantity}</button>

              <p>${parseInt(new_price) * parseInt(quantity)}</p>

              <CiSquareRemove
                className="cartitems-remove-icon"
                size={30}
                onClick={() => handleCross(datum._doc)}
              />
            </div>
          );
        })}

        {/* after if  */}
        <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>cart Totals</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>${total}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Shipping Fee</p>
                <p> Free</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <h3>Total</h3>
                <h3>${total}</h3>
              </div>
            </div>
            <button onClick={handleClick}>Proceed to checkout</button>
            <button onClick={handlePress}>Pending Orders</button>
          </div>
        </div>
      </div>
      <Footer />
      <Toaster />
    </>
  );
}

export default Cart;
