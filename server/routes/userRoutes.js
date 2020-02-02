const express = require('express');
const {
  getUsers,
  saveUser,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const Router = express.Router();
Router.route('/')
  .get(getUsers)
  .post(saveUser);
Router.route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);
module.exports = Router;
