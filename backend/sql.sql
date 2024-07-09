ALTER USER 'root' @'localhost' IDENTIFIED
WITH
    mysql_native_password BY 'root';

CREATE DATABASE ru;

USE ru;

CREATE TABLE administrator (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(250) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE clerk (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(250) NOT NULL UNIQUE,
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
    FOREIGN KEY (id_clerk) REFERENCES clerk (id) ON DELETE SET NULL
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
    FOREIGN KEY (registration_student) REFERENCES student (registration) ON DELETE SET NULL,
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

