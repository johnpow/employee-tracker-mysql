
-- Get full employee data
SELECT DISTINCT
    a.id, 
    a.first_name, 
    a.last_name, 
    c.title,
    d.name as department,
    CONCAT(b.first_name," ",b.last_name) as manager 
FROM employee a 
LEFT JOIN employee b 
ON a.manager_id = b.id
LEFT JOIN role c
ON a.role_id = c.id
LEFT JOIN department d
ON c.department_id = d.id;


-- Get role + department
SELECT DISTINCT
    c.id, 
    c.title,
    d.name as department
FROM role c
LEFT JOIN department d
ON c.department_id = d.id;


-- Get departments
SELECT * FROM department;