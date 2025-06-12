const RevokedToken = require("../models/revokedToken");
const { verifyJWTToken } = require("../utils/jwt.util");

const verifyAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: `Provide authorization header` });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: `Provide token in vaild format ` });
    }

    const token = authHeader.split("")[1];
    if (!token || token === "null" || token === "undefined") {
      return res.status(401).json({ message: `Provide token` });
    }

    const revokedToken = await RevokedToken.findOne({ token });
    if (revokedToken) {
      return res.status(401).json({ message: `Token is already revoked` });
    }

    const data = verifyJWTToken(token);
    if (data.error) {
      return res
        .status(401)
        .json({ message: `Provide valid token - ${data.message}` });
    }
    req.user = data;
    next();
  } catch (error) {
    console.error("Error verifying auth:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = verifyAuth;
