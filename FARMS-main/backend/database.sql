-- Create the users table
CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL
);

-- Insert sample users
INSERT INTO user (username, password, name) VALUES
    ('admin', 'admin123', 'teacher'),
    ('deepak', 'mypassword', 'student'),
    ('testuser', 'testpass', 'student');