const pool = require("../config/db");
const queries = require("../config/queries");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtTokens = require("../utils/jwt.helpers");
const router = require("../routes/user.routes");
//const maxAge = 3 * 24 * 60 * 60 * 1000;

// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.TOKEN_SECRET, {
//     expiresIn: maxAge,
//   });
// };

const signUp = async (req, res) => {
  let hashedPassword = await bcrypt.hash(req.body.password, 10);
  //check if email exists
  const email = req.body.email;
  console.log(email);
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.send("Email already registered");
    }
    //add User to db
    const { first_name, last_name, email, dob } = req.body;

    //Validation checks
    if (!first_name || !last_name || !email || !dob || !hashedPassword) {
      res.status(400).json({ error: "Please fill in all the fields" });
    }

    pool.query(
      queries.addUser,
      [first_name, last_name, email, dob, hashedPassword],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("User created succesfully");
        console.log("User created");
        console.log(hashedPassword);
      }
    );
  });
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query(queries.getUserByEmail, [email]);

    if (user.rows.length === 0)
      return res.status(401).json({ error: "Email is incorrect" });
    //PASSWORD CHECK
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword)
      return res.status(401).json({ error: "incorrect password" });
    //JWT
    let tokens = jwtTokens(user.rows[0]);
    res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
    res.json(tokens);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
const refreshTok = (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    console.log(refreshToken);
    if (refreshToken === null)
      return res.status(401).json({ error: "Null refresh token" });
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, user) => {
        if (error) return res.status(403).json({ error: error.message });
        let tokens = jwtTokens(user);
        res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
        res.json(tokens);
      }
    );
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({ message: "refresh token deleted" });
  } catch (error) {
    res.status(401).josn({ error: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
  refreshTok,
  logout,
};
