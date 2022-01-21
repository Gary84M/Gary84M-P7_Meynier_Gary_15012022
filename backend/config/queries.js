const getUsers = "SELECT (id, first_name, last_name, email, dob) FROM users;";
const getUserById =
  "SELECT (id, first_name, last_name, email, dob) FROM users WHERE id = $1";
const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1";
const addUser =
  "INSERT INTO users (first_name, last_name, email, dob, password) VALUES ($1, $2, $3, $4, $5)";
const updateUser =
  "UPDATE users SET first_name = $1, last_name = $2, dob = $3 WHERE id = $4";
const deleteUser = "DELETE FROM users WHERE id = $1";

module.exports = {
  getUsers,
  getUserById,
  checkEmailExists,
  addUser,
  updateUser,
  deleteUser,
};
