const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require("../middleware/catchAsync");

// create new order;
exports.newOrder = catchAsync(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shipingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shipingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    order,
  });
});

// get Single details
exports.getSingleOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order)
    return next(new ErrorHandler("Order not found with this id", 404));
  res.status(200).json({
    success: true,
    order,
  });
});

// get Logged in user orders
exports.myOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  if (!orders)
    return next(new ErrorHandler("Order not found with this id", 404));
  res.status(200).json({
    success: true,
    orders,
  });
});

// get all orders -- Admin
exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((o) => (totalAmount += o.totalPrice));
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update Order Status -- Admin
exports.updateOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order)
    return next(new ErrorHandler("Order not found with this id", 404));
  if (order.orderStatus === "Delievered")
    return next(
      new ErrorHandler("You have already delievered this order", 400)
    );

  order.orderItems.forEach(async (o) => {
    await updateStock(o.product, o.quantity);
  });

  order.orderStatus = req.body.status;
  if (req.body.status === "Delievered") {
    order.delieveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// delete order -- Admin
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order)
    return next(new ErrorHandler("Order not found with this id", 404));
  await order.remove();

  res.status(200).json({
    success: true,
  });
});
