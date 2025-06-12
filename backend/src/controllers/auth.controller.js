const authService = require("../services/auth.service");

const statusCodes = {
  success: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  notFound: 404,
};

const signIn = async (req, res) => {
  if (!req.body) {
    return res
      .status(statusCodes.badRequest)
      .json({ message: `Body cannot be empty` });
  }

  const keys = Object.keys(req.body);
  const requireKeys = ["email", "password"];

  const missingKeys = requireKeys.filter((key) => !keys.includes(key));

  if (missingKeys.length > 0) {
    return res.status().json({});
  }
};

const signUp = async (req, res) => {
  if (!req.body) {
    return res
      .status(statusCodes.badRequest)
      .json({ message: `Body cannot be empty` });
  }

  const { email, password } = req.body;
  const keys = Object.keys(req.body);
  const requiredKeys = ["name", "email", "password", "phoneNumber", "gender"];

  const missingKeys = requiredKeys.filter((key) => !keys.includes(key));

  if (missingKeys.length > 0) {
    return res.status(statusCodes.badRequest).json({
      message: `Please provide all information : ${missingKeys.join(",")}`,
    });
  }

  if (password.length < 8) {
    return res.status(statusCodes.badRequest).json({
      message: `Password should be more than 8 characters`,
    });
  }

  const errors = [];

  if (password.length < 8) {
    errors.push("Password should be at least 8 characters long.");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must include at least one uppercase letter.");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must include at least one lowercase letter.");
  }

  if (!/\d/.test(password)) {
    errors.push("Password must include at least one digit.");
  }

  if (!/[!#$%@*]/.test(password)) {
    errors.push(
      "Password must include at least one special character (!, #, $, %, @, *)."
    );
  }

  if (errors.length > 0) {
    return res.status(statusCodes.badRequest).json({
      message: errors.join(" "), // or send as an array: errors
    });
  }
  const result = await authService.signUp(req.body);

  if (result.userAlreadyExist) {
    return res
      .status(statusCodes.badRequest)
      .json({ message: `User ${email} already exists` });
  }

  res
    .status(statusCodes.created)
    .json({ message: `User with ${email} created successfully` });
};

const signOut = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split("")[1];
  await authService.signOut(token);

  res.status(statusCodes.noContent).json({ message: `Signout successfully` });
};

const getLoggedInUser = async (req, res) => {
  const user = req.user;

  const userData = await authService.getLoggedInUser(user._id);

  res.status(statusCodes.success).json({
    message: `User fetched successfully`,
    user: userData,
  });
};

module.exports = { signIn, signUp, signOut, getLoggedInUser };
