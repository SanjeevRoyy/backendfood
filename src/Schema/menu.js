import { Schema } from "mongoose";


const menuSchema = Schema(
    {
        name: {
          type: String,
          required: [true, "Menu item name is required"],
        },
        description: {
          type: String,
        },
        price: {
          type: Number,
          required: [true, "Menu item price is required"],
        },
        category: {
          type: String,
          required: [true, "Menu item category is required"],
        },
        restaurantId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: [true, "Restaurant ID is required"],
        },
        estimatedTime: {
          type: Number,
          required: [true, "Estimated time is required"],
        },
        photo: {
          type: String,
             //required: [true, "Menu item photo is required"],
        },
      },
      { timestamps: true }
    );
    
    export default menuSchema;