import mongoose from "mongoose";

const MongoDB_url = process.env.MongoDB_URL || "mongodb://192.168.128.1:27017/crudDB";
mongoose.connect(MongoDB_url);

const db = mongoose.connection;
db.once("open", () => {
    console.log("Database connected");
});
db.on("error", () => {
    console.log("Database connection failed");
});

export default db;