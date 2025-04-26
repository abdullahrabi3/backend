import { Router} from "express";
import * as massegeServices from "./massege.services.js";

const router = Router();

router.get("/",massegeServices.getMassege );


export default router; 