INSERT INTO app_user (email, role, username, password)
VALUES 
  ('bobross@email.com', 'user', 'bob_ross', md5('practice')),
  ('admin@shop.com', 'admin', 'admin', md5('admin123')),
  ('first@email.com', 'user', 'first_user', md5('password')),
  ('demo@demo.com', 'user', 'demo', md5('demo123')),
  ('test@test.com', 'user', 'test', md5('test123'));