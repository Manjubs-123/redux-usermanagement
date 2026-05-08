import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from 'path'
import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads",express.static("uploads"))
app.use('/api/auth',userRoutes)
app.use('/api/admin',adminRoutes)


app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
