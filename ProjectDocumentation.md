# Student Login System Project Documentation

## 1. Project Overview
This project is a simple full-stack student management system that lets users:
- add new students,
- view all students,
- update student records, and
- delete students.

It combines a frontend interface, a Node.js backend, and a MySQL database.

---

## 2. Purpose of the Project
The project was created to demonstrate:
- CRUD operations in a web application,
- backend and database integration,
- stored procedures and database triggers,
- a clean and responsive user interface.

---

## 3. Main Features
- Student registration and data entry
- Display of all student records
- Edit existing records
- Delete student records
- Duplicate entry validation for student number and email
- Deletion logging through a trigger

---

## 4. Technologies Used
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MySQL
- Tools: MySQL Workbench, VS Code

---

## 5. System Architecture
The application works in three main layers:
1. Frontend interface for user interaction
2. Express.js server for API requests
3. MySQL database for storing student data and log records

---

## 6. Database Design
### Students Table
Stores the main student information.

Fields:
- id — primary key
- student_number — unique identifier
- password — student password
- full_name — full name
- email — unique email address

### Student Deletions Table
Stores deleted student records for tracking.

Fields:
- id — primary key
- student_number — deleted student number
- deleted_at — date and time of deletion

---

## 7. CRUD Functionality
### Create
A new student is inserted into the database through the Add Student form.

### Read
All students are displayed in the table view.

### Update
Existing students can be edited from the interface.

### Delete
Students can be removed, and the deletion is logged automatically.

---

## 8. Stored Procedure and Trigger
### Stored Procedure
The project uses a stored procedure to retrieve a student by student number.

### Trigger
A trigger automatically saves deletion records into the `student_deletions` table whenever a student is deleted.

---

## 9. How the Application Works
1. The user opens the webpage.
2. The student form collects data.
3. The frontend sends requests to the backend.
4. The backend communicates with MySQL.
5. The results are displayed on the page.

---

## 10. Screenshot Section
You can add your screenshots here to make this document more visual and professional.

### Screenshot 1 — Main Interface
Insert your main page screenshot here.

### Screenshot 2 — Add / Update Student Form
Insert your form screenshot here.

### Screenshot 3 — Student Table View
Insert your student table screenshot here.

### Screenshot 4 — Delete / Edit Action
Insert your action screenshot here.

### Screenshot 5 — Database / ERD View
Insert your ERD or database screenshot here.

---

## 11. Setup Instructions
1. Install dependencies with `npm install`
2. Start MySQL and create the required database
3. Import the SQL file from `sql_queries/student_db.sql`
4. Start the backend with `npm start`
5. Open `index.html` in the browser

---

## 12. Notes
- The backend currently runs on port `3000`.
- Make sure the MySQL connection details in `server.js` match your local setup.
- Duplicate student numbers and emails are blocked with validation messages.

---

## 13. Conclusion
This project is a complete example of a small database-driven student management system with a working frontend, backend API, and SQL-based logic.
