import mongoose from "mongoose";
const { Schema } = mongoose;

const subscriptionSchema = new Schema(
  {
    provider: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Provider is required"],
    },
    subscriber: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Subscriber is required"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    },
    subscriptionDate: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Compound index to ensure unique subscriptions
subscriptionSchema.index({ provider: 1, subscriber: 1 }, { unique: true });

const SubscriptionModel = mongoose.model("Subscription", subscriptionSchema);

export default SubscriptionModel; 