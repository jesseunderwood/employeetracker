import inquirer from 'inquirer';
import { connectToDb, pool } from './connection.js';
async function init() {
    await connectToDb();
    await mainMenu();
}
async function mainMenu() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all departments',
                'View all roles',
                'Add an employee',
                'Add a department',
                'Add a role',
                'Update an employee role',
                'Quit'
            ]
        }
    ]);
    switch (answers.choice) {
        case 'View all employees':
            await viewAllEmployees();
            break;
        case 'View all departments':
            await viewAllDepartments();
            break;
        case 'View all roles':
            await viewAllRoles();
            break;
        case 'Add an employee':
            await addEmployee();
            break;
        case 'Add a department':
            await addDepartment();
            break;
        case 'Add a role':
            await addRole();
            break;
        case 'Update an employee role':
            await updateEmployeeRole();
            break;
        case 'Quit':
            process.exit();
            break;
    }
    // Call the main menu again after completing the action
    await mainMenu();
}
async function viewAllEmployees() {
    try {
        const { rows } = await pool.query('SELECT * FROM employee'); // Replace with your actual query
        console.table(rows);
    }
    catch (error) {
        console.error('Error retrieving employees:', error);
    }
}
async function viewAllDepartments() {
    try {
        const { rows } = await pool.query('SELECT * FROM department'); // Replace with your actual query
        console.table(rows);
    }
    catch (error) {
        console.error('Error retrieving departments:', error);
    }
}
async function viewAllRoles() {
    try {
        const { rows } = await pool.query('SELECT * FROM role'); // Replace with your actual query
        console.table(rows);
    }
    catch (error) {
        console.error('Error retrieving roles:', error);
    }
}
async function addEmployee() {
    try {
        const employee = await inquirer.prompt([
            { type: 'input', name: 'firstName', message: 'Enter the first name:' },
            { type: 'input', name: 'lastName', message: 'Enter the last name:' },
            { type: 'input', name: 'roleId', message: 'Enter the role ID:' },
        ]);
        const { firstName, lastName, roleId } = employee;
        const query = 'INSERT INTO employee (first_name, last_name, role_id) VALUES ($1, $2, $3)';
        await pool.query(query, [firstName, lastName, roleId]);
        console.log('Employee added successfully');
    }
    catch (error) {
        console.error('Error adding employee:', error);
    }
}
async function addRole() {
    try {
        const role = await inquirer.prompt([
            { type: 'input', name: 'title', message: 'Enter the title:' },
            { type: 'input', name: 'salary', message: 'Enter the salary:' },
            { type: 'input', name: 'departmentId', message: 'Enter the department ID:' }
        ]);
        const { title, salary, departmentId } = role;
        const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)';
        await pool.query(query, [title, salary, departmentId]);
        console.log('Role added successfully');
    }
    catch (error) {
        console.error('Error adding role:', error);
    }
}
async function updateEmployeeRole() {
    try {
        const employee = await inquirer.prompt([
            { type: 'input', name: 'employeeId', message: 'Enter the employee ID:' },
            { type: 'input', name: 'roleId', message: 'Enter the new role ID:' }
        ]);
        const { employeeId, roleId } = employee;
        const query = 'UPDATE employee SET role_id = $1 WHERE id = $2';
        await pool.query(query, [roleId, employeeId]);
        console.log('Employee role updated successfully');
    }
    catch (error) {
        console.error('Error updating employee role:', error);
    }
}
async function addDepartment() {
    try {
        const department = await inquirer.prompt([
            { type: 'input', name: 'name', message: 'Enter the department name:' }
        ]);
        const { name } = department;
        const query = 'INSERT INTO department (name) VALUES ($1)';
        await pool.query(query, [name]);
        console.log('Department added successfully');
    }
    catch (error) {
        console.error('Error adding department:', error);
    }
}
// Start the application
init();
