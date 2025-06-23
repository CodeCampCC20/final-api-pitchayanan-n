import prisma from "../configs/prisma.js";

export const addHealthRecord = async (req, res, next) => {
  try {
    const { type, value } = req.body;

    const result = await prisma.healthRecord.create({
      data: {
        type: type,
        value: value,
      }
    })

    res.json({ message: "Create health record successfully"})
  } catch (error) {
    next(error)
  }
}