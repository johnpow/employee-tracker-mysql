const departQuery = "SELECT * FROM department;";
const rolesQuery =
  "SELECT DISTINCT c.id, c.title, c.salary, d.name as department FROM role c LEFT JOIN department d ON c.department_id = d.id;";
const employeesQ =
  'SELECT DISTINCT a.id, a.first_name, a.last_name, c.title, d.name as department, c.salary, CONCAT(b.first_name," ",b.last_name) as manager FROM employee a LEFT JOIN employee b ON a.manager_id = b.id LEFT JOIN role c ON a.role_id = c.id LEFT JOIN department d ON c.department_id = d.id;';
const newDept = "INSERT INTO department(name) VALUES (?);";
const departNum = "SELECT id FROM department WHERE name = ?;";
const newRole = "INSERT INTO role(title,salary,department_id) VALUES (?,?,?);";
const newEmployee =
  "INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES (?,?,?,?);";
const updateEmployee =
 "UPDATE employee SET role_id = ?, manager_id = ? WHERE id =?;"


module.exports = {
  departQuery,
  rolesQuery,
  employeesQ,
  newDept,
  departNum,
  newRole,
  newEmployee,
  updateEmployee,
};
