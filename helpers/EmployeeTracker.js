// requirees
const cTable = require('console.table');
const mySql2 = require('mysql2');
const util = require('util');
const inquirer = require('inquirer');

const questions = require('./questions');
const { addToTable, updateRow, deleteFromTable, getTable } = require('./queries');

// establish connection to db
const db = mySql2.createConnection({

})

// promisify db.query method
const promiseQuery = util.promisify(db.query);

// employee tracker class
class EmployeeTracker {
    constructor() {

    }

    // function to call on startup
    startUp() {
        this.mainMenu()
    }

    // renders thhe main menu questions
    mainMenu() {
        inquirer(questions.mainMenu)
        .then(choice => {
            switch (choice) {
                case 'View all departments':
                    this.viewTable('departments');
                    break;
            
                case 'View all roles':
                    this.viewTable('roles');
                    break;
            
                case 'View all employees':
                    this.viewTable('employees');
                    break;
            
                default:
                    break;
            }
        })
    }

    // add new to employees table
    addNewEmployee(answers) {
        promiseQuery(addToTable('employees'), answers.addEmplyeeFirstName, answers.addEmplyeeLastName, answers.addEmplyeeRole, answers.addEmplyeeManagerId)
        .then(results => {

        })
        .catch(err => {

        });
    }

    // add new to roles table
    addNewRole(answers) {
        promiseQuery(addToTable('roles'), answers.addRoleTitle, answers.addRoleSalary, answers.addRoleDepartmentId)
        .then(results => {

        })
        .catch(err => {
            
        });
    }

    // add new to departments table
    addNewDepartment(answers) {
        promiseQuery(addToTable('departments'), answers.name)
        .then(results => {

        })
        .catch(err => {
            
        });
    }

    // // view all departments
    // viewDepartments() {
    //     promiseQuery(getTable(), 'departments')
    //     .then(results => {
    //         console.table(results)
    //     })
    //     .catch(err => {
    //         console.error(err)
    //     })
    // }

    // // view all roles
    // viewRoles() {
    //     promiseQuery(getTable(), 'roles')
    //     .then(results => {
    //         console.table(results)
    //     })
    //     .catch(err => {
    //         console.error(err)
    //     })
    // }

    // // view all employees
    // viewEmplyees() {
    //     promiseQuery(getTable(), 'employees')
    //     .then(results => {
    //         console.table(results)
    //     })
    //     .catch(err => {
    //         console.error(err)
    //     })
    // }

    // view all records from a given table
    viewTable(table) {
        promiseQuery(getTable(), table)
        .then(results => {
            console.table(results)
        })
        .catch(err => {
            console.error(err)
        })
    }

    // update emplyee
    updateEmplyee(id) {

    }

}

module.exports = EmployeeTracker;