import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";

export const authCheckUser = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      createError(401, "Token is missing!!");
    }

    const token = header.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        createError(401, "Token is Invalid!!");
      }
      req.user = decode;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export const authCheckDoctor = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      createError(401, "Token is missing!!");
    }

    const token = header.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        createError(401, "Token is Invalid!!");
      }
      req.doctor = decode;
      next();
    });
  } catch (error) {
    next(error);
  }
};