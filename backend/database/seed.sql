TRUNCATE app_user, app_user_posts RESTART IDENTITY;

INSERT INTO app_user (email, role, username, password)
VALUES 
  ('bobross@email.com', 'user', 'bob_ross', md5('practice')),
  ('admin@shop.com', 'admin', 'admin', md5('admin123')),
  ('first@email.com', 'user', 'first_user', md5('password')),
  ('demo@demo.com', 'user', 'demo', md5('demo123')),
  ('test@test.com', 'user', 'test', md5('test123'));

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
  '2025-06-05 10:45:00'),
  (4,
  'Trial Title',
  'Trial Post by Demo User',
  '2025-07-05 10:45:00'),
  (1,
  'Talent',
  '"Talent is a pursued interest. Anything that you''re willing to practice, you can do."',
  '2025-04-28 23:06:00');