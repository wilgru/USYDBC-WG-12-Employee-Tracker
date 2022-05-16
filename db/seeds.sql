INSERT INTO departments (name)
VALUES ("Retail");

INSERT INTO roles (title, salary, department_id)
VALUES ("Customer Service", 40000, 1),
       ("Manager", 80000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("john", "D", 2, NULL),
       ("William", "G", 1, 1),
       ("Jack", "H", 1, 1);