// Description: This file is the entry point for the application. It connects to the database and starts the main menu.
// The main menu is a series of prompts that allow the user to interact with the database.
// The user can view all departments, view all roles, view all employees, add a department, add a role, add an employee, update an employee role, and update an employee manager.
// The user can also exit the application.

import inquirer from 'inquirer';
import { connectToDB } from './src/connection.js';
import { getAllDepartments, getAllRoles, getAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole, updateEmployeeManager, viewEmployeesByManager, viewEmployeesByDepartment, deleteDepartment, deleteRole, deleteEmployee, viewDepartmentBudget } from './src/queries.js';


connectToDB().then(() => {
  mainMenu();
});
async function mainMenu() {
  let isRunning = true;
  while (isRunning) {
  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: 
      ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Update an Employee Manager', 'View Employees by Manager', 'View Employees by Department', 'Delete a Department', 'Delete a Role', 'Delete an Employee', 'View Department Budget', 'Exit'],
    },
  ]);
try {
  switch (choice) {
    case 'View All Departments':
      const departments = await getAllDepartments();
      console.table(departments);
      break;
    case 'View All Roles':
      const roles = await getAllRoles();
      console.table(roles);
      break;
    case 'View All Employees':
      const employees = await getAllEmployees();
      console.table(employees);
      break;
    case 'View Employees by Department':
      const { department_id } = await inquirer.prompt([
        {
          type: 'input',
          name: 'department_id',
          message: 'Enter the ID of the department:',
        },
      ]);
      const employeesByDepartment = await viewEmployeesByDepartment(department_id);
      console.table(employeesByDepartment);
      break;
    case 'Add a Department':
      const department = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter the name of the department:',
        },
      ]);
      await addDepartment(department.name);
      console.log('Department added successfully!');
      console.table(department);
      break;
    case 'Add a Role':
      const role = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the role:',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary of the role:',
          validate: input => !isNaN(input) || 'Please enter a valid number.',
        },      
        {
          type: 'input',
          name: 'department_id',
          message: 'Enter the department ID of the role:',
          validate: input => !isNaN(input) || 'Please enter a valid number.',
        },
      ]);
      await addRole(role);
      console.log('Role added successfully!');
      console.table(role);
      break;
    case 'Add an Employee':
      const employee = await inquirer.prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'Enter the first name of the employee:',
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'Enter the last name of the employee:',
        },
        {
          type: 'input',
          name: 'role_id',
          message: 'Enter the role ID of the employee:',
        },
        {
          type: 'input',
          name: 'manager_id',
          message: 'Enter the manager ID of the employee:',
          validate: input => !isNaN(input) || 'Please enter a valid number.',
          filter: input => input === '' ? null : Number(input),        },
      ]);
      await addEmployee(employee);
      console.log('Employee added successfully!');
      console.table(employee);     
      break;
    case 'Update an Employee Role':
      const employeeId = await inquirer.prompt([
        {
          type: 'input',
          name: 'id',
          message: 'Enter the ID of the employee:',
          validate: input => !isNaN(input) || 'Please enter a valid number.',
        },
      ]);
      const roleId = await inquirer.prompt([
        {
          type: 'input',
          name: 'id',
          message: 'Enter the ID of the role:',
          validate: input => !isNaN(input) || 'Please enter a valid number.',
        },
      ]);
      await updateEmployeeRole(employeeId.id, roleId.id);
      console.log('Employee role updated successfully!');
      console.table(employeeId, roleId);
      break;
    case 'Update an Employee Manager':
      const employeeId1 = await inquirer.prompt([
        {
          type: 'input',
          name: 'id',
          message: 'Enter the ID of the employee:',
          validate: input => !isNaN(input) || 'Please enter a valid number.',
        },
      ]);
      const newManagerId = await inquirer.prompt([
        {
          type: 'input',
          name: 'id',
          message: 'Enter the ID of the manager:',
          validate: input => !isNaN(input) || 'Please enter a valid number.',
        },
      ]);
      await updateEmployeeManager(employeeId1.id, newManagerId.id);
      console.log('Employee manager updated successfully!');
      console.table(employeeId1, newManagerId);
      break;
    case 'View Employees by Manager':
      const findManagerId = await inquirer.prompt([
        {
          type: 'input',
          name: 'id',
          message: 'Enter the ID of the manager:',
          validate: input => !isNaN(input) || 'Please enter a valid number.',
        },
      ]);
      const employeesByManager = await viewEmployeesByManager(findManagerId.id);
      console.table(employeesByManager);
      break;
    case 'Delete a Department':
      const departmentId1 = await inquirer.prompt([
        {
          type: 'input',
          name: 'id',
          message: 'Enter the ID of the department:',
          validate: input => !isNaN(input) || 'Please enter a valid number.',
        },
      ]);
      await deleteDepartment(departmentId1.id);
      console.log('Department deleted successfully!');
      const departmentsAfterDelete = await getAllDepartments();
      console.table(departmentsAfterDelete);
      break;
    case 'Delete a Role':
      const roleId1 = await inquirer.prompt([
        {
          type: 'input',
          name: 'id',
          message: 'Enter the ID of the role:',
          validate: input => !isNaN(input) || 'Please enter a valid number.',
        },
      ]);
      await deleteRole(roleId1.id);
      console.log('Role deleted successfully!');
      const rolesAfterDelete = await getAllRoles();
      console.table(rolesAfterDelete);
      break;
    case 'Delete an Employee':
      const employeeId2 = await inquirer.prompt([
        {
          type: 'input',
          name: 'id',
          message: 'Enter the ID of the employee:',
          validate: input => !isNaN(input) || 'Please enter a valid number.',
        },
      ]);  
      await deleteEmployee(employeeId2.id);
      console.log('Employee deleted successfully!');
      const employeesAfterDelete = await getAllEmployees();
      console.table(employeesAfterDelete);
      break;
    case 'View Department Budget':
      const { id: deptId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'id',
          message: 'Enter the ID of the department:',
          validate: input => !isNaN(input) || 'Please enter a valid number.',
        },
      ]);
      const budget = await viewDepartmentBudget(deptId);
      const formattedBudget = budget.total_budget ? Number(budget.total_budget).toLocaleString() : 0;
      console.log(`The budget for the department with ID ${deptId} is $${formattedBudget}`);
      break;
    case 'Exit':
      console.log('Goodbye!');
      isRunning = false;
      break;
    default:
      console.log('Invalid choice. Please try again.');
  }
} catch (error) {
  console.error('An error occurred:', error.message);
}
  }
  }