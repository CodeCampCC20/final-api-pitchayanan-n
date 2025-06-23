import { object, ref, string } from "yup";

export const registerSchemaUser = object({
  username: string().required("กรุณากรอก Username"),
  password: string().min(6, "Password ต้องมากกว่า 6 อักขระ"),
  confirmPassword: string().oneOf(
    [ref("password"), null],
    "Confirm Password ไม่ตรงกัน"
  )
});

export const registerSchemaDoctor = object({
  username: string().required("กรุณากรอก Username"),
  password: string().min(6, "Password ต้องมากกว่า 6 อักขระ"),
  confirmPassword: string().oneOf(
    [ref("password"), null],
    "Confirm Password ไม่ตรงกัน"
  ),
  specialization: string().required("กรุณากรอก Specialization")
});

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errMsg = error.errors.map((item) => item);
    const errTxt = errMsg.join(",");
    console.log(errTxt);
    const mergeErr = new Error(errTxt);
    next(mergeErr);
  }
};
