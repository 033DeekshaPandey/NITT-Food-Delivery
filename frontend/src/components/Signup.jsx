import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../LoginSignup.css";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    role: "",
  });

  const handleSubmit = async (e, role) => {
    e.preventDefault();
    const updatedCredentials = { ...credentials, role };
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCredentials),
    });

    const json = await response.json();
    console.log("Received Role:", role);
    console.log(json);
    if (!json.success) {
      alert(json.message);
    } else {
      alert(json.message);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <form className=" login1" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className=" myinput " name="name" value={credentials.name} onChange={onChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Webmail ID</label>
            <input type="email" className=" myinput " name="email" value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className=" myinput " name="password" value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputLocation1" className="form-label">Address</label>
            <input type="text" className=" myinput " name="location" value={credentials.location} onChange={onChange} id="exampleInputLabel1" />
          </div>

          <button className="m-3 mybtn" onClick={(e) => handleSubmit(e, "user")}>
            Signup as User
          </button>
          <button className="m-3 mybtn" onClick={(e) => handleSubmit(e, "vendor")}>
            Signup as Vendor
          </button>
          <Link to="/login" className="m-3 mybtn">
            Already a user?
          </Link>
        </form>
      </div>
      <Footer />
    </>
  );
}
