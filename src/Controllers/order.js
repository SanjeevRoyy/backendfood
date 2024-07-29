import { Menu, Order, Table } from "../Models/model.js";

export const makeOrder = async (req, res) => {
  const { items, tableNumber } = req.body;
  const restaurantId = req._id;
  try {
    console.log({ items, tableNumber, restaurantId });
    const validTable = await Table.findOne({
      number: tableNumber,
      restaurantId,
    });
    console.log(":::::::::::::VALID TABLE::::::::::", validTable._id);
    if (validTable) {
      if (validTable.status === "available") {
        const menuItems = await Menu.find({ restaurantId });
        console.log(menuItems);

        // Create a map of menuItems for quick lookup
        const menuItemsMap = menuItems.reduce((map, menuItem) => {
          map[menuItem._id] = menuItem;
          return map;
        }, {});

        // Check each item in the order
        let isValidOrder = true;
        let totalPrice = 0;

        for (const item of items) {
          const menuItem = menuItemsMap[item.menuItem];

          if (!menuItem) {
            isValidOrder = false;
            break;
          }

          // Calculate the total price
          totalPrice += menuItem.price * item.quantity;
        }
        console.log(totalPrice);

        if (!isValidOrder) {
          throw new Error("Menu item doesnt exists");
        }
        const result = await Order.create({
          items,
          tableNumber: validTable.id,
          restaurantId,
          totalPrice,
        });
        await Table.findOneAndUpdate(
          { id: isValidOrder.id },
          { status: "occupied" },
          { new: true }
        );
        res.json({
          success: true,
          message: "Order created successfully",
          data: result,
        });
      } else {
        throw new Error("Table is occupied");
      }
    } else {
      throw new Error("Table number doesnt exists");
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const restaurantId = req._id;
    console.log(restaurantId);
    const result = await Order.find({ restaurantId });
    console.log(result);
    res.json({
      success: true,
      message: "Order fetched successfully!!",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const reOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { items } = req.body;
    const restaurantId = req._id;

    // // Find the existing order
    console.log(orderId);
    console.log(restaurantId);
    console.log(items);
    const existingOrder = await Order.findOne({
      _id: orderId,
      restaurantId,
    });
    console.log(":::::::::EXISTING::::::::", existingOrder.items);
    if (!existingOrder) {
      throw new Error("Order not found");
    }

    // Find the menu items
    const menuItems = await Menu.find({ restaurantId });
    const menuItemsMap = menuItems.reduce((map, menuItem) => {
      map[menuItem._id] = menuItem;
      return map;
    }, {});

    // Validate the new items and calculate the additional price
    let isValidOrder = true;
    let additionalPrice = 0;

    for (const item of items) {
      const menuItem = menuItemsMap[item.menuItem];

      if (!menuItem) {
        isValidOrder = false;
        break;
      }

      additionalPrice += menuItem.price * item.quantity;
    }

    if (!isValidOrder) {
      throw new Error("One or more menu items don't exist");
    }
    console.log(":::::::::EXISTING:::::::;", existingOrder.items);

    // Update the existing order with new items and new total price
    const updatedItems = existingOrder.items.concat(items);
    const updatedTotalPrice = existingOrder.totalPrice + additionalPrice;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        items: updatedItems,
        totalPrice: updatedTotalPrice,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getKitchenDisplay = async (req, res) => {
  try {
    const restaurantId = req._id;
    const allPendingOrders = await Order.find({
      restaurantId,
      status: "pending",
    })
      .populate("tableNumber")
      .populate("items.menuItem");
    res.json({
      success: true,
      message: "Kitchen display data fetched successfully",
      data: allPendingOrders,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error message",
    });
  }
};

export const closeOrder = async (req, res) => {
  try {
    const restaurantId = req._id;
    const orderId = req.params.id;
    const order = await Order.findOne({ _id: orderId, restaurantId }).populate(
      "tableNumber"
    );
    if (order) {
      const closeOrder = await Order.findByIdAndUpdate(
        orderId,
        { status: "closed" },
        { new: true }
      );
      const tableId = order.tableNumber._id;
      await Table.findByIdAndUpdate(
        tableId,
        { status: "available" },
        { new: true }
      );
      res.json({
        success: true,
        message: `Order closed and table ${order.tableNumber.number} is available now`,
        data: closeOrder,
      });
    } else {
      throw new Error("Order not found");
    }
  } catch (error) {
    res.json({
      success: true,
      message: error.message,
    });
  }
};