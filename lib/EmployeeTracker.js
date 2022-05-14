// requirees
const cTable = require('console.table');
const mySql2 = require('mysql2');
const util = require('util');
const inquirer = require('inquirer');

const questions = require('./questions');
const { addToTable, updateRow, deleteFromTable, getTable } = require('./queries');

// establish connection to db
const connection = mySql2.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employee_tracker_db',
    password: 'locale123'
})

// promisify connection.query method
const promiseQuery = util.promisify(connection.query);

// employee tracker class
class EmployeeTracker {

    // function to call on startup
    startUp() {
        this.mainMenu();
    }

    // renders thhe main menu questions
    mainMenu() {
        inquirer.prompt(questions.mainMenu)
        .then(choice => {
            switch (choice.mainMenuChoice) {
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

    // view all records from a given table
    viewTable(table) {
        connection.query(getTable(table), (err, res) => {
            if (err) {
                console.error(err)
            } else {
                if (res.length > 0) {
                    console.table(res)
                } else {
                    console.log("\nThis table is empty. Please add some records to view.\n")
                }
            }
            this.mainMenu();
        })
    }

    // // view all records from a given table
    // viewTable(table) {
    //     promiseQuery(getTable(" "), table)
    //     .then(results => {
    //         console.log("complete")
    //         console.table(results)
    //     })
    //     .catch(err => {
    //         console.error(err)
    //     })
    // }

    // update emplyee
    updateEmplyee(id) {
        promiseQuery(updateRow(), id)
        .then(results => {

        })
        .catch(err => {
            console.error(err)
        })
    }

}

module.exports = EmployeeTracker;