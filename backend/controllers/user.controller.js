const pool = require("../config/db");
const queries = require("../config/queries");

const getUsers = (req, res) => {
  pool.query(
    queries.getUsers,

    (error, results) => {
      if (error) throw error;
      console.log(results.rows);
      res.status(200).json(results.rows);
      console.log("in the DB");
    }
  );
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  const { first_name, last_name, email, dob, password } = req.body;
  pool.query(queries.getUserById, [id], (error, results) => {
    if (error) throw error;
    if (results?.rows?.[0]) {
      //optionnal chaining
      res.status(200).json(results.rows[0]);
    } else {
      res.sendStatus(404);
    }
  });
};

const userInfo = (req, res) => {
  console.log(req.params);
  const id = parseInt(req.params.id);

  pool.query(queries.getUserById, [id], (error, results) => {
    const noUserFound = !results.rows.length;
    if (noUserFound) {
      res.send("User unknown in the DB");
    }

    pool.query(queries.getUserById, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("User displayed succesfully");
    });
  });
};
// const addUser = (req, res) => {
//   const { first_name, last_name, email, dob, password } = req.body;
//   let first_name = req.body.first_name;
//   //check if email exists
//   pool.query(queries.checkEmailExists, [email], (error, results) => {
//     if (results.rows.length) {
//       res.send("Email already registered");
//     }
//     //add User to db
//     pool.query(
//       queries.addUser,
//       [first_name, last_name, email, dob, password],
//       (error, results) => {
//         if (error) throw error;
//         res.status(201).send("User created succesfully");
//         console.log("User created");
//       }
//     );
//   });
// };
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getUserById, [id], (error, results) => {
    const noUserFound = !results.rows.length;
    if (noUserFound) {
      res.send("User does not exist in the DB");
    }

    pool.query(queries.deleteUser, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("User removed succesfully");
    });
  });
};
const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { first_name, last_name, dob, image } = req.body;
  console.log(req.body);

  pool.query(queries.getUserById, [id], (error, results) => {
    const noUserFound = !results.rows.length;
    if (noUserFound) {
      res.send("User does not exist in the DB");
    }
    pool.query(
      queries.updateUser,
      [first_name, last_name, dob, image, id],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("User updated succesfully");
      }
    );
  });
};

module.exports = {
  getUsers,
  getUserById,
  userInfo,
  //addUser,
  deleteUser,
  updateUser,
};
