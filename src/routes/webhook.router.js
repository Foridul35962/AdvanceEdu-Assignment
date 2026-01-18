import express from "express";
import { stripeWebhook } from "../controller/checkout.controller.js";

const webhooksRouter = express.Router();

webhooksRouter.post("/stripe", express.raw({ type: "application/json" }), stripeWebhook);

export default webhooksRouter;
