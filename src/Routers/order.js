import { Router } from "express";
import {
  closeOrder,
  getKitchenDisplay,
  getOrders,
  makeOrder,
  reOrder,
} from "../Controllers/order.js";
import isAuthenticated from "../Middlewares/isAuthenticated.js";

const orderRouter = Router();

orderRouter
  .route("/")
  .post(isAuthenticated, makeOrder)
  .get(isAuthenticated, getOrders);
orderRouter.route("/kitchen/pending").get(isAuthenticated, getKitchenDisplay);
orderRouter.route("/close/:id").put(isAuthenticated, closeOrder);
orderRouter.route("/:id").put(isAuthenticated, reOrder);

export default orderRouter;