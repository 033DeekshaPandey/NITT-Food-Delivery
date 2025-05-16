import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Carousal from "../components/Carousal";
import Card from "../components/Card";
import Footer from "../components/Footer";
import "../App.css";

export default function Home({ onSearch }) {
  const [foodCat, setfoodcat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedOilType, setSelectedOilType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [calorieRange, setCalorieRange] = useState([0, 500]);

  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch && onSearch(query);
  };

  const handleSearchClick = () => setSearchQuery(searchQuery);

  const loadData = async () => {
    try {
      let response;

      if (userRole === "vendor") {
        response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/myDishes`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: userEmail }),
          }
        );
        const data = await response.json();
        setfoodItem(data[0] || []);
        setfoodcat(data[1] || []);
      } else {
        response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/foodData`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setfoodItem(data[0] || []);
        setfoodcat(data[1] || []);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />{" "}
      </div>
      <div className="main-content">
        <div className="left-section">
          <div className="searchbar d-flex align-items-center">
            <input
              type="text"
              className="myinput me-2"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              className="btn btn-outline-dark"
              onClick={handleSearchClick}
            >
              🔎
            </button>
          </div>
          <br />
          <div className="filters mt-3">
            <div className="filter-group mb-2">
              <label>Category</label>
              <select
                className=" myinput "
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All</option>
                {foodCat.map((cat) => (
                  <option key={cat._id} value={cat.CategoryName}>
                    {cat.CategoryName}
                  </option>
                ))}
              </select>
            </div>
            <br />
            <div className="filter-group mb-2">
              <label>Oil Type</label>
              <select
                className=" myinput "
                value={selectedOilType}
                onChange={(e) => setSelectedOilType(e.target.value)}
              >
                <option value="">All</option>
                <option value="Refined Oil">Refined Oil</option>
                <option value="Mustard Oil">Mustard Oil</option>
                <option value="Coconut Oil">Coconut Oil</option>
                <option value="Olive Oil">Olive Oil</option>
              </select>
            </div>
            <br />
            <div className="filter-group mb-2">
              <label>Price Range (Under ₹{priceRange[1]})</label>
              <input
                className=" myinput "
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              />
            </div>
            <br />
            <div className="filter-group mb-2">
              <label>Calorie Range</label>
              <select
                className="myinput"
                value={calorieRange.join("-")}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "All") {
                    setCalorieRange([0, Infinity]);
                  } else if (value === "500+") {
                    setCalorieRange([501, Infinity]);
                  } else {
                    const [min, max] = value.split("-").map(Number);
                    setCalorieRange([min, max]);
                  }
                }}
              >
                <option value="All">All</option>
                <option value="0-100">0 - 100</option>
                <option value="100-200">100 - 200</option>
                <option value="200-300">200 - 300</option>
                <option value="300-400">300 - 400</option>
                <option value="400-500">400 - 500</option>
                <option value="500+">500+</option>
              </select>
            </div>
          </div>
        </div>
        <div className="right-section">
          <div className="home-container">
            {foodCat.length !== 0 &&
              foodCat.map((data) => {
                const filteredItems = foodItem.filter((item) => {
                  return (
                    item.CategoryName === data.CategoryName &&
                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                    (selectedCategory === "" || item.CategoryName === selectedCategory) &&
                    (selectedOilType === "" || item.oilType === selectedOilType) &&
                    item.price >= priceRange[0] &&
                    item.price <= priceRange[1] &&
                    (
                      (item.calories === "N/A" && calorieRange[1] === Infinity) ||
                      (!isNaN(item.calories) &&
                        item.calories >= calorieRange[0] &&
                        item.calories <= calorieRange[1])
                    )
                  );
                });
                if (filteredItems.length === 0) return null;

                return (
                  <div key={data._id} className="row mb-3">
                    <strong>
                      <div className="fs-3 m-3">{data.CategoryName}</div>
                    </strong>
                    <hr />
                    {filteredItems.map((item) => (
                      <div key={item._id} className="card-wrapper">
                        <Card foodItem={item} options={item.options} />
                      </div>
                    ))}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div>
        {" "}
        <Footer />{" "}
      </div>
    </div>
  );
}
