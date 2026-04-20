if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust2";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("connected to db");
}

const initDB = async () => {
  await Listing.deleteMany({});

  // FIXED: removed reference to undefined `user` variable
  // Geometry is required by the model, so seed with a default point
  const newData = initData.data.map((obj) => ({
    ...obj,
    geometry: obj.geometry || { type: "Point", coordinates: [77.2090, 28.6139] }, // Delhi default
  }));

  await Listing.insertMany(newData);
  console.log("data was initialized");
};

main()
  .then(() => initDB())
  .catch((err) => console.log(err));
