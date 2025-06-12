import Usermodel from "../../DB/models/user.models.js";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { rolesTypes } from "../../middlewares/auth.middleware.js";

export const register = async (req, res, next) => {
  const { email, password, phone,gender,age } = req.body;

  const checkUser = await Usermodel.findOne({ email });
  if (checkUser) {
    return res.status(409).json({
      key: "success",
      success: false,
      data: null,
      message: "user found"
    });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const encryptedphone = CryptoJS.AES.encrypt(
    phone,
    process.env.ENCRIPTION_SECRIT
  ).toString();

  const user = await Usermodel.create({
    ...req.body,
    password: hashedPassword,
    phone: encryptedphone,
  });
  return res.status(201).json({
    key: "success",
    success: true,
    data: { user },
  });
};

export const login = async (req, res, next) => {
  const { email } = req.body;

  const user = await Usermodel.findOne({ email });
  if (!user) {
    return res.status(404).json({
      key: "success",
      success: false,
      data: null,
      message: "user not found"
    });
  }

  if (!user.confirmEmail === false) {
    return res.status(400).json({
      key: "success",
      success: false,
      data: null,
      message: "user not confirmed"
    });
  }

  const match = bcrypt.compareSync(req.body.password, user.password);
  if (!match) {
    return res.status(400).json({
      key: "success",
      success: false,
      data: null,
      message: "invalid password"
    });
  }
  const token = jwt.sign(
    { id: user._id, isloggedIn: true },
    user.role === rolesTypes.User
      ? process.env.TOKEN_SECRIT_USER
      : process.env.TOKEN_SECRIT_ADMIN,
    { expiresIn: 60 * 60 }
  );

  if (user.isDlete == true) {
    user.isDlete = false;
    await user.save();
  }

  return res.status(200).json({
    key: "success",
    success: true,
    data: { token },
  });
};
