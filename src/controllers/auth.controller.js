import prisma from "../configs/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";

export const registerDoctor = async (req, res, next) => {
  try {
    const { username, password, specialization } = req.body;

    const doctor = await prisma.doctor.findUnique({
      where: {
        username: username,
      },
    });
    console.log(doctor);
    if (doctor) {
      createError(400, "Username already exist!!");
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    console.log(hashPassword);

    const result = await prisma.doctor.create({
      data: {
        username: username,
        password: hashPassword,
        specialization: specialization,
      },
    });

    res.status(200).json({ message: `Register ${result.username} Success` });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    console.log(user);
    if (user) {
      createError(400, "Username already exist!!");
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    console.log(hashPassword);

    const result = await prisma.user.create({
      data: {
        username: username,
        password: hashPassword,
      },
    });

    res.status(200).json({ message: `Register ${result.username} Success` });
  } catch (error) {
    next(error);
  }
};

export const loginDoctor = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const doctor = await prisma.doctor.findUnique({
      where: {
        username: username,
      },
    });
    console.log(doctor);
    if (!doctor) {
      createError(400, "Username or Password is invalid!!");
    }

    const checkPassword = bcrypt.compareSync(password, doctor.password);
    if (!checkPassword) {
      createError(400, "Username or Password is invalid!!");
    }

    const payload = {
      id: doctor.id,
      role: doctor.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: `Welcome back ${doctor.username}`,
      payload: payload,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    console.log(user);
    if (!user) {
      createError(400, "Username or Password is invalid!!");
    }

    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      createError(400, "Username or Password is invalid!!");
    }

    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: `Welcome back ${user.username}`,
      payload: payload,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};