const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const connectDatabase = require("./Config/database");

const app = express();
const db = new sqlite3.Database("./users.db");

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database Connection (MongoDB)
connectDatabase();

// Initialize tables
db.serialize(() => {
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      name TEXT,
      role TEXT DEFAULT 'student'
    )
  `);
  
  // Feedback table
  db.run(`
    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      feedback TEXT,
      student_id INTEGER
    )
  `);
  
  // Attendance table (vulnerable version)
  db.run(`
    CREATE TABLE IF NOT EXISTS attendance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER,
      date TEXT,
      status TEXT
    )
  `);
  
  // Students table (vulnerable version)
  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      rollNumber TEXT,
      name TEXT,
      email TEXT,
      className TEXT,
      division TEXT,
      address TEXT,
      phone TEXT
    )
  `);
});

// ================ VULNERABLE AUTH ROUTES ================ //

// Vulnerable Signup Route (SQL Injection)
app.post("/signup", (req, res) => {
  const { username, password, name, role = 'student' } = req.body;

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
    const insertQuery = `INSERT INTO user (username, password, name, role) VALUES ('${username}', '${password}', '${name}', '${role}')`;

    db.run(insertQuery, function (err) {
      if (err) {
        console.error("Error inserting user:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ 
        message: "Signup Successful!",
        user: { id: this.lastID, username, name, role }
      });
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
  const query = `SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`;

  db.get(query, (err, row) => {
    if (err) {
      console.error("Error executing login query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!row) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ 
      message: `Hello, ${row.name}`,
      user: {
        id: row.id,
        username: row.username,
        name: row.name,
        role: row.role
      }
    });
  });
});

// ================ VULNERABLE STUDENT ROUTES ================ //

// Get all students (vulnerable to SQL injection)
app.get("/api/v1/students", (req, res) => {
  const query = `SELECT * FROM students`;
  db.all(query, (err, rows) => {
    if (err) {
      console.error("Error fetching students:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: true, data: rows });
  });
});

// Create student (vulnerable to SQL injection)
app.post("/api/v1/students", (req, res) => {
  const { rollNumber, name, email, className, division, address, phone } = req.body;

  if (!rollNumber || !name) {
    return res.status(400).json({ error: "Roll number and name are required" });
  }

  // Vulnerable SQL query
  const query = `INSERT INTO students (rollNumber, name, email, className, division, address, phone) 
                 VALUES ('${rollNumber}', '${name}', '${email || ''}', '${className || ''}', 
                 '${division || ''}', '${address || ''}', '${phone || ''}')`;

  db.run(query, function(err) {
    if (err) {
      console.error("Error creating student:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ 
      success: true,
      message: "Student created successfully",
      id: this.lastID
    });
  });
});

// ================ VULNERABLE ATTENDANCE ROUTES ================ //

// Mark attendance (vulnerable to SQL injection)
app.post("/api/v1/attendance", (req, res) => {
  const { student_id, date, status } = req.body;

  if (!student_id || !date || !status) {
    return res.status(400).json({ error: "Student ID, date and status are required" });
  }

  // Vulnerable SQL query
  const query = `INSERT INTO attendance (student_id, date, status) 
                 VALUES ('${student_id}', '${date}', '${status}')`;

  db.run(query, function(err) {
    if (err) {
      console.error("Error marking attendance:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ 
      success: true,
      message: "Attendance marked successfully",
      id: this.lastID
    });
  });
});

// Get attendance (vulnerable to SQL injection)
app.get("/api/v1/attendance", (req, res) => {
  // Vulnerable to SQL injection through query params
  const student_id = req.query.student_id;
  let query = `SELECT * FROM attendance`;
  
  if (student_id) {
    query += ` WHERE student_id = '${student_id}'`;
  }

  db.all(query, (err, rows) => {
    if (err) {
      console.error("Error fetching attendance:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: true, data: rows });
  });
});

// ================ VULNERABLE FEEDBACK ROUTES ================ //

// Submit feedback (vulnerable to SQL injection)
app.post("/api/v1/feedback", (req, res) => {
  const { name, email, feedback, student_id } = req.body;

  if (!name || !feedback) {
    return res.status(400).json({ error: "Name and feedback are required" });
  }

  // Vulnerable SQL query
  const query = `INSERT INTO feedback (name, email, feedback, student_id) 
                 VALUES ('${name}', '${email || ''}', '${feedback}', '${student_id || 'NULL'}')`;

  db.run(query, function(err) {
    if (err) {
      console.error("Error saving feedback:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ 
      success: true,
      message: "Feedback submitted successfully!",
      id: this.lastID
    });
  });
});

// Get all feedback (vulnerable to SQL injection)
app.get("/api/v1/feedback", (req, res) => {
  const query = `SELECT * FROM feedback`;
  db.all(query, (err, rows) => {
    if (err) {
      console.error("Error fetching feedback:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: true, data: rows });
  });
});

// ================ STATIC/HARDCODED ROUTES ================ //

// Get fees status (hardcoded)
app.get("/api/v1/fees", (req, res) => {
  // Hardcoded fee data
  const feesData = [
    { id: 1, student_id: 1, amount: 5000, paid: true, due_date: "2023-12-31" },
    { id: 2, student_id: 2, amount: 5000, paid: false, due_date: "2023-12-31" }
  ];
  
  res.json({ success: true, data: feesData });
});

// Get class schedule (hardcoded)
app.get("/api/v1/schedule", (req, res) => {
  // Hardcoded schedule data
  const scheduleData = [
    { day: "Monday", subject: "Math", time: "09:00-10:00" },
    { day: "Tuesday", subject: "Science", time: "10:00-11:00" }
  ];
  
  res.json({ success: true, data: scheduleData });
});

// Start Server
const PORT = process.env.PORT || 5007;
app.listen(PORT, () => {
  console.log(`🚀 VULNERABLE SERVER RUNNING ON: http://localhost:${PORT}`);
});