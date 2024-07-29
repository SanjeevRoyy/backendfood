import { Schema } from "mongoose";

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "fullName is required"],
    },
    email: {
      type: String,
      unique: [true, "This email address is already in use"],
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },

    address: {
      type: String,
      required: [true, "address is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "phoneNumber is required"],
    },
  },
  { timestamps: true }
);

export default userSchema;