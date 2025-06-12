import { Router } from "express";
import * as subscriptionServices from "./subscription.services.js";
import { authentication, allowTo } from "../../middlewares/auth.middleware.js";
import { rolesTypes } from "../../middlewares/auth.middleware.js";

const router = Router();

// Get subscribers for a provider
router.get(
    "/provider/subscribers/:providerId?",
    authentication,
    allowTo([rolesTypes.Admin, rolesTypes.User]),
    subscriptionServices.getProviderSubscribers
);

export default router; 