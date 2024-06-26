ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

CREATE DATABASE ru;
USE ru;

CREATE TABLE administrator(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	full_name VARCHAR(50) NOT NULL,
	email VARCHAR(250) NOT NULL,
	password VARCHAR(255) NOT NULL
);

CREATE TABLE clerk(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	full_name VARCHAR(50) NOT NULL,
	email VARCHAR(250) NOT NULL,
	password VARCHAR(255) NOT NULL,
	shift VARCHAR(50),
	photo BLOB,
	id_administrator INTEGER,
	FOREIGN KEY (id_administrator) REFERENCES administrator (id)

CREATE TABLE student(
	registration CHAR(9) PRIMARY KEY NOT NULL,
	type_Assistance VARCHAR(4) NOT NULL,
	full_name VARCHAR(50) NOT NULL,
	course VARCHAR(50) NOT NULL,
	notice_number VARCHAR(50),
	date_started_assistance DATE,
	photo BLOB,
	id_administrator INTEGER,
	FOREIGN KEY (id_administrator) REFERENCES administrator (id)
);

CREATE TABLE service(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	date_service DATE NOT NULL,
	id_clerk INTEGER,
	FOREIGN KEY (id_clerk) REFERENCES clerk (id)
);

CREATE TABLE coffee(
	id INTEGER PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE item (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	name_item VARCHAR(50) NOT NULL,
	id_coffee INTEGER,
	FOREIGN KEY (id_coffee) REFERENCES coffee (id)
);

CREATE TABLE lunch(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	quantity FLOAT NOT NULL
);

CREATE TABLE orders(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	price FLOAT NOT NULL,
	type_payment VARCHAR(10) NOT NULL,
	registration_student CHAR(9),
	id_service INTEGER,
	id_lunch INTEGER,
	id_coffee INTEGER,
	FOREIGN KEY (registration_student) REFERENCES student (registration),
	FOREIGN KEY (id_service) REFERENCES service (id),
	FOREIGN KEY (id_lunch) REFERENCES lunch (id),
	FOREIGN KEY (id_coffee) REFERENCES coffee (id)
);


INSERT INTO administrator (full_name,email,password) VALUES ("admin","admin@gmail.com", "admin");
SELECT * FROM administrator;

select * from clerk;

SELECT * FROM student;



