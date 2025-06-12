import { asyncHandler } from "../../middlewares/asyncHandler.js";
import SubscriptionModel from "../../DB/models/subscription.model.js";
import UserModel from "../../DB/models/user.models.js";

import { rolesTypes } from "../../middlewares/auth.middleware.js";

export const getProviderSubscribers = asyncHandler(async (req, res, next) => {
    const providerId = req.params.providerId || req.user._id;

    // Verify provider exists
    const provider = await UserModel.findById(providerId);
    if (!provider) {
        return res.status(404).json({
            key: "success",
            success: false,
            data: null,
            message: "Provider not found"
        });
    }

    // Get all active subscriptions for the provider
    const subscriptions = await SubscriptionModel.find({
        provider: providerId,
        status: "active"
    }).populate({
        path: 'subscriber',
        select: 'userName email phone image' // Only return necessary fields
    });

    const subscribers = subscriptions.map(sub => sub.subscriber);

    return res.status(200).json({
        key: "success",
        success: true,
        data: {
            count: subscribers.length,
            subscribers
        }
    });
}); 