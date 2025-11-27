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

CREATE TABLE IF NOT EXISTS app_user_comments (
    id SERIAL PRIMARY KEY,
    author INT NOT NULL REFERENCES app_user(id),
    comment TEXT NOT NULL,
    post_id INT NOT NULL REFERENCES app_user_posts(id),
    created_at TIMESTAMP,
    modified_at TIMESTAMP
);

DROP PROCEDURE IF EXISTS resetLikesData;
CREATE PROCEDURE resetLikesData()
LANGUAGE plpgsql
AS $$
BEGIN
    -- Your SQL statements here
    RAISE NOTICE 'This procedure was executed without parameters.';
    UPDATE app_user_posts SET like_count = 0, dislike_count = 0 WHERE id = 5;
    TRUNCATE app_user_dislikes;
    TRUNCATE app_user_likes;
END;
$$;

DROP PROCEDURE IF EXISTS displayPosts;
CREATE PROCEDURE displayPosts()
LANGUAGE plpgsql
AS $$
BEGIN
    RAISE NOTICE 'Complete posts display';
    SELECT * FROM app_user_posts;
    SELECT * FROM app_user_likes;
    SELECT * FROM app_user_dislikes;
    SELECT * FROM app_user_comments;
END;
$$;

SELECT * FROM app_user_posts; SELECT * FROM app_user_likes; SELECT * FROM app_user_dislikes; SELECT * FROM app_user_comments;