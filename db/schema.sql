DROP DATABASE IF EXISTS bullet_journal;
create database bullet_journal;
USE bullet_journal;

CREATE TABLE users (
    id INT not NULL AUTO_INCREMENT,
    users VARCHAR(30) not NULL,
    pw VARCHAR(30) not NULL,
    PRIMARY KEY (id)
);

CREATE TABLE indexs (
    id INT not NULL AUTO_INCREMENT,
    name VARCHAR(30) not NULL,
    PRIMARY KEY (id)
);

CREATE TABLE posts (
    id INT not NULL AUTO_INCREMENT,
    title VARCHAR(30) not NULL,
    PRIMARY KEY(id)
);

CREATE TABLE tasks (
    id INT not NULL AUTO_INCREMENT,
    PRIMARY KEY(id)
);

CREATE TABLE monthly_spread (
    id INT not NULL AUTO_INCREMENT,
    monthz VARCHAR(30) not NULL,
    PRIMARY KEY(id)
);

CREATE TABLE journal (
    id INT not NULL AUTO_INCREMENT,
    users INT NOT NULL REFERENCES users(id), 
    posts INT NOT NULL REFERENCES posts(id),
    indexs INT NOT NULL REFERENCES indexs(id),
    tasks INT NOT NULL REFERENCES tasks(id),
    monthly_spread INT NOT NULL REFERENCES monthly_spread(id),
    daily_spread INT NOT NULL REFERENCES daily_spread(id),
    PRIMARY KEY(id)
);





