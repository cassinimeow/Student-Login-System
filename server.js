// Simple Node.js + Express backend for Student Login Page
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Update these values with your MySQL credentials and database name
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '09289557378', // Set your password here if you have one
    database: 'pup-aguila' // Using your existing database
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database.');
    }
});

// CRUD Endpoints
app.get('/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});


app.post('/students', (req, res) => {
    const { student_number, password, full_name, email } = req.body;
    db.query('INSERT INTO students (student_number, password, full_name, email) VALUES (?, ?, ?, ?)',
        [student_number, password, full_name, email],
        (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    if (err.message.includes('student_number')) {
                        return res.status(400).json({ error: 'Student number already exists' });
                    } else if (err.message.includes('email')) {
                        return res.status(400).json({ error: 'Email already exists' });
                    } else {
                        return res.status(400).json({ error: 'Duplicate entry' });
                    }
                }
                return res.status(500).json({ error: err });
            }
            res.json({ id: results.insertId });
        }
    );
});


app.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const { student_number, password, full_name, email } = req.body;
    db.query('UPDATE students SET student_number=?, password=?, full_name=?, email=? WHERE id=?',
        [student_number, password, full_name, email, id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ updated: results.affectedRows });
        }
    );
});

app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM students WHERE id=?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ deleted: results.affectedRows });
    });
});


// Endpoint to call stored procedure
app.get('/student/:student_number', (req, res) => {
    const { student_number } = req.params;
    db.query('CALL GetStudentByNumber(?)', [student_number], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
