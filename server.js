import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./MongoDB/connect.js";
import router from "./routes/martRoutes.js";

dotenv.config();

const app = express();

// ===== Body Parsers =====
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// ===== MongoDB =====
connectDB();

// ===== FIXED CORS =====
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://tekisky-mart-zoty.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ===== Routes =====
app.use("/api/mart", router);

// ===== Health Check =====
app.get("/", (req, res) => {
  res.send("API is running");
});

// ===== Server =====
const PORT = process.env.LOGIN_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
