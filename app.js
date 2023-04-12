const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoute");
const addressRouter = require("./routes/adress.route");
const productRouter = require("./routes/product.route");
const orderRouter = require("./routes/order.route");
const app = express();
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DPASS);
app.use(express.json());
app.use("/users", userRouter);
app.use("/auth", userRouter);
app.use("/add", addressRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection sucessfull"));

app.listen(process.env.PORT, () => {
  console.log(`Server is listening to the port ${process.env.PORT}`);
});
