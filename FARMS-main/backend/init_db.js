const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Connect to the database (or create it if it doesn't exist)
const db = new sqlite3.Database('./users.db');

// Read the SQL file
const sql = fs.readFileSync('database.sql').toString();

// Execute the SQL commands
db.serialize(() => {
    db.exec(sql, (err) => {
        if (err) {
            console.error('Error executing SQL file:', err);
        } else {
            console.log('Database setup complete!');
            
            // Verify feedback table exists
            db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='feedback'", (err, row) => {
                if (err) console.error('Error checking for feedback table:', err);
                console.log('Feedback table exists:', !!row);
            });
        }
    });
});

db.close();