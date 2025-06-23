import prisma from "../configs/prisma.js";
import bcrypt from "bcryptjs";

export const getMeUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where :{
        id : req.user.id
      }
    })

    res.json({ id: user.id, username: user.username})
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    console.log(id, username);

    const hashPassword = bcrypt.hashSync(password, 10)

    const user = await prisma.user.update({
      where: {
        id: req.user.id
      },
      data: {
        username: username,
        password: hashPassword
      }
    })

    res.json({ id: user.id, username: user.username });
  } catch (error) {
    next(error);
  }
};