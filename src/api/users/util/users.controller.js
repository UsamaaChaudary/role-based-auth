const appRoot = require('app-root-path');
const Users = require(appRoot + '/src/models/users.model');
const bcrypt = require('bcrypt');
const userValidation = require('./users.validation');
const constants = require(appRoot + '/src/constants');


exports.createUserWithRoles = async (req, res) => {
  try {
    const body = ({
      firstName,
      lastName,
      email,
      password,
      role
    } = req.body);
    const { error } = userValidation.validateAdminData.validate(body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        responseStatus: false,
        responseMessage: constants.ERRORS.INVALID_REQUESTS
      });
    }
    body.password = await bcrypt.hash(password, 10);
    let createAdmin = await Users.create(body);
    createAdmin.password = null;
    return res.status(200).json({
      responseStatus: true,
      responseMessage: 'User created successfuly',
      responseData: createAdmin,
    });
  } catch (error) {
    return res.status(500).json({
      responseStatus: false,
      responseMessage: constants.ERRORS.SERVER_ERROR,
      responseData: []
    });
  }
}

exports.getAllUsersWithRole = async (req, res) => {
  try {
    let users = await Users.find({ role: req.params.role });
    return res.status(200).json({
      responseStatus: true,
      responseMessage: 'Users fetched successfuly',
      responseData: users,
    });
  } catch (error) {
    return res.status(500).json({
      responseStatus: false,
      responseMessage: constants.ERRORS.SERVER_ERROR,
      responseData: []
    });
  }
}

exports.getUser = async (req, res) => {
  try {
    let users = await Users.findById(req.params.userId);
    return res.status(200).json({
      responseStatus: true,
      responseMessage: 'User fetched successfuly',
      responseData: users,
    });
  } catch (error) {
    return res.status(500).json({
      responseStatus: false,
      responseMessage: constants.ERRORS.SERVER_ERROR,
      responseData: []
    });
  }
}
