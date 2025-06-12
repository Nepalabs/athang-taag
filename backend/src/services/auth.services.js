const { compareHash, createHash } = require("../utils/hash.util");
const User = require("../models/user.model");
const { createJWTToken } = require("../utils/jwt.util");
const RevokedToken = require("../models/revoked-token.model");

const signIn = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ email: email });

  if (!user) {
    return { userNotFound: true };
  }

  const isPasswordMatched = await compareHash(password, user.password);

  if (!isPasswordMatched) {
    return { passwordMisMatch: true };
  }

  delete user.password;

  const token = createJWTToken(user.toJSON());

  return { token };
};

const signUp = async (data) => {
  const { email } = data;
  const user = await User.findeOne({ email: email });

  if (user) {
    return { userAlreadyExist: true };
  }
  data.password = await createHash(data.password);
  const newUser = new User(data);
  const savedUser = await newUser.save();

  return { user: savedUser };
};

const signOut = async (token) => {
  const newToken = new RevokedToken({ token });
  await newToken.save();
};

const getLoggedInUser = async (userId) => {
  const user = await User.findById(userId, { password: 0 });
  return user;
};

module.exports = { signIn, signUp, signOut, getLoggedInUser };
