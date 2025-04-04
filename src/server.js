import dotenv from "dotenv";
import express from "express";
import mysql from "mysql2";
import bcrypt from "bcryptjs";
import cors from "cors";

dotenv.config();
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
  console.log("Headers:", req.headers);
  console.log("Body:", req.body); // Check the request body

  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
    db.query(
      sql,
      [firstName, lastName, email, hashedPassword],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Email already exists or error in database" });
        }
        res.json({ message: "User registered successfully!" });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Sign In
app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({
      message: "Login successful!",
      user: { id: user.id, email: user.email },
    });
  });
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
