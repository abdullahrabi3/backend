import { Router } from "express";
import * as authServices from "./auth.services.js";
import * as authvalidation from "./auth.validation.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { validation } from "../../middlewares/validation.middlware.js";
const router = Router();

router.post(
  "/register",

  validation(authvalidation.registerSchema),
  asyncHandler(authServices.register)
);

router.post(
  "/login",
  validation(authvalidation.loginSchema),
  asyncHandler(authServices.login)
);

export default router;
