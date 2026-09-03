-- 1. Crear esta base desde pgAdmin o psql si todavía no existe:
-- CREATE DATABASE curso_backend;

-- 2. Conectarse a curso_backend y ejecutar lo siguiente:

CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    edad INTEGER CHECK (edad IS NULL OR edad >= 0)
);

INSERT INTO usuarios (nombre, email, edad)
VALUES
    ('Ana López', 'ana@example.com', 22),
    ('Luis Pérez', 'luis@example.com', 25)
ON CONFLICT (email) DO NOTHING;

SELECT * FROM usuarios;
