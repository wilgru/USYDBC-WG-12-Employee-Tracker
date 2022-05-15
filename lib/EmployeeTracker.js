// requirees
const cTable = require('console.table');
const mySql2 = require('mysql2');
const util = require('util');
const inquirer = require('inquirer');

const { addToTable, updateRow, deleteFromTable, getTable, getManagers } = require('./queries');
const questionsClass = require('./questions');
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

    // function to call on startup
    startUp() {
        // questions = new questionsClass(
        //     // connection.query(getTable('roles')(, (, index)err, res) => res.forEach(row => 
        //     //     (
        //     //         { name: row.title, value: index+1 }
        //     //     )
        //     // )),
        //     // connection.query(getTable('employees'), (err, res) => res.for(Eac, index)h(row => 
        //     //     (
        //     //         { name: row.first_name + ' ' + row.last_name, value: index+1 }
        //     //     )
        //     // )),
        //     // connection.query(getTable('depart(men, index)ts'), (err, res) => res.forEach(row => 
        //     //     (
        //     //         { name: row.name, value: index+1 }
        //     //     )
        //     // ))
        // )

        const rol = connection.promise().query(getTable('roles'))
        const emp = connection.promise().query(getTable('employees'))
        const dep = connection.promise().query(getTable('departments'))
        const man = connection.promise().query(getManagers())

        Promise.all([rol, emp, dep, man]).then(res => {
            const rolObj = res[0][0].map((row, index) => 
                (
                    { name: row.title, value: index+1 }
                )
            )
            const empObj = res[1][0].map((row, index) => 
                (
                    { name: row.first_name + ' ' + row.last_name, value: index+1 }
                )
            )
            const depObj = res[2][0].map((row, index) => 
                (
                    { name: row['department name'], value: index+1 }
                )
            )
            const manObj = res[3][0].map((row, index) => 
                (
                    { name: row.first_name + ' ' + row.last_name, value: index+1 }
                )
            )
            console.log(rolObj, empObj, depObj, manObj)

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
            
                case 'Add new department':
                    this.addNewRecord('departments', questions.addDepartment);
                    break;
            
                case 'Add new role':
                    this.addNewRecord('roles', questions.addRole);
                    break;
            
                case 'Add new employee':
                    this.addNewRecord('employees', questions.addEmployee);
                    break;
            
                default:
                    break;
            }
        })
    }

    // add new record to parsed table
    addNewRecord(table, questionSet) {
        inquirer.prompt(questionSet)
        .then(
            answers => {
                console.log(answers)
                console.log(Object.values(answers))
                connection.promise().query(addToTable(table), Object.values(answers))
                .then(results => {
                    console.log(`\n'${Object.values(results)[0]}' sucessfully added to '${table}'\n`);
                    questions[table].concat(this.trackNewRecord(table, results));
                    this.mainMenu();
                })
                .catch(err => {
                    console.log(err)
                });
            }
        )
    }

    // add new to employees table
    trackNewRecord(table, data) {
        switch (table) {
            case "employees":
                return ({ name: data.first_name + ' ' + data.last_name, value: data.id })
            case "roles":
                return ({ name: data.title, value: data.id })
            case "departments":
                return ({ name: data.name, value: data.id })
        }
    }

    // // add new to roles table
    // addNewRole(answers) {
    //     promiseQuery(addToTable('roles'), answers.addRoleTitle, answers.addRoleSalary, answers.addRoleDepartmentId)
    //     .then(results => {

    //     })
    //     .catch(err => {
            
    //     });
    // }

    // // add new to departments table
    // addNewDepartment(answers) {
    //     promiseQuery(addToTable('departments'), answers.name)
    //     .then(results => {

    //     })
    //     .catch(err => {
            
    //     });
    // }

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