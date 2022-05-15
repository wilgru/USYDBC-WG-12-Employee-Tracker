INSERT INTO departments (name)
VALUES ("retail");

INSERT INTO roles (title, salary, department_id)
VALUES ("customer service", 100, 1),
       ("manager", 200, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("john", "doe", 1, NULL);