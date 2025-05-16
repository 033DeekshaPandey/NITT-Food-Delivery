import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../LoginSignup.css";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    role: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e, role) => {
    e.preventDefault();
    const updatedCredentials = { ...credentials, role };
    console.log(
      JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    );
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/loginuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCredentials),
      }
    );

    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert(json.errors);
    }

    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userRole", json.role);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />
        <div className="container">
          <form className="login1" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className=" myinput "
                name="email"
                value={credentials.email}
                onChange={onChange}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className=" myinput "
                name="password"
                value={credentials.password}
                onChange={onChange}
                id="exampleInputPassword1"
              />
            </div>

            <button
              className="m-3 mybtn"
              onClick={(e) => handleSubmit(e, "user")}
            >
              Login as User
            </button>
            <button
              className="m-3 mybtn"
              onClick={(e) => handleSubmit(e, "vendor")}
            >
              Login as Vendor
            </button>
            <Link to="/createuser" className="m-3 mybtn">
              New user?
            </Link>
          </form>
        </div>
      <Footer />
    </div>
  );
}
