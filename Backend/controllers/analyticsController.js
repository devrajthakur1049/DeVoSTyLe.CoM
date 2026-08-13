const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const productModel = require("../models/productModel");


const getAdminstatus = async (req, res) => {
  try {
    const totalOrders = await orderModel.countDocuments({role: "user"});
    const totalUsers = await userModel.countDocuments();
    const totalProducts = await productModel.countDocuments();

    const orders = await orderModel.find({})
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    res.json({
      totalOrders,
      totalUsers,
      totalProducts,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};
module.exports = { getAdminstatus };
