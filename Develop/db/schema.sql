DROP DATABASE IF EXISTS company_db;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE DATABASE company_db;




create table departments (
  id serial primary key,
  name varchar(30) unique not null
);

create table roles (
  id serial primary key,
  title varchar(30) unique not null,
  salary decimal not null,
  department_id integer not null references departments(id) ON DELETE CASCADE
);

create table employees (
  id serial primary key,
  first_name varchar(30) not null,
  last_name varchar(30) not null,
  role_id integer not null references roles(id) ON DELETE CASCADE,
  manager_id integer null references employees(id) on delete set null
);