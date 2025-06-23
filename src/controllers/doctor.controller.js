import prisma from "../configs/prisma.js";
import bcrypt from "bcryptjs";

export const getMeDoctor =  async (req, res, next) => {
  try {
    const doctor = await prisma.doctor.findUnique({
      where :{
        id : req.doctor.id
      }
    })

    console.log(doctor)
    res.json({ id: doctor.id, username: doctor.username, specialization: doctor.specialization})
  } catch (error) {
    next(error);
  }
};

export const updateDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password, specialization } = req.body;
    console.log(id, username);

    const hashPassword = bcrypt.hashSync(password, 10)

    const doctor = await prisma.doctor.update({
      where: {
        id: req.doctor.id
      },
      data: {
        username: username,
        password: hashPassword,
        specialization: specialization
      }
    })

    res.json({ id: doctor.id, username: doctor.username, specialization: doctor.specialization });
  } catch (error) {
    next(error);
  }
};