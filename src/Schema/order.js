import mongoose, { Schema } from "mongoose";

const orderSchema = Schema(
  {
    tableNumber: {
      type: mongoose.Schema.ObjectId,
      ref: "Table",
      required: true,
    },
    items: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Restaurant ID is required"],
    },
    status: {
      type: String,
      enum: ["pending", "preparing", "served", "closed"],
      default: "pending",
    },
  },
  { timeStamps: true }
);

export default orderSchema;