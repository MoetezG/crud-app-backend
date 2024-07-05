import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import Product from "./model/productModule.js";
import router from "./routes/route.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/products", router);

//Database connection and server connection
mongoose
  .connect(
    `mongodb+srv://root:${process.env.PASSWORD}@products.mjrx9ld.mongodb.net/Node-API?retryWrites=true&w=majority&appName=products`
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
