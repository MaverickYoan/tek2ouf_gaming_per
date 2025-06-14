CREATE TABLE utilisateurs (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
    is_admin BOOLEAN DEFAULT FALSE
);

INSERT INTO utilisateurs (username, password, email, is_admin) VALUES
('Yoan', 'password', 'yoan.demenezes@gmail.com', TRUE),
('test', 'password', 'test@gmail.com', TRUE),
('Maverick', 'password', 'yoan.dalkia@gmail.com', FALSE),
('Bob', 'password', 'bob.sponge@gmail.com', FALSE),
('Patrick', 'password', 'patrick.seastar@gmail.com', FALSE),
('Anne', 'password', 'anne.franck@gmail.com', FALSE),
('Steeve', 'password', 'steeve.mcqueen@gmail.com', FALSE),
('Yo', 'password', 'yo.yoan@gmail.com', FALSE),
('Alice', 'password', 'Alice.Wonderland@gmail.com', FALSE),
('John', 'password', 'john.doe@gmail.com', FALSE),
('Jane', 'password', 'jane.smith@gmail.com', FALSE),
('Max', 'password', 'max.power@gmail.com', FALSE),
('Lisa', 'password', 'lisa.simpson@gmail.com', FALSE),
('Bart', 'password', 'bart.simpson@gmail.com', FALSE),
('Homer', 'password', 'homer.simpson@gmail.com', FALSE),
('Marge', 'password', 'marge.simpson@gmail.com', FALSE),
('Nelson', 'password', 'nelson.muntz@gmail.com', FALSE),
('Milhouse', 'password', 'milhouse.vanhouten@gmail.com', FALSE),
('Ralph', 'password', 'ralph.wiggum@gmail.com', FALSE),
('Seymour', 'password', 'seymour.skinner@gmail.com', FALSE),
('Edna', 'password', 'edna.krabappel@gmail.com', FALSE),
('Apu', 'password', 'apu.nahasapeemapetilon@gmail.com', FALSE);