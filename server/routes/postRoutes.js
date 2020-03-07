const express = require('express');

const router = express.Router();

router
  .route('/')
  .get(getPost)
  .post(addPost);

module.exports = router;
