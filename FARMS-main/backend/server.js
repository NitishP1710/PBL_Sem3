const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const db = new sqlite3.Database("./users.db");

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/signup", (req, res) => {
  const { username, password, name } = req.body;

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

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

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

const PORT = 5007;
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON: http://localhost:${PORT}`);
});
