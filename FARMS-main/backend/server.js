const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const routes = require("./Routes/route");
const cors = require("cors");
const connectDatabase = require("./Config/database");

const app = express();
const db = new sqlite3.Database("./users.db");

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database Connection (MongoDB)
connectDatabase();

// Routes
app.use("/api/v1", routes);

// Teacher Dashboard Routes
const teacherRoutes = require("./routes/teacherRoutes");
app.use("/api/v1/teacher", teacherRoutes);

// Vulnerable Signup Route (SQL Injection)
app.post("/signup", (req, res) => {
  const { username, password, name } = req.body;

  if (!username || !password || !name) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Vulnerable SQL Query (concatenates user input directly)
  const checkQuery = `SELECT * FROM user WHERE username = '${username}'`;

  db.get(checkQuery, (err, row) => {
    if (err) {
      console.error("Error checking username:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (row) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Vulnerable SQL Query (concatenates user input directly)
    const insertQuery = `INSERT INTO user (username, password, name) VALUES ('${username}', '${password}', '${name}')`;

    db.run(insertQuery, function (err) {
      if (err) {
        console.error("Error inserting user:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "Signup Successful!" });
    });
  });
});

// Vulnerable Login Route (SQL Injection)
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  // Vulnerable SQL Query (concatenates user input directly)
  const query = `SELECT name FROM user WHERE username = '${username}' AND password = '${password}'`;

  db.get(query, (err, row) => {
    if (err) {
      console.error("Error executing login query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!row) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ message: `Hello, ${row.name}` });
  });
});

// Feedback Table Creation
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      feedback TEXT
    )
  `);
});

// Submit Feedback Route
app.post("/feedback", (req, res) => {
  const { name, email, feedback } = req.body;

  if (!name || !email || !feedback) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = `INSERT INTO feedback (name, email, feedback) VALUES (?, ?, ?)`;
  db.run(query, [name, email, feedback], function (err) {
    if (err) {
      console.error("Error saving feedback:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Feedback submitted successfully!" });
  });
});

// Fetch Feedback Route
app.get("/feedback", (req, res) => {
  const query = `SELECT * FROM feedback`;
  db.all(query, (err, rows) => {
    if (err) {
      console.error("Error fetching feedback:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(rows);
  });
});

// Start Server
const PORT = process.env.PORT || 5007;
app.listen(PORT, () => {
  console.log(`🚀 VULNERABLE SERVER RUNNING ON: http://localhost:${PORT}`);
});