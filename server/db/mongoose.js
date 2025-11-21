import mongoose from "mongoose";
const ConnectionDb = async () => {
    try {
        const url = process.env.DB_URL;
        const connect = await mongoose.connect(url);
        console.log("Connected to database");
    } catch (error) {
        console.log("Database connection error:", error);
        process.exit(1);
    }
};

export default ConnectionDb;
