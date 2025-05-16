import React, { useRef } from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import "../App.css";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const deliveryAddressRef = useRef(null);

  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response;
    for (let i = 0; i < data.length; i++) {
      const { email: vendorEmail, ...temp } = data[i];
      temp.userEmail = userEmail;
      response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orderData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_data: [temp],
          // email: email,
          userEmail: userEmail,
          vendorEmail: vendorEmail,
          order_date: new Date().toDateString(),
        }),
      });
    }

    let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: totalPrice,
      }),
    });
    const { order } = await res.json();
    console.log("Order: ", order);
    console.log("Amount: ", order.amount);
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Deeksha",
      description: "RazorPay",
      order_id: order.id,
      callback_url: `${import.meta.env.VITE_BACKEND_URL}/api/paymentverification`,
      prefill: {
        name: "XYZ",
        email: "XYZ@example.com",
        contact: "9958291698",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();

    if (response.status === 200) {
      const deliveryAddress = deliveryAddressRef.current.value;
      console.log("Delivery Address:", deliveryAddress);

      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      {console.log(data)}
      <div className="cart-container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table ">
          <thead className=" fs-4" style={{ color: "#c34040" }}>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              {/* <th scope="col">Rate</th> */}
              <th scope="col">Total Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody style={{ color: "black" }}>
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                {/* <td>{food.size}</td> */}
                <td>{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="mybtn p-1 "
                    style={{ backgroundColor: "#c34040" }}
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  >
                    delete
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2" style={{ color: "black" }}>
            Total Price: {totalPrice}/-
          </h1>
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputaddress"
            className="form-label"
            style={{ color: "black" }}
          >
            Delivery Address
          </label>
          <input
            type="text"
            className="myinput"
            style={{ backgroundColor: "#ffffff5e" }}
            name="deliveryAddress"
            id="exampleInputaddress"
            ref={deliveryAddressRef}
          />
        </div>
        <div>
          <button
            className="mybtn mt-5 "
            style={{ backgroundColor: "#c34040" }}
            onClick={handleCheckOut}
          >
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
