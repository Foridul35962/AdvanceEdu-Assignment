import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true
  },
  name: String,
  image: String,
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  size: String,
  color: String
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    orderItems: [orderItemSchema],

    shippingAddress: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      postalCode: String,
      country: String
    },

    paymentMethod: {
      type: String,
      enum: ["stripe", "cod"],
      default: "stripe"
    },

    paymentResult: {
      id: String,
      status: String,
      email: String
    },

    itemsPrice: {
      type: Number,
      required: true
    },
    taxPrice: {
      type: Number,
      default: 0
    },
    shippingPrice: {
      type: Number,
      default: 0
    },
    totalPrice: {
      type: Number,
      required: true
    },

    isPaid: {
      type: Boolean,
      default: false
    },
    paidAt: Date,

    isDelivered: {
      type: Boolean,
      default: false
    },
    deliveredAt: Date,

    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true }
);

const Orders = mongoose.model("order", orderSchema);
export default Orders;