import dotenv from "dotenv";
import ConnectionDb from "./db/mongoose.js";
import express from "express";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// أي middlewares أو routes تحطهم هنا
app.use(express.json());

ConnectionDb()
  .then(() => {
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((error) => {
    console.log("Database connection error:", error);
  });
