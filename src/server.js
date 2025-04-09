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
    !req.body.first_Name ||
    !req.body.last_Name ||
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
    req.body.first_Name,
    req.body.last_Name,
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

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
