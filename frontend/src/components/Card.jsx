import "../App.css";
import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();

  const [qty, setQty] = useState(1);
  const [cookname, setcookname] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editedDish, setEditedDish] = useState({
    name: props.foodItem.name,
    category: props.foodItem.category,
    description: props.foodItem.description,
    availability: props.foodItem.availability,
    price: props.foodItem.price,
    oilType: props.foodItem.oilType,
    calories: props.foodItem.calories,
    weight: props.foodItem.weight,
  });

  const loadData = async () => {
    let email = props.foodItem.email;
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    const json = await response.json();
    setcookname(json.name);
    if (!json.success) {
      alert(json.errors);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/updateDish`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: props.foodItem._id,
            ...editedDish,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setIsEditing(false);
        window.location.reload();
      } else {
        alert("Failed to update dish.");
      }
    } catch (error) {
      console.error("Error updating dish:", error);
    }
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this dish?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/deleteDish`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: props.foodItem._id }),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert("Dish deleted successfully.");
        window.location.reload();
      } else {
        alert("Failed to delete dish.");
      }
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food.length !== 0) {
      if (food.qty === qty) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          email: props.foodItem.email,
        });
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      email: props.foodItem.email,
    });
  };
  let finalPrice = qty * parseInt(props.foodItem.price);

  const userRole = localStorage.getItem("userRole");

  return (
    <div className="card-container" style={{ margin: "10px" }}>
      <div className="w-100">
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          {isEditing ? (
            <>
              Name of Dish:{" "}
              <input
                type="text"
                className=" myinput "
                value={editedDish.name}
                onChange={(e) =>
                  setEditedDish({ ...editedDish, name: e.target.value })
                }
              />
              <br />
              Description:{" "}
              <input
                type="text"
                className=" myinput "
                value={editedDish.description}
                onChange={(e) =>
                  setEditedDish({
                    ...editedDish,
                    description: e.target.value,
                  })
                }
              />
              <br />
              Price (₹):{" "}
              <input
                type="number"
                className=" myinput "
                value={editedDish.price}
                onChange={(e) =>
                  setEditedDish({
                    ...editedDish,
                    price: e.target.value,
                  })
                }
              />
              <br />
              Weight per plate (grams):{" "}
              <input
                type="number"
                className=" myinput "
                value={editedDish.weight}
                onChange={(e) =>
                  setEditedDish({
                    ...editedDish,
                    weight: e.target.value,
                  })
                }
              />
              <br />
              Type of Oil Used:{" "}
              <select
                type="text"
                className=" myinput "
                value={editedDish.oilType}
                onChange={(e) =>
                  setEditedDish({
                    ...editedDish,
                    oilType: e.target.value,
                  })
                }
              >
                <option value="Refined Oil">Refined Oil</option>
                <option value="Mustard Oil">Mustard Oil</option>
                <option value="Olive Oil">Olive Oil</option>
                <option value="Coconut Oil">Coconut Oil</option>
              </select>
              <br />
              Availability:{" "}
              <input
                type="text"
                className=" myinput "
                placeholder="Enter availability time"
                value={editedDish.availability}
                onChange={(e) =>
                  setEditedDish({
                    ...editedDish,
                    availability: e.target.value,
                  })
                }
              />
              <br />
              <div className="d-flex justify-content-end">
                <button onClick={handleSaveClick} className="m-2 card-btn">
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="m-2 card-btn"
                  style={{ backgroundColor: "red" }}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h5 className="card-title">{props.foodItem.name}</h5>
              <div>Cook Name : {cookname}</div>
              <br />
              <div>{props.foodItem.description}</div>
              <br />
              <div>Type of Oil Used : {props.foodItem.oilType}</div>
              <div>Weight per plate : {props.foodItem.weight} grams</div>
              <div>Calories per plate : {props.foodItem.calories} kCals</div>
              <div>Availability : {props.foodItem.availability}</div>
              <br />
              {userRole === "user" ? (
                <>
                  <div className="card-container w-100">
                    Number of Servings:
                    <select
                      className=" card-select m-2 h-100 rounded"
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {Array.from(Array(5), (e, i) => {
                        return (
                          <option key={i + 1} value={i + 1}>
                            {" "}
                            {i + 1}
                          </option>
                        );
                      })}
                    </select>
                    <br />
                    <div className="d-inline h-100 fs-5 mt-1">
                      Price: ₹ {finalPrice}/-
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>Price : ₹ {props.foodItem.price}</div>
                </>
              )}
            </>
          )}
        </div>
        {userRole === "vendor" ? (
          <div className="d-flex justify-center mt-2">
            {isEditing ? (
              ""
            ) : (
              <>
                <button className="m-2 card-btn" onClick={handleEditClick}>
                  Edit ✏️
                </button>
                <button className="m-2 card-btn" onClick={handleDeleteClick}>
                  Delete 🗑️
                </button>
              </>
            )}
          </div>
        ) : (
          localStorage.getItem("authToken") && (
            <button
              className="justify-center ms-2 card-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          )
        )}

        <hr></hr>
      </div>
    </div>
  );
}
