DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE employees (
    id INT AUTO_INCRAMENT UNIQUE NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT, (null if the employee has no manager),

    PRIMARY KEY(id)
    FOREIGN KEY(role_id, manager_id)
    REFERENCES roles(id), employees(id)
);

CREATE TABLE roles (
    id INT AUTO_INCRAMENT UNIQUE NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,

    PRIMARY KEY(id)
    FOREIGN KEY(department_id)
    REFERENCES departments(id)
);

CREATE TABLE departments (
    id INT AUTO_INCRAMENT UNIQUE NOT NULL,
    name VARCHAR(30),

    PRIMARY KEY(id)
);