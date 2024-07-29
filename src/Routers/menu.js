import { Router } from "express";
import {
  createMenu,
  deleteMenuItem,
  getRestaurantMenu,
  getSpecificMenuItem,
  updateMenuItem,
} from "../Controllers/menu.js";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import upload from "../Middlewares/upload.js";

const menuRouter = Router();

menuRouter
  .route("/")
  .post(isAuthenticated, upload.single("file"), createMenu)
  .get(isAuthenticated, getRestaurantMenu);

menuRouter
  .route("/:id")
  .get(getSpecificMenuItem)
  .put(upload.single("file"), updateMenuItem)
  .delete(deleteMenuItem);


// PaginationProducts
// Router.get('/pagination', menuController.paginationProducts)




export default menuRouter;