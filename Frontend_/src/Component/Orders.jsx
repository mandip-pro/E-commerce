import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./Orders.css";
import Footer from "../Footer/Footer";
import Item from "./Item";

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  function setQuantity(productIds) {
    const counts = {};
    productIds.forEach((x) => {
      counts[x] = (counts[x] || 0) + 1;
    });
    return counts;
  }

  const fetchOrder = async () => {
    let response = await fetch("http://127.0.0.1:3000/api/order");
    response = await response.json();
    setOrders(response.data);
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  


  return (
    <div className="shop-category">
      <div className="shopcategory-indexsort">
        <p>
          <span>All of your</span> pending Orders
        </p>
        <div className="shopcategory-sort">
          Sort by <RiArrowDropDownLine size={20} />
        </div>
      </div>

    
      {orders.map((order, orderIndex) => { 
            const {productIds,productDetails,purchaseDate}=order

        return (
            <>            
            <h1 className="date-detail">{purchaseDate}</h1>

          <div key={orderIndex} className="shopCategory-products">
          
            {productDetails.map((datum) => {
              const { _id, name, image, new_price, old_price } = datum;
              const productQuantity = setQuantity(productIds)[_id] || 1;
              return (
                <Item
                  key={_id} 
                  id={_id}
                  name={name}
                  image={image}
                  new_price={new_price}
                  old_price={old_price}
                  quantity={productQuantity}
                />
              );
            })}
          </div>
          </>
        );
      })}

      <div className="shopcategory-loadmore">Explore More</div>
      <div className="shopcategory-goHome" onClick={() => navigate("/")}>
        Go To Home
      </div>
      <Footer />
    </div>
  );
}

export default Orders;
