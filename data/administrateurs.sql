CREATE TABLE administrateurs (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO administrateurs (username, last_name, email) VALUES
('Yoan', 'De_Menezes', 'yoan.demenezes@gmail.com'),
('test', 'test', 'test@gmail.com'),
('admin', 'user', 'admin@admin.com');

