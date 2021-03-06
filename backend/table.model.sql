CREATE TABLE posts (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	users_id BIGINT REFERENCES users (id),
	content VARCHAR(500),
	type VARCHAR(500)
);
CREATE TABLE comments (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	post_id BIGINT NOT NULL REFERENCES posts (id),
	users_id BIGINT NOT NULL REFERENCES users (id),
	content VARCHAR(500)
);

CREATE TABLE users (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50)NOT NULL,
	dob DATE NOT NULL,
	email VARCHAR(250)NOT NULL UNIQUE,
	password VARCHAR(250) NOT NULL,
	image BYTEA
);
