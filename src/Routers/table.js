import { Router } from "express";
import { createTable, getRestaurantTables } from "../Controllers/table.js";
import isAuthenticated from "../Middlewares/isAuthenticated.js";

const tableRouter = Router();

tableRouter
  .route("/")
  .post(isAuthenticated, createTable)
  .get(isAuthenticated, getRestaurantTables);

export default tableRouter;