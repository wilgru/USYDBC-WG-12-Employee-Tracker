// requirees
const cTable = require('console.table');
const mySql2 = require('mysql2');
const util = require('util');
const inquirer = require('inquirer');

const { addToTable, updateRow, deleteFromTable, getTable, getManagers } = require('../src/queries');
const questionsClass = require('../src/questions');
const { timeStamp } = require('console');
let questions;

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

    startUp() {
console.log(` 
=====================================================
 _                              ___                   
|_ ._ _  ._  |  _      _   _     | ._  _.  _ |   _  ._ 
|_ | | | |_) | (_) \\/ (/_ (/_    | |  (_| (_ |< (/_ |  
         |         /                                 

=====================================================`)

        console.log("\nWelcome to your employee tracker!\n")
        this.updateLocalData();
    }

    // function to call to updateLocalData
    updateLocalData() {
        const rol = connection.promise().query(getTable('roles'))
        const emp = connection.promise().query(getTable('employees'))
        const dep = connection.promise().query(getTable('departments'))
        const man = connection.promise().query(getManagers())

        Promise.all([rol, emp, dep, man]).then(res => {
            const rolObj = res[0][0].map((row, index) => 
                (
                    { name: row.title, value: row.id }
                )
            )
            const empObj = res[1][0].map((row, index) => 
                (
                    { name: row.first_name + ' ' + row.last_name, value: row.id }
                )
            )
            const depObj = res[2][0].map((row, index) => 
                (
                    { name: row['department name'], value: row.id } 
                )
            )
            const manObj = res[3][0].map((row, index) => 
                (
                    { name: row.first_name + ' ' + row.last_name, value: row.id }
                )
            )
            // console.log(rolObj, empObj, depObj, manObj)

            questions = new questionsClass(
                rolObj,
                empObj,
                depObj,
                manObj
            )

            this.mainMenu();
        })
    }

    // renders thhe main menu questions
    mainMenu() {
        inquirer.prompt(questions.returnQuestion('mainMenu'))
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
            
                case 'Add new department':
                    this.addNewRecord('departments', questions.returnQuestion("departments"));
                    break;
            
                case 'Add new role':
                    questions.departments.length === 0 ? this.required('role', 'department') : this.addNewRecord('roles', questions.returnQuestion("roles"));
                    break;
            
                case 'Add new employee':
                    questions.roles.length === 0 ? this.required('employee', 'role') : this.addNewRecord('employees', questions.returnQuestion("employees"));
                    break;

                case 'Update an employee role':
                    questions.employees.length === 0 ? this.required('employee', 'employee') : this.updateEmplyee('role', questions.returnQuestion("updateEmployeeRole"));
                    break;

                case 'Update an employee manager':
                    questions.employees.length === 0 ? this.required('employee', 'employee') : this.updateEmplyee('manager', questions.returnQuestion("updateEmployeeManager"));
                    break;
            }
        })
    }

    //console log a message if another record is required to exist before doing anything
    required(toAdd, required) {
        console.log(`\n To add a new ${toAdd}, Please create a ${required} first \n`)
        this.mainMenu()
    }

    // add new record to parsed table
    addNewRecord(table, questionSet) {
        inquirer.prompt(questionSet)
        .then(answers => {
            if (this.validate(answers)) {
                connection.promise().query(addToTable(table), Object.values(answers))
                .then((response) => {
                    console.log(`\n'${(Object.values(answers))[0]}' sucessfully added to ${table}.\n`);
                    this.updateLocalData();
                })
                .catch(err => {
                    console.log(err)
                });
            } else {
                console.log("\nError: A field was left empty, please try again...\n");
                this.addNewRecord(table, questionSet);
            }
        })
    }

    // add new to employees table
    addNewChoiceListItem(table, data, id) {
        switch (table) {
            case "employees":
                return ({ name: data.addEmplyeeFirstName + ' ' + data.addEmplyeeLastName, value: id })
            case "roles":
                return ({ name: data.addRoleTitle, value: id })
            case "departments":
                return ({ name: data.addDepartmentName, value: id })
        }
    }

    // view all records from a given table
    viewTable(table) {
        connection.query(getTable(table), (err, res) => {
            if (err) {
                console.error(err)
            } else {
                if (res.length > 0) {
                    console.log('')
                    console.table(res)
                } else {
                    console.log("\nThis table is empty. Please add some records to view.\n")
                }
            }
            this.mainMenu();
        })
    }

    // update emplyee
    updateEmplyee(field, questionSet) {
        inquirer.prompt(questionSet)
        .then(answers => {
            if (this.validate(answers)) {
                connection.promise().query(updateRow("employees", field),  [Object.values(answers)[1], Object.values(answers)[0]])
                .then(results => {
                    console.log(`\nEmployee sucessfully updated.\n`);
                    this.updateLocalData();
                })
                .catch(err => {
                    console.error(err)
                })
            } else {
                console.log("\nError: A field was left empty, please try again...\n");
                this.updateEmplyee(field, questionSet);
            }
        })
    }

    // validate the parsed object
    validate(values) {
        let passed = true
        Object.values(values).forEach(val => {
            if (val === undefined || val === null || val === '') {
            passed = false
        }
    })
    return passed
  }
}

module.exports = EmployeeTracker;