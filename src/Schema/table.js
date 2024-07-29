import { Schema } from "mongoose";

const tableSchema = Schema(
  {
    number: {
      type: String,
      required: [true, "Table name is required"],
    },
    capacity: {
      type: String,
    },
    // category: {
    //   type: String,
    //   required: [true, " Category is required"],
    // },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Restaurant ID is required"],
    },
    status: {
      type: String,
      enum: ["available", "occupied"],
      default: "available",
    },
  },
  { timestamps: true }
);

export default tableSchema;