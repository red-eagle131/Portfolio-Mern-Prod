const mongoose = require("mongoose");
const DB = process.env.DATABASE;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
