CREATE DATABASE db_reservations;

USE db_reservations;

CREATE TABLE tbl_reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    res_date DATE NOT NULL,
    res_time TIME NOT NULL,
    table_number INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tbl_reservations (name, email, phone, res_date, res_time, table_number)
SELECT 
  CONCAT('Name', FLOOR(1 + (RAND() * 1000))),
  CONCAT('email', FLOOR(1 + (RAND() * 1000)), '@example.com'),
  CONCAT('+49 ', FLOOR(100000000 + (RAND() * 899999999))),
  CURDATE() + INTERVAL FLOOR(RAND() * 30) DAY, -- zufälliges Datum in den nächsten 30 Tagen
  -- zufällige Uhrzeit zwischen 11:00 und 23:30 in halbstündigen Intervallen
  TIME(CONCAT(
    FLOOR(11 + (RAND() * 12)), ':',
    LPAD(FLOOR(RAND() * 2) * 30, 2, '0')
  )),
  FLOOR(1 + (RAND() * 20)) -- zufällige Tischnummer zwischen 1 und 20
FROM
  (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t1,
  (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t2,
  (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) t3;
