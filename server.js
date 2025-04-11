import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import userRouter from "./route.js";
// import db from "./db.js";
import connectDB from "./db.js";

const app = express();

//make .env file visible
dotenv.config();

//connect to database
connectDB();

app.use(bodyParser.json());
app.use("/api", userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});