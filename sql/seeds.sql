INSERT INTO department (name)
VALUES
    ('Human Resources'),
    ('Finance'),
    ('Engineering'),
    ('Sales'),
    ('Marketing'),
    ('Legal');

    INSERT INTO role (title, salary, department_id)
VALUES
    ('Human Resources Manager', 100000.00, 1),
    ('Finance Manager', 120000.00, 2),
    ('Engineering Manager', 150000.00, 3),
    ('Sales Manager', 110000.00, 4),
    ('Marketing Manager', 100000.00, 5),
    ('Legal Manager', 130000.00, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Doe', 2, NULL),
    ('Alice', 'Doe', 3, NULL),
    ('Bob', 'Doe', 4, NULL),
    ('Charlie', 'Doe', 5, NULL),
    ('Eve', 'Doe', 6, NULL);