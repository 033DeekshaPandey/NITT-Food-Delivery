import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../App.css";

export default function VendorOrders() {
  const [orderData, setOrderData] = useState([]);
  const vendorEmail = localStorage.getItem("userEmail");

  const fetchVendorOrders = async () => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/vendorOrders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: vendorEmail }),
    })
      .then(async (res) => {
        let response = await res.json();
        setOrderData(response.orders || []);
      })
      .catch((error) => console.log("Error fetching vendor orders:", error));
  };

  useEffect(() => {
    fetchVendorOrders();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="order-content">
        <div className="row">
          {orderData.length !== 0
            ? orderData.map((order) => {
                return order.order_data
                  .slice(0)
                  .reverse()
                  .map((item) => {
                    return item.map((orderDetail, index) => {
                      return (
                        <div className="order-wrapper" key={index}>
                          {orderDetail.Order_date ? (
                            <div className="order-date">
                              <strong>{orderDetail.Order_date}</strong>
                              <hr />
                            </div>
                          ) : (
                            <div className="order-card mt-3" style={{ width: "17rem", minHeight: "200px" }}>
                              <div className="card-body">
                                <h5 className="card-title">{orderDetail.name}</h5>
                                <div className="order-details">
                                  <div className="order-item">
                                  <span>{orderDetail.qty}</span>
                                  <span>{orderDetail.size}</span>
                                  <div className="price">
                                    ₹{orderDetail.price}/-
                                  </div>
                                  </div>
                                  <div className="order-item">
                                    <span>Ordered by: {orderDetail.userEmail}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    });
                  });
              })
            : <div>No orders found</div>}
        </div>
      </div>

      <Footer />
    </div>
  );
}
