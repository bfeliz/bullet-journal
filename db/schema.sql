CREATE DATABASE bullet_journal
USE bullet_journal

--NOT WORKING DONT RUN PLEASE

CREATE TABLE journal (
    id INT NOT_NULL AUTO_INCREMENT, 
    user REFERENCES user,   -- journal has one to one with user
    posts REFERENCES posts, -- journal has many posts
    index REFERENCES index, -- journal has one index
    task REFERENCES task, -- journal has many tasks
    monthly_spread REFERENCES monthly_spread, -- journal has many monthly spreads
    daily_spread REFERENCES daily_spread, -- journal has many daily spreads

)

CREATE TABLE users (
    id INT NOT_NULL AUTO_INCREMENT,
    user VARCHAR NOT_NULL,
    pw VARCHAR NOT_NULL,
    PRIMARY KEY (id)
)

CREATE TABLE index (
    id INT NOT_NULL AUTO_INCREMENT,
    name VARCHAR NOT_NULL,
    PRIMARY KEY (id)

)

CREATE TABLE posts (
    id INT NOT_NULL AUTO_INCREMENT,
    title VARCHAR NOT_NULL,
)

CREATE TABLE tasks (
    id INT NOT_NULL AUTO_INCREMENT,
)

CREATE TABLE monthly_spread (
    id INT NOT_NULL AUTO_INCREMENT,
    month VARCHAR NOT_NULL,
)

CREATE TABLE daily_spread (
    id INT NOT_NULL AUTO_INCREMENT,
    day VARCHAR NOT_NULL,
)

