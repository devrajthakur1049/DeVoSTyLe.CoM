const orderModel = require("../models/orderModel");
const sendEmail = require("../utils/sendemail");

// Create Order
const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentid,
      totalPrice,
    } = req.body;

    if (
      !orderItems ||
      orderItems.length === 0 ||
      !shippingAddress ||
      !paymentMethod ||
      !totalPrice
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const order = await orderModel.create({
      user: req.user._id,
      items: orderItems,
      totalAmount: totalPrice,
      paymentMethod,
      paymentid,
      address: shippingAddress,
    });

    const orderDetails = `
Dear ${req.user.name},

Thank you for your order!

Order ID: ${order._id}
Total Amount: ₹${order.totalAmount}

We will notify you once your order is shipped.

Regards,
DeVoStyle Team
`;

    await sendEmail(
      req.user.email,
      "Order Confirmation",
      orderDetails
    );

    res.status(201).json(order);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// My Orders
const myOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ user: req.user._id })
      .populate("items.product")
      .populate("user", "name email");

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Orders (Admin)
const getOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("user", "name email")
      .populate("items.product");

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Order Status (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }



    order.status = req.body.status;

    await order.save();

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  myOrders,
  getOrders,
  updateOrderStatus,
};

