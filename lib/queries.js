const queries = {
    getTable: function getTable(table) {
        let query = ``;

        switch (table) {
            case 'employees':
                query = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS 'department', CONCAT(managers.first_name, ' ', managers.last_name) AS 'managers name' FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON employees.role_id = departments.id LEFT JOIN employees managers ON employees.manager_id = managers.id`;
                break;
            case 'roles':
                query = `SELECT title, salary, name AS 'department' FROM roles JOIN departments ON roles.department_id = departments.id`;
                break;
            case 'departments':
                query = `SELECT name as 'department name' FROM departments`;
                break;
        }
        return query;
    },

    getManagers: function getManagers() {
        return `SELECT * FROM employees JOIN roles ON employees.role_id = roles.id WHERE title = 'manager'`;
    },

    deleteFromTable: function deleteFromTable(table, id) {
        let query = ``;

        switch (table) {
            case 'employees':
                query = `DELETE FROM employees WHERE id = ?`;
                break;
            case 'roles':
                query = `DELETE FROM roles WHERE id = ?`;
                break;
            case 'departments':
                query = `DELETE FROM departments WHERE id = ?`;
                break;
        }
        return query;
    },

    updateRow: function updateRow(db, table, id) {

    },

    addToTable: function addToTable(table) {
        let query = ``;
        switch (table) {
            case 'employees':
                query = `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`;
                break;
            case 'roles':
                query = `INSERT INTO roles(title, salary, department_id) VALUES(?, ?, ?)`;
                break;
            case 'departments':
                query = `INSERT INTO departments(name) VALUES(?)`;
                break;
        }
        return query;
    }
}

module.exports = queries;