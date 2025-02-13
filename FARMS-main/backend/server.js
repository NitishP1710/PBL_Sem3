const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const db = new sqlite3.Database("./users.db"); // Persistent SQLite DB

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 🚨 VULNERABLE Signup Endpoint (No Validation)
app.post("/signup", (req, res) => {
  const { username, password, name } = req.body;

  if (!username || !password || !name) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // 🚨 DIRECT STRING CONCATENATION (SQL Injection Possible)
  const query = `INSERT INTO user (username, password, name) VALUES ('${username}', '${password}', '${name}')`;

  db.run(query, function (err) {
    if (err) {
      return res.status(400).json({ error: "User already exists or database error" });
    }
    res.json({ message: "Signup Successful!" });
  });
});

// 🚨 VULNERABLE Login Endpoint (Allows SQL Injection)
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 🚨 SQL Query Directly Concatenates Input (Vulnerable to SQL Injection)
  const query = `SELECT name FROM user WHERE username = '${username}' AND password = '${password}'`;

  console.log("Executing Query:", query); // Debugging (exposes queries)

  db.get(query, (err, row) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });

    if (!row) return res.status(401).json({ error: "Invalid credentials" });

    res.json({ message: `Hello, ${row.name}` });
  });
});

const PORT = 5007;
app.listen(PORT, () => {
  console.log(`🚨 VULNERABLE SERVER RUNNING ON: http://localhost:${PORT}`);
});