const mongoose = require("mongoose");

const mongoURL = process.env.MONGO_URL;

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURL, { useNewUrlParser: true });
    console.log("Connected to MongoDB");

    const fetchedData = mongoose.connection.db.collection("foodItems");
    console.log(fetchedData);
    fetchedData.find({}).toArray(function (err, data) {
      const foodCategory = mongoose.connection.db.collection("foodCategory");
      foodCategory.find({}).toArray(function (err, catData) {
        if (err) console.log(err);
        else {
          global.foodItems = data;
          global.foodCategory = catData;
        }
      });
    });
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};

module.exports = { mongoose, mongoDB };