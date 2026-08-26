CREATE DATABASE docentes_db;

USE docentes_db;

CREATE TABLE docentes
(
		id INT primary key auto_increment,
        nombre VARCHAR(150) not null,
        correo VARCHAR(150) not null,
        telefono VARCHAR(15) not null,
        titulo VARCHAR(150) not null,
        area_academica VARCHAR(150) not null,
        dedicacion VARCHAR(150) not null,
        anios_experiencia INT not null default 0,
        created_at timestamp default current_timestamp
);