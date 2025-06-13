const authService = require("../services/auth.services");

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
    return res.status(statusCodes.badRequest).json({
      message: `please provide information: ${missingKeys.join(",")}`,
    });
  }

  const result = await authService.signIn(req.body);

  if (result.userNotFound) {
    return res.status(404).json({
      message: `User not found with the provided email ${req.body.email}`,
    });
  }
  if (result.passwordMisMatch) {
    return res
      .status(400)
      .json({ message: `The password you have provided is incorrect` });
  }

  res.json({ token: result.token });
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

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%@*]).{8,}$/;

  if (password.length < 8) {
    return res.status(statusCodes.badRequest).json({
      message: `Password should be more than 8 characters`,
    });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message: `Password must include at least one uppercase letter, one lowercase letter and one special character`,
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
  const token = authHeader.split(" ")[1];
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
