const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const connectDatabase = require("./Config/database");
const http = require("http");
const route=require("./Routes/route");

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

connectDatabase();
app.use("/api/v1",route)

// Initialize tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      name TEXT,
      role TEXT DEFAULT 'student'
    )
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      feedback TEXT,
      student_id INTEGER
    )
  `);
  
  
});


app.get("/", (req, res) => {
  res.send("Server is running!");
});

const fetch = require("node-fetch");
app.get("/ssrf-test", async (req, res) => {

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const targetUrl = new URL(url);

    if (targetUrl.hostname === "localhost" || targetUrl.hostname === "127.0.0.1") {
      console.log("Attempting localhost access:", url);
    }

    const protocol = targetUrl.protocol === "https:" ? https : http;

    protocol.get(url, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        res.send(data);
      });
    }).on("error", (error) => {
      console.error("SSRF Request Failed:", error);
      res.status(500).json({ error: "Request failed" });
    });

  } catch (error) {
    console.error("Invalid URL:", error);
    res.status(400).json({ error: "Invalid URL" });
  }
});

// Vulnerable Signup Route (SQL Injection)
app.post("/signup", (req, res) => {
  const { username, password, name, role = 'student' } = req.body;

  if (!username || !password || !name) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const checkQuery = `SELECT * FROM user WHERE username = '${username}'`;

  db.get(checkQuery, (err, row) => {
    if (err) {
      console.error("Error checking username:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (row) {
      return res.status(400).json({ error: "Username already exists" });
    }

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


// Get all students 
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

// Create student
app.post("/api/v1/students", (req, res) => {
  const { rollNumber, name, email, className, division, address, phone } = req.body;

  if (!rollNumber || !name) {
    return res.status(400).json({ error: "Roll number and name are required" });
  }

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


// Mark attendance 
app.post("/api/v1/attendance", (req, res) => {
  const { student_id, date, status } = req.body;

  if (!student_id || !date || !status) {
    return res.status(400).json({ error: "Student ID, date and status are required" });
  }

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

// Get attendance 
app.get("/api/v1/attendance", (req, res) => {
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


// Submit feedback
app.post("/api/v1/feedback", (req, res) => {
  const { name, email, feedback, student_id } = req.body;

  if (!name || !feedback) {
    return res.status(400).json({ error: "Name and feedback are required" });
  }

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

// Get all feedback
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


// Get fees status 
app.get("/api/v1/fees", (req, res) => {
  const feesData = [
    { id: 1, student_id: 1, amount: 5000, paid: true, due_date: "2023-12-31" },
    { id: 2, student_id: 2, amount: 5000, paid: false, due_date: "2023-12-31" }
  ];
  
  res.json({ success: true, data: feesData });
});

// Get class schedule 
app.get("/api/v1/schedule", (req, res) => {
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