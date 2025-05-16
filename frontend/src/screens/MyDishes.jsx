import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function MyDishes() {
  const [search, setsearch] = useState("");
  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setfoodcat] = useState([]);
  const vendorEmail = localStorage.getItem("userEmail");

  const fetchVendorDishes = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/myDishes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: vendorEmail }),
        }
      );

      const json = await response.json();
      console.log("API Response:", json);

      if (json.success && json.dishes.length > 0) {
        setFoodItem(json.dishes);
        setfoodcat(json.categories || []);
      } else {
        alert("No dishes found for this vendor");
      }
    } catch (error) {
      console.error("Error fetching vendor dishes:", error);
    }
  };

  useEffect(() => {
    fetchVendorDishes();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        {foodCat.length !== 0
          ? foodCat.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem.length !== 0 ? (
                    foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems._id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Card
                              foodItem={filterItems}
                              options={filterItems.options}
                            ></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div>No such data found</div>
                  )}
                </div>
              );
            })
          : ""}
      </div>
      <Footer />
    </div>
  );
}
