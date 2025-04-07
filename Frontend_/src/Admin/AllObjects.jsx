import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./AllObject.css";
import { NavLink, useNavigate } from "react-router-dom";
import UpdateProduct from "./UpdateProduct";

function AllObjects() {
  const navigate = useNavigate();
  const token = localStorage.getItem("admin");
  const adminId=localStorage.getItem('adminId')
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      let product = await fetch("http://127.0.0.1:3000/api/product");
      product = await product.json();
      setData(product.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    } else {
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id,creatorId) => {
    if(adminId===creatorId){
      try {
      let responce = await fetch("http://127.0.0.1:3000/api/product/" + id, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      responce = await responce.json();
      if (responce.state) {
        toast.success(responce.message);
        fetchData();
      } else {
        toast.error(responce.message);
      }
    } catch (err) {
      console.log(err);
    }
    }else{
      toast.error("cannot delete product of other admin")
      navigate('/admin/allObject')
    }

    
  };

  return (
    <div>
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
          {data.map((datum) => {
            const { _id, name, image, old_price, new_price ,creatorId} = datum._doc;

            return (
              <div className="item">
                <img src={image} alt="" />
                <p>{name}</p>
                <div className="item-price-1">
                  <div className="item-price-new">${new_price}</div>
                  <NavLink to={`/admin/updateProduct/${_id}`}>
                    <div className="item-price-new">Update</div>
                  </NavLink>
                </div>
                <div className="item-price-1">
                  
                  <div className="item-price-old">${old_price}</div>

                  <div className="delete" onClick={() => handleDelete(_id,creatorId)}>
                    Delete
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="shopcategory-loadmore">Explore More</div>
      </div>

      <Toaster />
    </div>
  );
}

export default AllObjects;
