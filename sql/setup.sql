-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS yawp_users;
DROP TABLE IF EXISTS restaurants;

CREATE TABLE yawp_users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);

INSERT INTO yawp_users (
    first_name,
    last_name,
    email,
    password_hash
)

VALUES
('test1', 'test1', 'test1@test.com', 'nottest1passwordhash'),
('test2', 'test2', 'test2@test.com', 'nottest2passwordhash'),
('test3', 'test3', 'test3@test.com', 'nottest3passwordhash'),
('Test5', 'User5', 'test4@test.com', 'snzVh9sBJ45fAu5JwRc81Ud9q6pfnSQbt9j8e/YxJa5zi');

CREATE TABLE restaurants (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL
);

INSERT INTO restaurants (
    name,
    type
)

VALUES
('Fast Pizza', 'Pizza'),
('Yummy Mexican', 'Mexican'),
('Good Italian', 'Italian'),
('Banzai Sushi', 'Sushi');

CREATE TABLE reviews (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    stars BIGINT,
    detail VARCHAR(255) NOT NULL,
    restaurant_id BIGINT,
    user_id BIGINT,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    FOREIGN KEY (user_id) REFERENCES yawp_users(id)
);

INSERT INTO reviews (
    restaurant_id,
    user_id,
    stars,
    detail
)

VALUES 
(1, 1, '5', 'Very good'),
(4, 4, '5', 'BANZAI');
