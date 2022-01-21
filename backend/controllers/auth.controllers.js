const pool = require("../config/db");
const queries = require("../config/queries");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return (
    jwt.sign(id),
    process.env.TOKEN_SECRET,
    {
      expiresIn: maxAge,
    }
  );
};

const signUp = (req, res) => {
  //check if email exists
  const email = req.body.email;
  console.log(email);
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.send("Email already registered");
    }
    //add User to db
    const { first_name, last_name, email, dob, password } = req.body;
    pool.query(
      queries.addUser,
      [first_name, last_name, email, dob, password],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("User created succesfully");
        console.log("User created");
      }
    );
  });
};

const signIn = (req, res) => {
  const { email, password } = req.body;

  try {
    const user = pool.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (error) {
    res.status(251).json(error);
  }
};

module.exports = {
  signUp,
  signIn,
};
