create database dream_db;

create table user_Info (
    id INT AUTO_INCREMENT NOT NULL,
    fullName VARCHAR(50),
    email VARCHAR(50),
    userName VARCHAR(50),
    userPassword VARCHAR(50),

    PRIMARY KEY (id)
);
