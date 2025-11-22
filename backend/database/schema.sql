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
    like_count INT DEFAULT 0,
    dislike_count INT DEFAULT 0,
    created_at TIMESTAMP,
    modified_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS app_user_likes (
    id SERIAL PRIMARY KEY,
    post INT NOT NULL REFERENCES app_user_posts(id),
    author INT NOT NULL REFERENCES app_user(id)
);

CREATE TABLE IF NOT EXISTS app_user_dislikes (
    id SERIAL PRIMARY KEY,
    post INT NOT NULL REFERENCES app_user_posts(id),
    author INT NOT NULL REFERENCES app_user(id)
);