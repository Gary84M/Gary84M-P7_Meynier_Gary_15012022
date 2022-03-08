const pool = require("../config/db");
const queries = require("../config/queries");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtTokens = require("../utils/jwt.helpers");
const router = require("../routes/user.routes");
const signUpErrors = require("../utils/errors.utils");
//const maxAge = 3 * 24 * 60 * 60 * 1000;

// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.TOKEN_SECRET, {
//     expiresIn: maxAge,
//   });
// };

const signUp = async (req, res) => {
  try {
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    //check if email exists
    const email = req.body.email;
    console.log(email);
    pool.query(queries.checkEmailExists, [email], (error, results) => {
      if (results.rows.length) {
        res.status(401).json({ error: "Email already registered" });
        // res.json.("Email already registered");
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
        }
      );
    });
  } catch (error) {
    // const errors = signUpErrors(error);
    // res.status(200).send({ errors });
    res.status(401).json(error);
  }
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
      //return res.status(401).json({ error: "invalid password" });

      return res.status(401).json({ error: "invalid password" });

    //JWT
    let tokens = jwtTokens(user.rows[0]);
    res.cookie("refresh_token", tokens.refreshToken, { httpOnly: false });
    res.json(tokens);
  } catch (error) {
    res.status(401).json({ error: "Null token" });
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
        console.log(user);
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
