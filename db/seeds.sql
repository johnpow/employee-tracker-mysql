INSERT INTO department(name)
VALUES ("Sales"),
       ("Recruiting"),
       ("Engineering"),
       ("Product");


INSERT INTO role(title,salary,department_id)
VALUES ("Sales Manager", 100000, 1),
       ("Sales Associate",65000, 1),
       ("Recruiter",115000, 2),
       ("Recruiting Coordinator",70000, 2),
       ("Engineering Manager", 200000, 3),
       ("Engineer", 160000, 3),
       ("Product Manager",130000,4),
       ("Product Marketer",110000,4);


INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES ("Jake","Bin",1,null),
("Samantha","Roger",2,1),
("Betsy","Kee",3,null),
("Robert","Denny",4,3),
("Elon","Musk",5,null),
("Corey","Codee",6,5),
("Johnny","Appleseed",7,null),
("Funny","Name",8,7);
