import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
import "../App.css";

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  let data = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const userRole = localStorage.getItem("userRole");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg mynavbar ">
        <div className="container-fluid">
          <Link
            className="navbar-brand fs-1 fst-italic"
            style={{ color: "black" }}
            to="/"
          >
            Campus Crave
          </Link>
          <button
            className="burger-toggler"
            type="button"
            onClick={toggleMobileMenu}
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={isMobileMenuOpen ? "true" : "false"}
            aria-label="Toggle navigation"
          >
            <span className="burger-toggler d-lg-none">🍔</span>
          </button>
          <div
            className={`collapse navbar-collapse ${isMobileMenuOpen ? "show" : ""
              }`}
          >
            <ul className="navbar-nav me-auto ">
              <li className="nav-item">
                {userRole === "vendor" ? (
                  <Link
                    className="btn mx-1"
                    style={{ color: "black" }}
                    aria-current="page"
                    to="/"
                  >
                    My Dishes
                  </Link>
                ) : (
                  <Link
                    className="btn mx-1"
                    style={{ color: "black" }}
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                )}
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  {userRole === "vendor" ? (
                    <Link
                      className="btn mx-1"
                      style={{ color: "black" }}
                      aria-current="page"
                      to="/myOrder"
                    >
                      Order History
                    </Link>
                  ) : (
                    <Link
                      className="btn mx-1"
                      style={{ color: "black" }}
                      aria-current="page"
                      to="/myOrder"
                    >
                      Order History
                    </Link>
                  )}
                </li>
              ) : (
                ""
              )}
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  {userRole === "vendor" ? (
                    <Link
                      className="btn mx-1"
                      style={{ color: "black" }}
                      aria-current="page"
                      to="/addDish"
                    >
                      Add Dish
                    </Link>
                  ) : (
                    ""
                  )}
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="btn mx-1"
                      style={{ color: "black" }}
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="btn mx-1"
                      style={{ color: "black" }}
                      to="/createuser"
                    >
                      SignUp
                    </Link>
                  </li>
                </>
              )}
            </ul>
            {localStorage.getItem("authToken") ? (
              <div>
                {
                  <div className="d-flex align-items-center justify-content-end">
                    {userRole !== "vendor" && (
                      <div>
                        <div
                          className="btnbg-white text-success mx-2"
                          style={{ color: "black" }}
                          onClick={() => setCartView(true)}
                        >
                          <button className="mybtn">
                            My Cart {"  "}
                            <Badge pill bg="danger">
                              {data.length}
                            </Badge>
                          </button>
                        </div>
                        {cartView ? (
                          <Modal onClose={() => setCartView(false)}>
                            <Cart />
                          </Modal>
                        ) : null}
                      </div>
                    )}
                    <div
                      className="btnbg-white text-danger mx-2"
                      onClick={handleLogout}
                    >
                      <button className="mybtn">Logout</button>
                    </div>
                  </div>
                }
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}