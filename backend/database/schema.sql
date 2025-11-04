CREATE TABLE IF NOT EXISTS app_user (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    role VARCHAR(255) DEFAULT 'user',
    username VARCHAR(255),
    password VARCHAR(255),
    profile_path VARCHAR(255)
);