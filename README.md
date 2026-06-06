# Student Login Page Documentation

## Overview
This project is a small full-stack student management system built with:
- Frontend: HTML, CSS, and JavaScript
- Backend: Node.js + Express
- Database: MySQL

It allows users to create, view, update, and delete student records through a simple web interface.

---

## Features
- Add new student records
- View all students in a table
- Edit existing student records
- Delete students
- Handle duplicate student number and email errors
- Use a stored procedure to fetch a student by student number
- Log deleted students in a `student_deletions` table using a trigger

---

## Project Structure
- `index.html` — main UI page
- `style.css` — styling for the interface
- `script.js` — frontend logic for CRUD actions
- `server.js` — Express backend and API routes
- `package.json` — Node dependencies and scripts
- `sql_queries/student_db.sql` — SQL schema, sample data, stored procedure, and trigger
- `sql_queries/drop.sql` — optional reset script
- `erd.png` — ERD image for the database

---

## Technology Stack
- Node.js
- Express.js
- MySQL2
- CORS
- Body Parser
- Vanilla JavaScript

---

## Database Design
The main database contains two tables:

### 1. students
Stores student details.

Fields:
- `id` — auto-increment primary key
- `student_number` — unique student identifier
- `password` — student password
- `full_name` — student name
- `email` — unique email address

### 2. student_deletions
Stores deleted student records for tracking purposes.

Fields:
- `id` — auto-increment primary key
- `student_number` — deleted student number
- `deleted_at` — timestamp of deletion

---

## Stored Procedure
The backend calls this procedure to find a student using `student_number`:

```sql
DELIMITER //
CREATE PROCEDURE GetStudentByNumber(IN snum VARCHAR(50))
BEGIN
    SELECT * FROM students WHERE student_number = snum;
END //
DELIMITER ;
```

---

## Trigger
A trigger automatically saves deleted student records into `student_deletions`:

```sql
DELIMITER //
CREATE TRIGGER after_student_delete
AFTER DELETE ON students
FOR EACH ROW
BEGIN
    INSERT INTO student_deletions (student_number, deleted_at)
    VALUES (OLD.student_number, NOW());
END //
DELIMITER ;
```

---

## API Endpoints
The backend runs on port `3000`.

### GET /students
Returns all students.

### POST /students
Creates a new student.

Example body:
```json
{
  "student_number": "SN-003",
  "password": "newpass",
  "full_name": "New User",
  "email": "newuser@example.com"
}
```

### PUT /students/:id
Updates an existing student by ID.

### DELETE /students/:id
Deletes a student by ID.

### GET /student/:student_number
Calls the stored procedure and returns the matching student.

---

## How to Run the Project

### 1. Install dependencies
```bash
npm install
```

### 2. Set up MySQL
Make sure MySQL is running and create the database used in `server.js`.

The current backend uses:
- host: `localhost`
- user: `root`
- database: `pup-aguila`

You may need to update the MySQL password in `server.js` if your local setup is different.

### 3. Import the SQL schema
Run the SQL file in `sql_queries/student_db.sql` in MySQL Workbench or your SQL client.

### 4. Start the backend
```bash
npm start
```

The server will run at:
```text
http://localhost:3000
```

### 5. Open the frontend
Open `index.html` in your browser.

---

## Notes
- The frontend expects the backend to be running on `http://localhost:3000`.
- Duplicate `student_number` or `email` values are handled with validation messages.
- The trigger ensures deletion activity is recorded automatically.

---

## Summary
This project is a simple but complete CRUD application for student management, combining:
- a modern web interface,
- a Node.js backend,
- MySQL storage,
- stored procedures, and
- database triggers for logging deletions.
