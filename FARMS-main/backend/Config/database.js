const mongoose = require("mongoose");
require("dotenv").config();

const connectDatabase = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((e) => {
      console.log("Issue in database connection");
      console.error(e.message);
      process.exit(1); // Exit the process if the connection fails
    });
};

module.exports = connectDatabase;