CREATE TABLE IF NOT EXISTS app_user (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    role VARCHAR(255) DEFAULT 'user',
    username VARCHAR(255),
    password VARCHAR(255),
    profile_path VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS app_user_posts (
    id SERIAL PRIMARY KEY,
    author INT NOT NULL REFERENCES app_user(id),
    title TEXT,
    content TEXT NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP
);