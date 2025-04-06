import { pool } from './connection.js';

async function getAllDepartments() {
  try {
    const result = await pool.query('SELECT * FROM departments;');
    return result.rows;
  } catch (err) {
    console.error('Error fetching departments:', err);
  }
}

async function getAllRoles() {
  try {
    const result = await pool.query('SELECT * FROM roles;');
    return result.rows;
  } catch (err) {
    console.error('Error fetching roles:', err);
  }
}

async function getAllEmployees() {
  try {
    const result = await pool.query('SELECT * FROM employees;');
    return result.rows;
  } catch (err) {
    console.error('Error fetching employees:', err);
  }
}

async function addDepartment(department) {
  try { 
    const result = await pool.query('INSERT INTO departments (name) VALUES ($1) RETURNING *;', [department]);
    return result.rows[0];
  } catch (err) {
    console.error('Error adding department:', err);
  }
}

async function addRole(role) {
  try {
    const result = await pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *;', [role.title, role.salary, role.department_id]);
    return result.rows[0];
  } catch (err) {
    console.error('Error adding role:', err);
  }
}

async function addEmployee(employee) {
  try {
    const result = await pool.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *;', [employee.first_name, employee.last_name, employee.role_id, employee.manager_id]);
    return result.rows[0];
  } catch (err) {
    console.error('Error adding employee:', err);
  }
}

async function updateEmployeeRole(employeeId, roleId) {
  try {
    const result = await pool.query('UPDATE employees SET role_id = $1 WHERE id = $2 RETURNING *;', [roleId, employeeId]);
    return result.rows[0];
  } catch (err) {
    console.error('Error updating employee role:', err);
  }
}

async function updateEmployeeManager(employeeId, managerId) {
  try {
    const result = await pool.query('UPDATE employees SET manager_id = $1 WHERE id = $2 RETURNING *;', [managerId, employeeId]);
    return result.rows[0];
  } catch (err) {
    console.error('Error updating employee manager:', err);
  }   
}

async function  viewEmployeesByManager(managerId) {
 try {
    const result = await pool.query('SELECT * FROM employees WHERE manager_id = $1;', [managerId]);
    return result.rows;
  } catch (err) {
    console.error('Error fetching employees by manager:', err);
  }
 } 

async function viewEmployeesByDepartment(departmentId) {
  try {
    const result = await pool.query(
      'SELECT e.id as employee_id, e.first_name, e.last_name, r.title as role, d.name as department FROM employees e JOIN roles r ON e.role_id = r.id JOIN departments d ON r.department_id = d.id WHERE d.id = $1;', [departmentId]);
    return result.rows;
  } catch (err) {
    console.error('Error fetching employees by department:', err);
  }
}
async function deleteDepartment(departmentId) {
  try {
    const result = await pool.query('DELETE FROM departments WHERE id = $1 RETURNING *;', [departmentId]);
    return result.rows[0];
  } catch (err) {
    console.error('Error deleting department:', err);
  }
}
async function deleteRole(roleId) {
  try {
    const result = await pool.query('DELETE FROM roles WHERE id = $1 RETURNING *;', [roleId]);
    return result.rows[0];
  } catch (err) {
    console.error('Error deleting role:', err);
  }
}
async function deleteEmployee(employeeId) {
  try {
    const result = await pool.query('DELETE FROM employees WHERE id = $1 RETURNING *;', [employeeId]);
    return result.rows[0];
  } catch (err) {
    console.error('Error deleting employee:', err);
  }
}
async function viewDepartmentBudget(departmentId) {
  try {
    const result = await pool.query('SELECT SUM(salary) as total_budget FROM roles WHERE department_id = $1;', [departmentId]);
    return result.rows[0];
  } catch (err) {
    console.error('Error fetching department budget:', err);
  }
}
export { getAllDepartments, getAllRoles, getAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole, updateEmployeeManager, viewEmployeesByManager, viewEmployeesByDepartment, deleteDepartment, deleteRole, deleteEmployee, viewDepartmentBudget };


