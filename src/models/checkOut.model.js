import mongoose from "mongoose";

const checkoutSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true
    },

    stripeSessionId: {
      type: String,
      required: true
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

const CheckoutSessions = mongoose.model(
  "checkoutSession",
  checkoutSessionSchema
);

export default CheckoutSessions;
