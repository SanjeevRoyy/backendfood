import { Menu } from "../Models/model.js";

export const createMenu = async (req, res) => {
  const { name, description, price, category, estimatedTime } = req.body;
  const restaurantId = req._id;
  const photo = `localhost:8000/${req.file.filename}`;

  try {
    const menuData = {
      name,
      description,
      price,
      category,
      restaurantId,
      estimatedTime,
      photo,
    };
    let result = await Menu.create(menuData);

    res.json({
      success: true,
      message: "Menu successfully created",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getRestaurantMenu = async (req, res) => {
  const restaurantId = req._id;
  try {
    const menuData = await Menu.find({ restaurantId });
    res.json({
      success: true,
      message: "Menu Data fetched successfully",
      data: menuData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getSpecificMenuItem = async (req, res) => {
  const menuId = req.params.id;
  try {
    const result = await Menu.findById(menuId);
    res.json({
      success: true,
      message: "Menu item fetched successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateMenuItem = async (req, res) => {
  const menuId = req.params.id;
  const data = req.body;
  try {
    if (req.file) {
      data.photo = `localhost:8000/${req.file.filename}`;
    }
    const result = await Menu.findByIdAndUpdate(menuId, data, { new: true });
    res.json({
      success: true,
      message: "Menu item updated successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteMenuItem = async (req, res) => {
  const menuId = req.params.id;
  try {
    const result = await Menu.findByIdAndDelete(menuId);
    res.json({
      success: true,
      message: "Menu item deleted successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
