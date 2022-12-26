const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
    })
    .then((data) => {
      console.log("db connected");
    });
};

module.exports = connectDatabase;
