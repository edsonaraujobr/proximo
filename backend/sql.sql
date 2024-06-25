CREATE DATABASE ru;
USE ru;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

CREATE TABLE administrator (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

INSERT INTO administrator (name,email,password) VALUES ("admin","admin@gmail.com", "admin");
SELECT * FROM administrator;

CREATE TABLE clerk (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    shift VARCHAR(10),
    photo blob
);

select * from clerk;

CREATE TABLE student (
	registration CHAR(9) PRIMARY KEY ,
    type_assistance VARCHAR(4),
    name VARCHAR(255),
    course VARCHAR(255),
    notice_number VARCHAR(255),
    date_started_assistance DATE,
    photo blob
);

SELECT * FROM student;

