const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Connect to the database (or create it if it doesn't exist)
const db = new sqlite3.Database('./users.db');

// Read the SQL file
const sql = fs.readFileSync('database.sql').toString();

// Execute the SQL commands
db.exec(sql, (err) => {
    if (err) {
        console.error('Error executing SQL file:', err);
    } else {
        console.log('Database setup complete!');
    }
    db.close();
});
