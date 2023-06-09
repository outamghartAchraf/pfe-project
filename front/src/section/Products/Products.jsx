import "./Products.css";
import { useEffect, useState } from "react";

import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { FetContext } from "../../context/ContextD";

const Products = () => {
  const [Products, setProducts] = useState([]);
  const [runUseEffect, setRub] = useState(0);

  const authcont = FetContext();
  const token = authcont.auth.token;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product/show", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => setProducts(data.data));
  }, [runUseEffect]);

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/product/delete/${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setRub((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="table-user">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>image</th>
            <th>title</th>
            <th>description</th>
            <th>method</th>
          </tr>
        </thead>
        <tbody>
          {Products?.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td><img src={item.image} width='100px'/></td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td style={{ textAlign: "center" }}>
                  <FaRegTrashAlt
                    onClick={() => deleteUser(item.id)}
                    size={20}
                    style={{ padding: "10px", cursor: "pointer" }}
                  />
                  <Link to={`${item.id}`}>
                    <FaRegEdit
                      size={20}
                      style={{ padding: "10px", cursor: "pointer" }}
                    />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
