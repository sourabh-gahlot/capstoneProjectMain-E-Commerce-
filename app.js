const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoute");
const addressRouter = require("./routes/adress.route");
const productRouter = require("./routes/product.route");
const orderRouter = require("./routes/order.route");
const morgan = require('morgan');
const app = express();
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DPASS);
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});
app.use("/api/v1/Ecm", userRouter);
app.use("/api/v1/Ecm", addressRouter);
app.use("/api/v1/Ecm", productRouter);
app.use("/api/v1/Ecm", orderRouter);

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
