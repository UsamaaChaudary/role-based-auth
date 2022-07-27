const Joi = require('@hapi/joi');

exports.validateAdminData = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  role: Joi.string().required()
});

exports.validateAllUsersWithRoleData = Joi.object({
  role: Joi.string().required()
});