const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let UsersSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  role: {
		type: String,
		enum: ['Admin', 'Customer', 'Seller']
	},
  email: String,
  password: String,
  isBlocked: {
    type: Boolean,
    default: false
  }
});

UsersSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}

const Users = mongoose.model('users', UsersSchema);

module.exports = Users;
