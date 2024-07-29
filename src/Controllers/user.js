import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../Models/model.js";

dotenv.config();

const secretKey = process.env.SECRET_KEY || "RestroTech";

export let createUser = async (req, res) => {
  let data = req.body;
  try {
    let existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    let result = await User.create(data);

    res.status(201).json({
      success: true,
      message: "User successfully created",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });

    if (user) {
      let isPasswordValidated = await bcrypt.compare(password, user.password);
      if (isPasswordValidated) {
        let infoObj = {
          _id: user._id,
        };

        let expiryInfo = {
          expiresIn: "365d",
        };
        const verificationToken = await jwt.sign(
          infoObj,
          secretKey,
          expiryInfo
        );
        res.json({
          success: true,
          message: "Login successful",
          data: user,
          token: verificationToken,
        });
      } else {
        let error = new Error("Password is wrong");
        throw error;
      }
    } else {
      let error = new Error("User not found");
      throw error;
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
