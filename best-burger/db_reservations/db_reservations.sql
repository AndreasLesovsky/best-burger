CREATE DATABASE db_reservations;

USE db_reservations;

CREATE TABLE tbl_reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    table_number INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
