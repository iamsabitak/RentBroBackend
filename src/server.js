import dotenv from "dotenv";
import express from "express";
import mysql from "mysql2";
import bcrypt from "bcryptjs";
import cors from "cors";

// dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "P@ssw0rd",
  database: "user_auth",
});

// Connect to MySQL Database
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});

// ======== ROUTES ======== //

// Sign Up
app.post("/signup", async (req, res) => {
  console.log("Received data:", req.body); // Log the request body

  // Validate the incoming request
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password
  ) {
    return res.json({
      message: "All fields are required",
      receivedData: req.body, // Return the received data
    });
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const sql = `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    hashedPassword,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ Error inserting data:", err);
      return res.status(500).json({ error: "Database error" });
    }

    console.log("✅ User signed up:", result);
    return res.json({
      message: "User signed up successfully",
      insertedData: result, // Include the result of the insertion
    });
  });
});

// Sign In
app.post("/signin", (req, res) => {
  console.log("signin");
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
