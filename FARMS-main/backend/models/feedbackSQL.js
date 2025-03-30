const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db');

class FeedbackSQL {
    static async create(studentId, studentName, studentEmail, feedbackText) {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO feedback 
                (student_id, student_name, student_email, feedback_text) 
                VALUES (?, ?, ?, ?)`,
                [studentId, studentName, studentEmail, feedbackText],
                function(err) {
                    if (err) return reject(err);
                    resolve({
                        id: this.lastID,
                        studentId,
                        studentName,
                        studentEmail,
                        feedbackText,
                        createdAt: new Date().toISOString()
                    });
                }
            );
        });
    }

    static async getByStudentId(studentId) {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT * FROM feedback 
                WHERE student_id = ? 
                ORDER BY created_at DESC`,
                [studentId],
                (err, rows) => {
                    if (err) return reject(err);
                    resolve(rows);
                }
            );
        });
    }

    static async getByEmail(email) {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT * FROM feedback 
                WHERE student_email = ? 
                ORDER BY created_at DESC`,
                [email],
                (err, rows) => {
                    if (err) return reject(err);
                    resolve(rows);
                }
            );
        });
    }

    static async getAll() {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT * FROM feedback 
                ORDER BY created_at DESC`,
                (err, rows) => {
                    if (err) return reject(err);
                    resolve(rows);
                }
            );
        });
    }
}

module.exports = FeedbackSQL;