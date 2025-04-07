import React ,{useEffect, useState}from 'react'
import toast,{Toaster} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import "./UpdateProduct.css"
import {  useParams } from 'react-router-dom';

function UpdateProduct() {
  const navigate=useNavigate()
  const {id}=useParams()
  const adminId=localStorage.getItem('adminId')
  const token=localStorage.getItem("admin")




  const [productData, setProductData] = useState({
    name:"",
    description: "",
    old_price: "",
    new_price:"",
    category:"",

  });



  const [image,setImage]=useState("")

  const fetchData=async()=>{
    let responce=await fetch("http://127.0.0.1:3000/api/product/"+id)
    responce=await responce.json()
    const data=(responce.data._doc)
    if(adminId===data.creatorId){
    setProductData(
        {
            "name":data.name,
            "description":data.description,
            "old_price":data.old_price,
            "new_price":data.new_price,
            "category":data.category,
            "image":data.image
        }
        )
    }else{
      toast.error("cant update product of other admin")
      navigate('/admin/allObject')
    }
        

  }

useEffect(()=>{
   fetchData() 

// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

  const handlesubmit=async(e)=>{
    e.preventDefault()
    try{
      const data=new FormData()
      data.append('name',productData.name)
      data.append('description',productData.description)
      data.append('old_price',productData.old_price)
      data.append('new_price',productData.new_price)
      data.append('category',productData.category)
      data.append('image',image)
      
      let responce=await fetch("http://127.0.0.1:3000/api/product/"+id,{
        method:"put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body:(data)
    })
    responce=await responce.json()
    if(responce.state){
      toast.success(responce.message)
      
    }else{
      toast.error(responce.message)
    }
    navigate('/admin/allObject')
    }catch(err){
      console.log(err)
    }
  }
  const handleImageChange=async(e)=>{
    const file=e.target.files[0]
    console.log(file)
      setImage(file)

  }
  const handleChange=async(e)=>{
    let inputData = e.target.value;
    let inputName = e.target.name;
    setProductData((prev) => {
      return {
        ...prev,
        [inputName]: inputData,
      };
    });
  }
  
  return (
    <div>
       <div className="body">
        <div className="login-box">
          <div className="login-header">
            <header>Create Product</header>
          </div>
          <div
            className="input-box"
           
          >
            <input
              type="text"
              placeholder="enter-name"
              name="name"
              required
              onChange={handleChange}
              className="input-field"
              autoComplete="off"
              value={productData.name}
            ></input>
          </div>
          <div className="input-box">
            <textarea
              style={{cols:2}}
              placeholder="describe your product"
              name="description"
              onChange={handleChange}
              required
              className="input-field"
              autoComplete="off"
              value={productData.description}
            ></textarea>
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="old price"
              name="old_price"
              onChange={handleChange}
              required
              className="input-field"
              autoComplete="off"
              value={productData.old_price}
            ></input>
          </div>
          <div
            className="input-box"
          
          >
            <input
              type="text"
              placeholder="Discounted price"
              name="new_price"
              required
              onChange={handleChange}
              className="input-field"
              autoComplete="off"
              value={productData.new_price}
            ></input>
          </div>
          <div
            className="input-box"
          
          >
            <input
              type="text"
              placeholder="mens /womens /child"
              name="category"
              required
              onChange={handleChange}
              className="input-field"
              autoComplete="off"
              value={productData.category}
            ></input>
          </div>
          <div
            className="input-box"
            
          >
            <input
              type="file"
              placeholder="enter-image"
              name="image"
              onChange={handleImageChange}
              className="input-field"
              autoComplete="off"
            ></input>
          </div>
          
          <div className="input-submit">
            <button
              className="submit-btn"
              id="submit"
              onClick={handlesubmit}
            ></button>
            <label htmlFor="submit">Create</label>
          </div>
          
        </div>
      </div>
      <Toaster/>
    </div>
  )
}

export default UpdateProduct

