ALTER USER 'root' @'localhost' IDENTIFIED
WITH
    mysql_native_password BY 'root';

CREATE DATABASE ru;

USE ru;

CREATE TABLE administrator (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(50) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE clerk (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(50) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password VARCHAR(255) NOT NULL,
    shift VARCHAR(50),
    photo BLOB,
    id_administrator INTEGER,
    FOREIGN KEY (id_administrator) REFERENCES administrator (id)
);

CREATE TABLE student (
    registration CHAR(9) PRIMARY KEY NOT NULL,
    type_assistance VARCHAR(4) NOT NULL,
    full_name VARCHAR(50) NOT NULL,
    course VARCHAR(50) NOT NULL,
    notice_number VARCHAR(50),
    date_started_assistance DATE,
    photo BLOB,
    id_administrator INTEGER,
    FOREIGN KEY (id_administrator) REFERENCES administrator (id)
);

CREATE TABLE service (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    date_service TIMESTAMP NOT NULL,
    type_service VARCHAR(10) NOT NULL,
    id_clerk INTEGER,
    FOREIGN KEY (id_clerk) REFERENCES clerk (id)
);

CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    price_total DECIMAL(6,2) NOT NULL,
    price_paid DECIMAL(6,2) NOT NULL,
    type_payment VARCHAR(10) NOT NULL,
    registration_student CHAR(9),
    quantity_kg DECIMAL(4,3),
    quantity_items INTEGER,
    id_service INTEGER NOT NULL,
    FOREIGN KEY (registration_student) REFERENCES student (registration),
    FOREIGN KEY (id_service) REFERENCES service (id)
);

INSERT INTO
    administrator (full_name, email, password)
VALUES (
        "admin",
        "admin@gmail.com",
        "admin"
    );

SELECT * FROM clerk;

SELECT * FROM student;

SELECT * FROM orders;

SELECT * FROM service;

SELECT price_total, price_paid, type_payment, registration_student, quantity_kg, quantity_items 
FROM orders WHERE id_service = 47;

SELECT date_service, type_service, clerk.full_name
FROM service
INNER JOIN clerk ON id_clerk = clerk.id AND service.id = 47;

SELECT COUNT(*) AS total_rows
FROM (
    SELECT * FROM orders WHERE id_service = 47
) AS result_set;



       SELECT service.id,date_service, type_service,COUNT(service.id) AS total_services 
        FROM service
        INNER JOIN orders ON id_service = service.id 
        WHERE service.id_clerk = 1
        GROUP BY service.id      
        ORDER BY date_service 
        DESC LIMIT 2, 10; 

