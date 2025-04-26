import Joi from "joi";
import { rolesTypes } from "../../middlewares/auth.middleware.js";
import { generalFields } from "../../middlewares/validation.middlware.js";

export const registerSchema = Joi.object({
  userName: generalFields.userName.required(),
  email: generalFields.email.required(),
  password: generalFields.password.required(),
  confirmPassword: generalFields.confirmPassword.required(),
  phone: generalFields.phone.required(),
  role: generalFields.role.required().valid(...Object.values(rolesTypes)),
});
export const loginSchema = Joi.object({
  email: generalFields.email.required(),
  password: generalFields.password.required(),
});
