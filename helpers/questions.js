const questions = {
    mainMenu:
        [
            {
                name: 'mainMenuChoice',
                type: 'list',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
            }
        ],
    addEmplyee: 
        [
            {
                name: 'addEmplyeeFirstName',
                type: 'input'
            },
            {
                name: 'addEmplyeeLastName',
                type: 'input'
            },
            {
                name: 'addEmplyeeRole',
                type: 'list',
                choices: [{name: '', value: 0}, {name: '', value: 1}, {name: '', value: 2}]
            },
            {
                name: 'addEmplyeeManagerId',
                type: 'number'
            },
        ],
    addRole: 
        [
            {
                name: 'addRoleTitle',
                type: 'input'
            },
            {
                name: 'addRoleSalary',
                type: 'number'
            },
            {
                name: 'addRoleDepartmentId',
                type: 'number'
            }
        ]
}

module.exports = questions;