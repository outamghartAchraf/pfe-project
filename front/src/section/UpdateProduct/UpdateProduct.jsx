import  './UpdateProduct.css'

 

import axios from "axios";
import { useState, useEffect } from "react";
import { FetContext } from "../../context/ContextD";
import { useNavigate } from "react-router-dom";
const UpdateProduct = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState(false);
  const [accept, setaccept] = useState(false);
  const nav = useNavigate();
  const id = window.location.pathname.split("/").slice(-1)[0];
  const authCont = FetContext();
  const token = authCont.auth.token;

  const Submit = async (e) => {
    let flag = true;
    e.preventDefault();
    setaccept(true);

    try {
        const formData = new FormData();
        formData.append("title",title)
        formData.append("description",description)
        formData.append("image",image)
      let res = await axios.post(
        `http://127.0.0.1:8000/api/product/update/${id}`,
      
         
         formData,
      
        {
          headers: {
            
            Authorization: `Bearer ${token}`,
          },
        }
      );

      nav("/dashboard/products");
    } catch (erour) {
      console.log(erour);
    }
  };

  
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) =>  {
        settitle(data.data[0].title)
        setdescription(data.data[0].description)
        setimage(data.data[0].image)
      });
  }, [ ]);


  return (
    <div className="G-container">
      <form className="formregister" onSubmit={Submit}>
        <label htmlFor="name">title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          id="name"
          placeholder="title"
        />

        <label htmlFor="des">description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          placeholder="description"
        />
         
         <label htmlFor="des">image:</label>
        <input
          type="file"
          name="file"
          onChange={(e) => setimage(e.target.files.item(0))}
        />

        <button className="btn" type="submit">
         Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
