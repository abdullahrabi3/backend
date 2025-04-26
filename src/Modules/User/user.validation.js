import { generalFields } from "../../middlewares/validation.middlware.js";
import Joi from "joi";

export const editprofileSchema = Joi.object({
  userName: generalFields.userName,
  email: generalFields.email,
  phone: generalFields.phone,
}).required();

export const changepassword = Joi.object({
  oldPassword: generalFields.password.required(),
  newPassword: generalFields.password.not(Joi.ref("oldPassword")).required(),
  confirmNewPassword: generalFields.confirmPassword.required(),
}).required();
