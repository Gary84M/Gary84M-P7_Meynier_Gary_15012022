const pool = require("../config/db");
const queries = require("../config/queries");

const readPost = (req, res) => {
  pool.query(queries.getAllPost, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
    console.log("getting posts");
  });
};

const createPost = async (req, res) => {
  const { users_id, content } = req.body;
  try {
    pool.query(queries.createPost, [users_id, content], (error, results) => {
      if (error) throw error;
      res.status(201).send("Post succesfully created");
      console.log(req.body.content);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePost = (req, res) => {
  const idUrl = parseInt(req.params.id);
  const { id, users_id, content } = req.body;
  console.log(req.body);

  pool.query(queries.getPostById, [idUrl], (error, results) => {
    const noConvoFound = !results.rows.length;

    if (noConvoFound) {
      res.send("Post does not exist in the DB");
      console.log("post_id checked");
    }
    pool.query(queries.updatePost, [content, idUrl], (error, results) => {
      if (error) throw error;
      res.status(201).send("Post succesfully modified");
    });
  });
};

const deletePost = (req, res) => {
  const idUrl = parseInt(req.params.id);
  console.log(idUrl);

  pool.query(queries.getPostById, [idUrl], (error, results) => {
    const noConvoFound = !results.rows.length;
    if (noConvoFound) {
      res.send("Post does not exist in the DB");
    }

    pool.query(queries.deletePost, [idUrl], (error, results) => {
      if (error) throw error;
      res.status(200).send("Post removed succesfully");
    });
  });
};
//************************************COMMENTS************************ */

const commentPost = (req, res) => {
  try {
    const idUrl = parseInt(req.params.id);
    const { post_id, users_id, content } = req.body;

    if (!req.params.id)
      return res.status(400).send("ID unknown : " + req.params.id);
    pool.query(queries.getPostById, [idUrl], (error, results) => {
      const noConvoFound = !results.rows.length;
      if (noConvoFound) {
        res.send("Post could not be found");
      }
      pool.query(
        queries.addComm,
        [idUrl, users_id, content],
        (error, results) => {
          if (error) throw error;
          res.status(201).send("Comment has been posted");
        }
      );
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editCommentPost = (req, res) => {
  const idUrl = parseInt(req.params.id);
  const { id, users_id, content } = req.body;
  console.log(req.body);
  console.log(idUrl);
  try {
    pool.query(queries.getCommById, [idUrl], (error, results) => {
      const noConvoFound = !results.rows.length;

      if (noConvoFound) {
        res.send("Post does not exist in the DB");
        console.log("comments_id checked");
      }
      pool.query(queries.updateComm, [content, idUrl], (error, results) => {
        if (error) throw error;
        res.status(201).send("Post succesfully modified");
      });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCommentPost = (req, res) => {
  const idUrl = parseInt(req.params.id);
  console.log(idUrl);

  pool.query(queries.getCommById, [idUrl], (error, results) => {
    const noConvoFound = !results.rows.length;
    if (noConvoFound) {
      res.send("Comment does not exist in the DB");
    }

    pool.query(queries.deleteComm, [idUrl], (error, results) => {
      if (error) throw error;
      res.status(200).send("Comment removed succesfully");
    });
  });
};

const readComms = (req, res) => {
  const idUrl = parseInt(req.params.id);
  pool.query(queries.getAllComms, [idUrl], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
    console.log("getting posts");
  });
};

module.exports = {
  readPost,
  createPost,
  updatePost,
  deletePost,

  commentPost,
  editCommentPost,
  deleteCommentPost,
  readComms,
};
