import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import mongoose from "mongoose";

dotenv.config();

// connect to database
mongoose.connect(
  "mongodb+srv://test-user:xY7Nqa0vCjFlmeRl@cluster0.u5jjg2x.mongodb.net/routes?retryWrites=true&w=majority&appName=Cluster0"
);

const app = express();

// app.use(cookieParser());

// CORS options
const allowedOrigins = [
  "https://route-protect.vercel.app",
  "http://localhost:3000",
  "*",
];

const corsOptions = {
  origin: "https://route-protect.vercel.app", // Must match frontend
  credentials: true, // Allow credentials (cookies) to be sent
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  // allowedHeaders: ["Content-Type", "Authorization"], // Add any custom headers if necessary
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Manually set 'Access-Control-Allow-Credentials' header for OPTIONS requests
app.options("*", cors(corsOptions));
// Body parser
app.use(express.json());

// Check backend URL working
app.get("/", (req, res) => {
  res.send("Backend works....");
});

// API routes
app.use("/api/user", userRoutes);

// deployment configuration
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "develpment"
    } mode on port http://localhost:${PORT}`.yellow.bold
  )
);
