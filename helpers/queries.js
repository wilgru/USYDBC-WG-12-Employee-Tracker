const queries = {
    getTable: function getTable(table) {
        return `SELECT * FROM ?`;
    },
    deleteFromTable: function deleteFromTable(db, table, id) {

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
                query = `INSERT INTO roles(title, salary, department_id, manager_id) VALUES(?, ?, ?)`;
                break;
            case 'departments':
                query = `INSERT INTO departments(name) VALUES(?)`;
                break;
        }
        return query;
    }
}

module.exports = queries;