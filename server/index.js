const express = require("express");
const errorMiddleware = require("./middlewares/errorMiddleware");
const todoRouter = require("./routes/todoRoutes");
const userRouter = require("./routes/userRoutes");
const dotenv = require("dotenv").config();
const connectDatabase = require("./utils/connectDatabase");
const cookieParser = require("cookie-parser");
const CustomErrorHandler = require("./utils/customErrorHandler");
const cors = require("cors");

connectDatabase();
const app = express();
app.use(
  cors({origin: "https://mern-todo-app-server-i91ju3nuy-jimiddu.vercel.app"})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running");
});
app.use("/api/v1", todoRouter);
app.use("/api/v1", userRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log("server connected at port : ", process.env.PORT);
});
