const axios = require("axios");
const express = require("express");
const router = express.Router();
const foodItem = require("../models/foodItem");

const oilCalories = {
  "Refined Oil": 0,
  "Mustard Oil": 5,
  "Olive Oil": -10,
  "Coconut Oil": -1,
  "No Oil": -40,
};

router.post("/fooditem", async (req, res) => {
  try {
    const {
      CategoryName,
      name,
      img,
      price,
      email,
      description,
      availability,
      oilType,
      weight,
    } = req.body;

    const calorieInfo = await axios.post(
      "https://trackapi.nutritionix.com/v2/natural/nutrients",
      { query: `${weight} grams ${name}` },
      {
        headers: {
          "x-app-id": process.env.NUTRITIONIX_APP_ID,
          "x-app-key": process.env.NUTRITIONIX_APP_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    let calories = 0;
    if (calorieInfo && calorieInfo.data && calorieInfo.data.foods.length > 0) {
      const calorieString = calorieInfo.data.foods[0].nf_calories;
      calories = parseFloat(calorieString);
    }

    calories += oilCalories[oilType] || 0;

    const calorieDisplay = calories < 5 ? "N/A" : calories;

    const dishData = await foodItem.create({
      CategoryName,
      name,
      img,
      price,
      email,
      description,
      availability,
      oilType,
      weight,
      calories: calorieDisplay,
    });

    res.json({ success: true, message: "Dish added successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Invalid credentials" });
  }
});

router.post("/foodData", (req, res) => {
  try {
    res.send([global.foodItems, global.foodCategory]);
  } catch (error) {
    console.error(error.message);
    res.send("Server Error");
  }
});

router.post("/myDishes", async (req, res) => {
  try {
    const vendorEmail = req.body.email;
    const vendorDishes = await foodItem.find({ email: vendorEmail });

    const categories = [
      ...new Set(vendorDishes.map((dish) => dish.CategoryName)),
    ].map((cat) => ({ CategoryName: cat }));

    res.send([vendorDishes, categories]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/updateDish", async (req, res) => {
  try {
    const { id, name, description, price, availability, oilType, weight } = req.body;
    const existingDish = await foodItem.findById(id);
    if (!existingDish) {
      return res
        .status(404)
        .json({ success: false, message: "Dish not found" });
    }

    const numericWeight = parseFloat(weight);
    let updatedFields = {
      name,
      description,
      price,
      availability,
      oilType,
      weight: numericWeight,
    };

    const hasChanged =
      existingDish.name !== name ||
      existingDish.oilType !== oilType ||
      Number(existingDish.weight) !== numericWeight;

    if (hasChanged && name && oilType && numericWeight) {
      const nutritionixRes = await axios.post(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        { query: `${numericWeight} grams ${name}` },
        {
          headers: {
            "x-app-id": process.env.NUTRITIONIX_APP_ID,
            "x-app-key": process.env.NUTRITIONIX_APP_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      let calories = 0;
      if (nutritionixRes.data && nutritionixRes.data.foods && nutritionixRes.data.foods.length > 0) {
        calories = parseFloat(nutritionixRes.data.foods[0].nf_calories);
      }

      calories += oilCalories[oilType] || 0;

      updatedFields.calories = calories < 5 ? "N/A" : Math.round(calories);
    }

    const updatedDish = await foodItem.findOneAndUpdate(
      { _id: id },
      { $set: updatedFields },
      { new: true }
    );

    res.json({ success: true, updatedDish });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Update failed" });
  }
});

router.post("/deleteDish", async (req, res) => {
  try {
    const { id } = req.body;
    await foodItem.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
