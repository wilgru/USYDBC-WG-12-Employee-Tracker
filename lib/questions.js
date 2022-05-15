class questions {
    constructor(existingRoles, existingEmployees, existingDepartments, existingManagers) {

        this.roles = existingRoles;
        this.departments = existingDepartments;
        this.employees = existingEmployees;
        this.managers = existingManagers;

        this.mainMenu = 
            [
                {
                    name: 'mainMenuChoice',
                    type: 'list',
                    choices: ['View all departments', 'View all roles', 'View all employees', 'Add new department', 'Add new role', 'Add new employee', 'Update an employee role'],
                    message: "Please select one of the following options: "
                }
            ]
        
        this.addEmployee = 
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
        
        this.addRole = 
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

        this.addDepartment =
            [
                {
                    name: 'addDepartmentName',
                    type: 'input',
                    message: "Department name: "
                }
            ]
    }
}

module.exports = questions;