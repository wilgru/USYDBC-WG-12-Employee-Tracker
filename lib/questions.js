class questions {
    constructor(existingRoles, existingEmployees, existingDepartments, existingManagers) {

        this.roles = existingRoles;
        this.departments = existingDepartments;
        this.employees = existingEmployees;
        this.managers = existingManagers;

    }

    returnQuestion = function returnQuestion(questionSet){
        const mainMenu = 
            [
                {
                    name: 'mainMenuChoice',
                    type: 'list',
                    choices: ['View all departments', 'View all roles', 'View all employees', 'Add new department', 'Add new role', 'Add new employee', 'Update an employee role'],
                    message: "Please select one of the following options: "
                }
            ]
        
        const addEmployee = 
            [
                {
                    name: 'addEmplyeeFirstName',
                    type: 'input',
                    message: "Employee's first name: "
                },
                {
                    name: 'addEmplyeeLastName',
                    type: 'input',
                    message: "Employee's last name: "
                },
                {
                    name: 'addEmplyeeRole',
                    type: 'list',
                    choices: this.roles,
                    message: "Employee's role: "
                },
                {
                    name: 'addEmplyeeManagerId',
                    type: 'list',
                    choices: this.managers.concat({name: 'N/A', value: null}),
                    message: "Select a manager this employee belongs to: "
                },
            ]
        
        const addRole = 
            [
                {
                    name: 'addRoleTitle',
                    type: 'input',
                    message: "Role title: "
                },
                {
                    name: 'addRoleSalary',
                    type: 'number',
                    message: "Role salary: "
                },
                {
                    name: 'addRoleDepartmentId',
                    type: 'list',
                    choices: this.departments,
                    message: "Select a department this role belongs to: "
                }
            ]

        const addDepartment =
            [
                {
                    name: 'addDepartmentName',
                    type: 'input',
                    message: "Department name: "
                }
            ]

        const updateEmployeeRole =
        [
            {
                name: 'updateEmployeeNameId',
                type: 'list',
                choices: this.employees,
                message: "Employee to udpate the role of: "
            },
            {
                name: 'updateEmployeeNewRole',
                type: 'list',
                choices: this.roles,
                message: "New role: "
            }
        ]

        const updateEmployeeManager =
        [
            {
                name: 'updateEmployeeNameId',
                type: 'list',
                choices: this.employees,
                message: "Employee to udpate the role of: "
            },
            {
                name: 'updateEmployeeNewManager',
                type: 'list',
                choices: this.managers,
                message: "New manager: "
            }
        ]

        switch (questionSet) {
            case 'mainMenu':
                return mainMenu;
            case 'employees':
                return addEmployee;
            case 'roles':
                return addRole;
            case 'departments':
                return addDepartment;
            case 'updateEmployeeRole':
                return updateEmployeeRole;
            case 'updateEmployeeManager':
                return updateEmployeeManager;
        } 
    }
}

module.exports = questions;