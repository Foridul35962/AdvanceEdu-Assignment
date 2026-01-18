import Orders from "../models/order.model.js";
import Products from "../models/Product.model.js";
import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createOrder = asyncHandler(async (req, res) => {
    const user = req.user;
    const { orderItems, shippingAddress } = req.body;

    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
        throw new ApiErrors(400, "Order items are required");
    }

    let formattedItems = [];
    let itemsPrice = 0;

    for (const item of orderItems) {
        const product = await Products.findById(item.productId);

        if (!product) {
            throw new ApiErrors(404, "Product not found");
        }

        if (product.countInStock < item.quantity) {
            throw new ApiErrors(
                400,
                `${product.name} is out of stock`
            );
        }

        const price = product.discountPrice || product.price;

        formattedItems.push({
            product: product._id,
            name: product.name,
            image: product.images?.[0]?.url,
            price,
            quantity: item.quantity,
            size: item.size,
            color: item.color
        });

        itemsPrice += price * item.quantity;
    }

    const shippingPrice = 0;
    const taxPrice = 0;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const order = await Orders.create({
        user: user._id,
        orderItems: formattedItems,
        shippingAddress,
        paymentMethod: "stripe",
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    });

    return res.status(201).json(
        new ApiResponse(201, order, "Order created successfully")
    );
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const user = req.user;

  const orders = await Orders.find({ user: user._id }).sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      orders,
      "User orders fetched successfully"
    )
  );
});
