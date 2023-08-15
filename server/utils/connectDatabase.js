const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected at host : ", res.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
