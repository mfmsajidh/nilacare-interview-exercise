BEGIN;

DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS test CASCADE;
DROP TYPE IF EXISTS task_status CASCADE;
DROP TYPE IF EXISTS task_priority CASCADE;

CREATE TYPE task_status AS ENUM ('todo', 'in_progress', 'done');
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high');

CREATE TABLE test (
    id serial PRIMARY KEY NOT NULL,
    name varchar(256)
);

CREATE TABLE users (
    id serial PRIMARY KEY NOT NULL,
    email varchar(256) NOT NULL,
    password varchar(256) NOT NULL,
    created_at timestamp DEFAULT now() NOT NULL,
    updated_at timestamp DEFAULT now() NOT NULL
);

CREATE TABLE projects (
    id serial PRIMARY KEY NOT NULL,
    name varchar(256) NOT NULL,
    description text,
    created_at timestamp DEFAULT now() NOT NULL,
    updated_at timestamp DEFAULT now() NOT NULL
);

CREATE TABLE tasks (
    id serial PRIMARY KEY NOT NULL,
    title varchar(255) NOT NULL,
    description text,
    status task_status DEFAULT 'todo' NOT NULL,
    priority task_priority DEFAULT 'medium' NOT NULL,
    project_id integer NOT NULL,
    created_at timestamp DEFAULT now() NOT NULL,
    updated_at timestamp DEFAULT now() NOT NULL,
    CONSTRAINT tasks_project_id_projects_id_fk FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE cascade
);

COMMIT;
