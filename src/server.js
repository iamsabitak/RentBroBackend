import dotenv from "dotenv";
import express from "express";
import mysql from "mysql2";
import bcrypt from "bcryptjs";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // or wherever your frontend runs
    credentials: true,
  })
);

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
  console.log("Received data:", req.body);

  const { first_Name, last_Name, email, password } = req.body;

  if (!first_Name || !last_Name || !email || !password) {
    return res.json({
      message: "All fields are required",
      receivedData: req.body,
    });
  }

  // Check if email already exists
  const checkSql = `SELECT * FROM users WHERE email = ?`;
  db.query(checkSql, [email], async (err, results) => {
    if (err) {
      console.error("❌ Error checking email:", err);
      return res
        .status(500)
        .json({ error: "Database error during email check" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // If email doesn't exist, hash password and insert
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertSql = `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;
    const values = [first_Name, last_Name, email, hashedPassword];

    db.query(insertSql, values, (err, result) => {
      if (err) {
        console.error("❌ Error inserting data:", err);
        return res.status(500).json({ error: "Database error during signup" });
      }

      console.log("✅ User signed up:", result);
      return res.json({
        message: "User signed up successfully",
        insertedData: result,
      });
    });
  });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const sql = `SELECT * FROM users WHERE email = ?`;

  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("❌ Error fetching user:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      message: "Sign in successful",
      user: userWithoutPassword,
    });
  });
});

app.get("/rooms", (req, res) => {
  const sql = "SELECT * FROM rooms";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
