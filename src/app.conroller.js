import connectDB from "./DB/conection.js";
import authRouter from "./Modules/Auth/auth.controller.js";
import massegeRouter from "./Modules/Masseges/massege.controller.js";
import userRouter from "./Modules/User/user.controller.js";
import subscriptionRouter from "./Modules/Subscription/subscription.controller.js";
import cors from "cors";
import bcrypt from "bcrypt";
import Usermodel from "./DB/models/user.models.js";

const bootstrap = async (app, express) => {
  await connectDB();
  app.use(cors());
  app.use(express.json());
  app.use("/auth", authRouter);
  app.use("/massege", massegeRouter);
  app.use("/user", userRouter);
  app.use("/subscriptions", subscriptionRouter);
  app.use("/admin", creatAdmin);

  async function creatAdmin() {
    const adminExists = await Usermodel.findOne({ role: "admin" });
    if (!adminExists) {
      const hashedPassword = bcrypt.hashSync("admin123", 10);
      const adminUser = await Usermodel.create({
        name: "admin",
        email: "admin",
        password: hashedPassword,
        role: "admin",
      });
      await adminUser.save();
      console.log("admin created successfully");
    }
    return res
      .status(error)
      .json({ success: false, massage: error.massage, stack: error.stack });
  }

  app.all("*", (req, res, next) => {
    return next(new Error("route not found", { cause: 404 }));
  });
  app.use((error, req, res, next) => {
    const status = error.cause || 500;
    return res
      .status(status)
      .json({ success: false, massage: error.massage, stack: error.stack });
  });
};

export default bootstrap;
