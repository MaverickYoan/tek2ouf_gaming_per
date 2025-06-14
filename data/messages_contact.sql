CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    objet VARCHAR(255) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
    message TEXT NOT NULL,
);

INSERT INTO messages (objet, nom, prenom, email, messages) VALUES
('Test objet', 'Yoan', 'De Menezes', 'yoan.demenezes@gmail.com', 'Test message');