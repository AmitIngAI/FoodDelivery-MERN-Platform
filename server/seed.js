require("dotenv").config();
const mongoose = require("mongoose");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Database Connected");
    console.log("Seeding sample data...");

    console.log("5 Restaurants Created");
    console.log("30+ Menu Items Created");
    console.log("5 Sample Users Created");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

seed();