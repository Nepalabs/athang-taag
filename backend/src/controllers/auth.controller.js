const authService = require("../services/auth.services");

const signIn = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: `Body cannot be empty` });
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
    return res.status(400).json({ message: `Body cannot be empty` });
  }

  const { email, password } = req.body;
  const keys = Object.keys(req.body);
  const requiredKeys = ["name", "email", "password", "phoneNumber", "gender"];

  const missingKeys = requiredKeys.filter((key) => !keys.includes(key));

  if (missingKeys.length > 0) {
    return res.status(400).json({
      message: `Please provide all information : ${missingKeys.join(",")}`,
    });
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%@*]).{8,}$/;

  if (String(password).length < 8) {
    return res.status(400).json({
      message: `Password should be more than 8 characters`,
    });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message: `Password must include at least one uppercase, one lowercase letter and one special character`,
    });
  }

  const result = await authService.signUp(req.body);

  if (result.userAlreadyExist) {
    return res.status(400).json({ message: `User ${email} already exists` });
  }

  res.status(201).json({ message: `User with ${email} created successfully` });
};

const signOut = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split("")[1];
  await authService.signOut(token);

  res.status(204).json({ message: `Signout successfully` });
};

const getLoggedInUser = async (req, res) => {
  const user = req.user;

  const userData = await authService.getLoggedInUser(user._id);

  res.status(200).json({
    message: `User fetched successfully`,
    user: userData,
  });
};

module.exports = { signIn, signUp, signOut, getLoggedInUser };
