import { stripe } from "../config/strip.js";
import CheckoutSessions from "../models/checkOut.model.js";
import Orders from "../models/order.model.js";
import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const checkoutOrder = asyncHandler(async (req, res) => {
    const user = req.user;
    const { orderId } = req.body;

    if (!orderId) {
        throw new ApiErrors(400, "Order ID is required");
    }

    const order = await Orders.findById(orderId);

    if (!order) {
        throw new ApiErrors(404, "Order not found");
    }

    if (order.isPaid) {
        throw new ApiErrors(400, "Order already paid");
    }

    const line_items = order.orderItems.map(item => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: item.name
            },
            unit_amount: Math.round(item.price * 100)
        },
        quantity: item.quantity
    }));

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items,
        success_url: `${process.env.CLIENT_URL}/payment-success`,
        cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
        metadata: {
            orderId: order._id.toString(),
            userId: user._id.toString()
        }
    });

    await CheckoutSessions.create({
        user: user._id,
        order: order._id,
        stripeSessionId: session.id
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            { checkoutUrl: session.url },
            "Checkout session created successfully"
        )
    );
});



export const stripeWebhook = asyncHandler(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Payment completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const checkout = await CheckoutSessions.findOne({
      stripeSessionId: session.id
    }).populate("order");

    if (!checkout) return res.sendStatus(200);

    checkout.paymentStatus = "paid";
    await checkout.save();

    const order = checkout.order;
    order.isPaid = true;
    order.status = "paid";
    order.paidAt = new Date();
    order.paymentResult = {
      id: session.payment_intent,
      status: session.payment_status,
      email: session.customer_details.email
    };
    await order.save();

    // Reduce stock
    for (const item of order.orderItems) {
      const product = await Products.findById(item.product);
      if (product) {
        product.countInStock -= item.quantity;
        await product.save();
      }
    }
  }

  res.json({ received: true });
});
