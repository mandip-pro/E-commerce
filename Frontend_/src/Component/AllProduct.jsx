import React, { useState, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./AllProduct.css";
import Footer from "../Footer/Footer";
import Item from "./Item";
function AllProduct() {
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
    <div className="shop-category">
      <div className="shopcategory-indexsort">
        <p>
          <span>Showing 1-12</span> out of all Products
        </p>
        <div className="shopcategory-sort">
          Sort by <RiArrowDropDownLine size={20} />
        </div>
      </div>
      <div className="shopCategory-products">
        {
          /* //from backend map and item component */
          data.map((datum, index) => {
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
          })
        }
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
      <Footer />
    </div>
  );
}

export default AllProduct;
