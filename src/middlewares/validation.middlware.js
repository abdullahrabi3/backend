import Joi from "joi";
import { rolesTypes } from "../middlewares/auth.middleware.js";

export const validation = (schema) => {
  return (req, res, next) => {
    const data = { ...req.params, ...req.body, ...req.query };

    const result = schema.validate(data, { abortEarly: false });
    if (result.error) {
      const errorMessages = result.error.details.map((obj) => obj.message);
      return next(new Error(errorMessages, { cause: 400 }));
    }

    return next();
  };
};

export const generalFields = {
  userName: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  password: Joi.string(),
  confirmPassword: Joi.string().valid(Joi.ref("password")),
  phone: Joi.string(),
  role: Joi.string().valid(...Object.values(rolesTypes)),
};
