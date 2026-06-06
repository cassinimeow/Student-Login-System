-- 1. Create students table
CREATE TABLE students (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    student_number VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

-- 2. Insert sample data
INSERT INTO students (student_number, password, full_name, email) VALUES
('SN-001', 'password123', 'John Doe', 'john@example.com');

-- 3. CRUD Queries
-- Create
-- INSERT INTO students (student_number, password, full_name, email) VALUES ('new_user', 'newpass', 'New User', 'newuser@example.com');

-- Read
-- SELECT * FROM students;
-- SELECT * FROM students WHERE student_number = 'john_doe';

-- Update
-- UPDATE students SET password = 'newpassword' WHERE student_number = 'john_doe';

-- Delete
-- DELETE FROM students WHERE student_number = 'jane_smith';

-- 4. Stored Procedure
DELIMITER //
CREATE PROCEDURE GetStudentByNumber(IN snum VARCHAR(50))
BEGIN
    SELECT * FROM students WHERE student_number = snum;
END //
DELIMITER ;

-- 5. Trigger and log table
CREATE TABLE student_deletions (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    student_number VARCHAR(50) NOT NULL,
    deleted_at DATETIME NOT NULL
);

DELIMITER //
CREATE TRIGGER after_student_delete
AFTER DELETE ON students
FOR EACH ROW
BEGIN
    INSERT INTO student_deletions (student_number, deleted_at)
    VALUES (OLD.student_number, NOW());
END //
DELIMITER ;
