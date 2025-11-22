TRUNCATE app_user, app_user_posts, app_user_likes, app_user_dislikes, app_user_comments RESTART IDENTITY;

INSERT INTO app_user (email, role, username, password)
VALUES 
    ('bobross@email.com', 'user', 'bob_ross', md5('practice')),
    ('admin@shop.com', 'admin', 'admin', md5('admin123')),
    ('first@email.com', 'user', 'first_user', md5('password')),
    ('demo@demo.com', 'user', 'demo', md5('demo123')),
    ('test@test.com', 'user', 'test', md5('test123'));

INSERT INTO app_user_posts (author, title, content, like_count, dislike_count, created_at)
VALUES
    (1,
    'Talent',
    '"Talent is a pursued interest. Anything that you''re willing to practice, you can do."',
    4,
    0,
    '2025-04-28 23:06:00'),
    (4,
    'Trial Title',
    'Trial Post by Demo User',
    0,
    4,
    '2025-07-05 10:45:00');

INSERT INTO app_user_posts (author, title, content, created_at)
VALUES
    (2,
    'Title',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non lorem purus. Suspendisse bibendum mauris nunc. Praesent euismod pharetra eleifend.',
    '2025-06-04 10:45:00'),
    (2,
    '2nd Post',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non lorem purus. Suspendisse bibendum mauris nunc. Praesent euismod pharetra eleifend.',
    '2025-07-04 10:45:00'),
    (3,
    'Title',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non lorem purus. Suspendisse bibendum mauris nunc. Praesent euismod pharetra eleifend.',
    '2025-06-05 10:45:00');

INSERT INTO app_user_likes (post, author)
VALUES
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5);

INSERT INTO app_user_dislikes (post, author)
VALUES
    (4, 2),
    (4, 3),
    (4, 1),
    (4, 5);

INSERT INTO app_user_comments (author, comment, post_id, created_at)
VALUES
    (2,
    'admin comment',
    1,
    '2025-09-22 10:45:00'),
    (3,
    'first comment',
    1,
    '2025-09-22 10:45:00'),
    (4,
    'demo comment',
    1,
    '2025-09-22 10:45:00'),
    (5,
    'test comment',
    1,
    '2025-09-22 10:45:00');
