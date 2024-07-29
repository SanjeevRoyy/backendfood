import { Table } from "../Models/model.js";

export const createTable = async (req, res) => {
  const { number, capacity } = req.body;
  try {
    const restaurantId = req._id;
    console.log(restaurantId);
    const existingTable = await Table.findOne({ number, restaurantId });
    if (!existingTable) {
      const result = await Table.create({ number, capacity, restaurantId });
      res.json({
        success: true,
        message: "Table created successfully",
        data: result,
      });
    } else {
      throw new Error("Table already exists");
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getRestaurantTables = async (req, res) => {
  try {
    const restaurantId = req._id;
    const result = await Table.find({ restaurantId });
    res.json({
      success: true,
      message: "Table fetched successfully!!",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};