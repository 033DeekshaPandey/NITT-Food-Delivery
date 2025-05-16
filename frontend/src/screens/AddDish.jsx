import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../App.css";

function AddDish() {
  const [dish, setDish] = useState({
    CategoryName: "",
    name: "",
    img: "",
    price: "",
    email: localStorage.getItem("userEmail"),
    description: "",
    availability: "",
    oilType: "",
    calories: "",
    weight: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(dish);

    if (!dish.oilType || dish.oilType.trim() === "") {
      alert("Please select a valid oil type.");
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/fooditem`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dish),
      }
    );

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert(json.message);
    } else {
      alert(json.message);
      setDish({
        CategoryName: "",
        name: "",
        img: "",
        price: "",
        email: localStorage.getItem("userEmail"),
        description: "",
        availability: "",
        oilType: "",
        calories: "",
        weight: "",
      });
    }
  };

  const onChange = (e) => {
    setDish({ ...dish, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div>
        <Navbar />
        <div className="container">
          <form className="login1" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputcategory" className="form-label">
                Category Name
              </label>
              <input
                type="text"
                className="myinput"
                name="CategoryName"
                id="exampleInputcategory"
                value={dish.CategoryName}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Name of dish
              </label>
              <input
                type="text"
                className="myinput"
                name="name"
                id="exampleInputName"
                value={dish.name}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputImg" className="form-label">
                {" "}
                Image Link
              </label>
              <input
                type="text"
                className=" myinput "
                name="img"
                id="exampleInputImg"
                value={dish.img}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPrice" className="form-label">
                Price per plate
              </label>
              <input
                type="number"
                className=" myinput "
                name="price"
                id="exampleInputPrice"
                value={dish.price}
                onChange={onChange}
                onWheel={(e) => e.target.blur()}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputdescription" className="form-label">
                Description
              </label>
              <input
                type="text"
                className=" myinput "
                name="description"
                id="exampleInputdescription"
                value={dish.description}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputavailability" className="form-label">
                Availability
              </label>
              <input
                type="text"
                className=" myinput "
                name="availability"
                id="exampleInputavailability"
                value={dish.availability}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputOilType" className="form-label">
                Type of Oil Used
              </label>
              <select
                type="text"
                className=" myinput "
                name="oilType"
                id="exampleInputOilType"
                value={dish.oilType}
                onChange={onChange}
              >
                <option value="">Select oil type</option>
                <option value="Refined Oil">Refined Oil</option>
                <option value="Mustard Oil">Mustard Oil</option>
                <option value="Olive Oil">Olive Oil</option>
                <option value="Coconut Oil">Coconut Oil</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputweight" className="form-label">
                Weight per plate (grams)
              </label>
              <input
                type="number"
                className=" myinput "
                name="weight"
                id="exampleInputweight"
                value={dish.weight}
                onChange={onChange}
                onWheel={(e) => e.target.blur()}
              />
            </div>
            <button type="submit" className="m-3 mybtn">
              Submit
            </button>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AddDish;
