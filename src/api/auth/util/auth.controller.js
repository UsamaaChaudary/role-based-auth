const appRoot = require('app-root-path');
const Users = require(appRoot + '/src/models/users.model');
const constants = require(appRoot + '/src/constants');
const jwt = require('jsonwebtoken');
const authValidation = require('./auth.validation');


function getJWT(email, _id) {
  const token = jwt.sign({
    user: {
      email: email,
      _id: _id
    }
  }, process.env.SIGNING_SECRET || '');
  return token;
}


exports.login = async (req, res) => {
  try {
    if (req.user.message == constants.INCORRECT_PASSWORD || req.user.message == constants.INCORRECT_EMAIL) {
      return res.status(400).send({
        responseStatus: false,
        responseMessage: constants.INCORRECT_CREDENTIALS,
        responseData: []
      });
    } else {
      let user = await Users.findOne({ email: req.body.email }).select('-password');
      if (!user) {
        return res.status(500).send({
          responseStatus: false,
          responseMessage: constants.ERRORS.UNEXPECTED_ERROR,
          responseData: user,
          token: getJWT(user.email, user._id),
        });
      }
      return res.status(200).send({
        responseStatus: true,
        responseMessage: 'User logged in successfully',
        responseData: user,
        token: getJWT(user.email, user._id),
      });
    }
  } catch (err) {
    return res.status(200).send({
      responseStatus: false,
      responseMessage: constants.ERRORS.SERVER_ERROR,
      responseData: []
    });
  }
}

exports.signup = async (req, res) => {
  try {
    const body = ({
      firstName,
      lastName,
      email,
      role
    } = req.body);
    if (req.user.message == constants.USER_EXIST) {
      return res.status(200).send({
        responseStatus: false,
        responseMessage: constants.USER_EXIST,
        responseData: []
      });
    }
    const { error } = authValidation.validateSignupData.validate(body, {
      abortEarly: false,
    });
    if (error) {
      await Users.deleteOne({ email: email });
      return res.status(400).json({
        responseStatus: false,
        responseMessage: constants.ERRORS.INVALID_REQUESTS,
        error: error.details,
      });
    }
    if (role === constants.USER_ROLE.ADMIN) {
      await Users.deleteOne({ email: email });
      return res.status(400).json({
        responseStatus: false,
        responseMessage: constants.ERRORS.INVALID_REQUESTS,
        error: error,
      });
    }
    const user = Object.freeze(await Users.findOne({ email: email}));
    if (!user) {
      return res.status(400).json({
        responseStatus: false,
        responseMessage: constants.ERRORS.UNEXPECTED_ERROR
      });
    }
    let updatedUser = await Users.findByIdAndUpdate({ _id: user._id}, body).select('-password');
    return res.status(201).json({
      responseStatus: true,
      responseMessage: 'User created successfuly',
      responseData: updatedUser,
      token: getJWT(req.user.email, req.user._id)
    });
  } catch (error) {
    return res.status(500).json({
      responseStatus: false,
      responseMessage: constants.ERRORS.SERVER_ERROR,
      responseData: []
    });
  }
}
