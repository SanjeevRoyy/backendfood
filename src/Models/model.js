import { model } from "mongoose";

import menuSchema from '../Schema/menu.js';
import userSchema from "../Schema/user.js";
import tableSchema from "../Schema/table.js";
import orderSchema from "../Schema/order.js";


export const Menu = model("Menu", menuSchema);
export const User = model("User", userSchema);
export const Table = model("Table", tableSchema);
export const Order = model("Order", orderSchema);




