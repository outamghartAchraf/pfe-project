import "./UpdateUser.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { FetContext } from "../../context/ContextD";
import { useNavigate } from "react-router-dom";
const UpdateUser = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordR, setpasswordR] = useState("");
  const [accept, setaccept] = useState(false);
  const [emailErour, setemailErour] = useState("");

  const id = window.location.pathname.split("/").slice(-1)[0];
  const authCont = FetContext();
  const token = authCont.auth.token;
  const nav = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`, {
      headers: {
        
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setname(data[0].name);
        setemail(data[0].email);
      });
  }, []);

  const Submit = async (e) => {
    let flag = true;
    e.preventDefault();
    setaccept(true);
    if (name === "" || password < 8 || passwordR !== password) {
      flag = false;
    } else {
      flag = true;
    }
    try {
      if (flag) {
        let res = await axios.post(
          `http://127.0.0.1:8000/api/user/update/${id}`,
          {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordR,
          }
        );

        nav("/dashbord/user");
      }
    } catch (erour) {
      console.log(erour);
    }
  };

  return (
    <div>
      <form className="formregister update" onSubmit={Submit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
          id="name"
          placeholder="name"
        />
        {name === "" && accept && (
          <p style={{ color: "red", fontSize: "14px" }}>user name is requere</p>
        )}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          id="email"
          placeholder="email"
        />
        {emailErour === 422 && accept && (
          <p style={{ color: "red", fontSize: "14px" }}>
            Email is all in database
          </p>
        )}
        <label htmlFor="password">password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          id="password"
          placeholder="password"
        />
        {password.length < 8 && accept && (
          <p style={{ color: "red", fontSize: "14px" }}>
            password must be 8 caractere !
          </p>
        )}
        <label htmlFor="repeat">Repeat password:</label>
        <input
          type="password"
          value={passwordR}
          onChange={(e) => setpasswordR(e.target.value)}
          id="repeat"
          placeholder="forget password"
        />
        {passwordR !== password && accept && (
          <p style={{ color: "red", fontSize: "14px" }}>
            password dost not match !
          </p>
        )}
        <button className="btn" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
