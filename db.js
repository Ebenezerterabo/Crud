import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MongoDB_url = process.env.MongoDB_URL;
// mongoose.connect(MongoDB_url);

const connectDB = async () => {
    try {
        await mongoose.connect(MongoDB_url);
        console.log("Database connected");
    } catch (error) {
        console.log("Database connection failed");
    }
}
// const db = mongoose.connection;
// db.once("open", () => {
//     console.log("Database connected");
// });
// db.on("error", () => {
//     console.log("Database connection failed");
// });

// export default db;

export default connectDB;