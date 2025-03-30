-- Create the users table
CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
);

-- Insert sample users
INSERT INTO user (username, password, role) VALUES
    ('admin', 'admin123', 'teacher'),
    ('deepak', 'mypassword', 'student'),
    ('testuser', 'testpass', 'student');

-- Create the feedback table
CREATE TABLE feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id TEXT NOT NULL,  -- For MongoDB ObjectId
    student_name TEXT NOT NULL,
    student_email TEXT NOT NULL,
    feedback_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);