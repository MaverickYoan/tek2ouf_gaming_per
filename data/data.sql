CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE jeux (
  id SERIAL PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  description TEXT,
  image_path VARCHAR(255), -- chemin de l’image sur le serveur
  date_sortie DATE,
  genre VARCHAR(100)
);

-- CREATE TABLE jeux (
--   id SERIAL PRIMARY KEY,
--   titre VARCHAR(255) NOT NULL,
--   description TEXT,
--   image_url VARCHAR(255),
--   date_sortie DATE,
--   genre VARCHAR(100),
--   createur_id INTEGER REFERENCES users(id)
-- );
