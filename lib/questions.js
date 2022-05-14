const questions = {
    mainMenu:
        [
            {
                name: 'mainMenuChoice',
                type: 'list',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
                message: "Please select one of the following options:"
            }
        ],
    addEmplyee: 
        [
            {
                name: 'addEmplyeeFirstName',
                type: 'input',
                message: ""
            },
            {
                name: 'addEmplyeeLastName',
                type: 'input',
                message: ""
            },
            {
                name: 'addEmplyeeRole',
                type: 'list',
                choices: [{name: '', value: 0}, {name: '', value: 1}, {name: '', value: 2}],
                message: ""
            },
            {
                name: 'addEmplyeeManagerId',
                type: 'number',
                message: ""
            },
        ],
    addRole: 
        [
            {
                name: 'addRoleTitle',
                type: 'input',
                message: ""
            },
            {
                name: 'addRoleSalary',
                type: 'number',
                message: ""
            },
            {
                name: 'addRoleDepartmentId',
                type: 'number',
                message: ""
            }
        ]
}

module.exports = questions;