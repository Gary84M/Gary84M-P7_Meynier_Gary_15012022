//*************************USERS******************** */
const getUsers =
  "SELECT id, first_name, last_name, email, image, dob FROM users;";
const getUserById = "SELECT * FROM users WHERE id = $1";
const getUserByEmail = "SELECT * FROM users WHERE email = $1";
const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1";
const addUser =
  "INSERT INTO users (first_name, last_name, email, dob, password) VALUES ($1, $2, $3, $4, $5)";
const updateUser =
  "UPDATE users SET first_name = $1, last_name = $2, dob = $3, image = $4 WHERE id = $5";
const deleteUser = "DELETE FROM users WHERE id = $1";
const updateImage = "UPDATE users SET image = $1 WHERE id = $2;";

//************************POST**************************** */
const getAllPost = "SELECT * FROM posts ORDER BY id desc";
const createPost =
  "INSERT INTO posts (users_id, content, image, video) VALUES ($1, $2, $3, $4);";
const createPostNoPic =
  "INSERT INTO posts (users_id, content, video) VALUES ($1, $2, $3);";

const createPostImage =
  "INSERT INTO posts (users_id, content, image) VALUES ($1, $2, $3);";
const getPostById = "SELECT id FROM posts WHERE id = $1;";
const updatePost = "UPDATE posts SET content = $1 WHERE id = $2;";
const deletePost = "DELETE FROM posts WHERE id = $1;";
//**********************COMMENTS************************ */
const addComm =
  "INSERT INTO comments (post_id, users_id, content) VALUES ($1, $2, $3);";

const getCommById = "SELECT id, users_id, content FROM comments WHERE id = $1;";

const getCommByPost =
  "SELECT p.id, c.content, c.users_id, c.id, c.post_id, u.first_name, u.last_name FROM comments c, posts p, users u WHERE c.post_id = p.id AND c.users_id = u.id ORDER BY c.id DESC;";
// const getCommByPost =
//   "SELECT comments.content, comments.users_id FROM comments JOIN posts ON comments.post_id = posts.id WHERE post_id = 44 ORDER BY comments.id desc;";
// const getCommByPost =
//   "SELECT comments.content, comments.users_id FROM comments JOIN posts ON comments.post_id = posts.id ORDER BY comments.id desc;";
const updateComm = "UPDATE comments SET content = $1 WHERE id = $2;";
const deleteComm = "DELETE FROM comments WHERE id = $1;";
const getAllComms = "SELECT * FROM comments ORDER BY id desc";

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  checkEmailExists,
  addUser,
  updateUser,
  deleteUser,
  updateImage,

  getAllPost,
  createPost,
  createPostNoPic,
  createPostImage,
  getPostById,
  updatePost,
  deletePost,

  addComm,
  getCommById,
  getCommByPost,
  updateComm,
  deleteComm,
  getAllComms,
};
