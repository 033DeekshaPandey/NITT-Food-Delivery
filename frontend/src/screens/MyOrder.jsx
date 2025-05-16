// import { useState, useEffect } from "react";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import "../App.css";

// export default function MyOrder() {
//   const [orderData, setOrderData] = useState("");

//   const fetchMyOrder = async () => {
//     console.log(localStorage.getItem("userEmail"));
//     await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/myOrderData`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: localStorage.getItem("userEmail"),
//       }),
//     }).then(async (res) => {
//       let response = await res.json();

//       await setOrderData(response);
//     });
//   };

//   useEffect(() => {
//     fetchMyOrder();
//   }, []);

//   return (
//     <div>
//       <div>
//         <Navbar />
//       </div>

//       <div className="myorder-content">
//         <div className="row">
//           {Object.keys(orderData).length !== 0
//             ? Array(orderData).map((data) => {
//                 return data.orderData
//                   ? data.orderData.order_data
//                       .slice(0)
//                       .reverse()
//                       .map((item) => {
//                         return item.map((arrayData) => {
//                           return (
//                             <div className="mycard-wrapper" key={arrayData.id}>
//                               {arrayData.Order_date ? (
//                                 <div className="order-date">
//                                   {(data = arrayData.Order_date)}
//                                   <hr />
//                                 </div>
//                               ) : (
//                                 <div className="mycard">
//                                   <div className="card-body">
//                                     <h5 className="card-title">
//                                       {arrayData.name}
//                                     </h5>
//                                     <div className="order-details">
//                                       <div className="order-item">
//                                         <span>{arrayData.qty}</span>
//                                         <span>{arrayData.size}</span>
//                                         <div>{data}</div>
//                                         <div className="price">
//                                           ₹{arrayData.price}/-
//                                         </div>
//                                         <div className="order-item">
//                                           <span>
//                                             The order is made through{" "}
//                                             {arrayData.userEmail} id
//                                           </span>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               )}
//                             </div>
//                           );
//                         });
//                       })
//                   : "";
//               })
//             : ""}
//         </div>
//       </div>

//       <div>
//         <Footer />
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../App.css";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/myOrderData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: localStorage.getItem("userEmail") }),
      });

      const response = await res.json();
      setOrderData(response.orderData?.order_data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="myorder-content">
        <div className="row">
        {orderData.length > 0 ? (
          orderData
            .slice(0)
            .reverse()
            .map((items, index) => (
              <div key={index}>
                {items.map((item, idx) =>
                  item.Order_date ? (
                    <div className="mycard-wrapper order-date" key={idx}>
                      {item.Order_date}
                      <hr />
                    </div>
                  ) : (
                    <div className="mycard-wrapper" key={idx}>
                      <div className="mycard">
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <div className="order-details">
                            <div className="order-item">
                              <span>Quantity: {item.qty}</span>
                              <span>{item.size}</span>
                              <div className="price">Price: ₹{item.price}/-</div>
                              <div className="order-item">
                                <span>
                                  The order is made through {item.userEmail} ID
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ))
        ) : (
          <div>No orders found</div>
        )}
      </div>
      </div>
      <Footer />
    </div>
  );
}
