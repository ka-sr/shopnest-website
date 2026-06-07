const Order = require('../models/Order');
const sendEmail = require('../utils/sendEmail');

const addOrderItems = async (req, res) => {
  try {
    const { items, totalAmount, address, paymentId } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const orderItems = items.map((item) => ({
      productId: item.productId || item._id,
      qty: item.qty,
      price: item.price
    }));

    const order = new Order({
      userId: req.user._id,
      items: orderItems,
      totalAmount,
      address,
      paymentId
    });
    const createdOrder = await order.save();

    const message = `
      <h2>Order Confirmation</h2>
      <p>Hello ${req.user.name},</p>
      <p>Your order has been successfully placed! Order ID: <strong>${createdOrder._id}</strong></p>
      <p>Total Amount Paid: ₹${totalAmount.toFixed(2)}</p>
      <p>It will be shipped to: ${address.street}, ${address.city}</p>
      <p>Thank you for shopping with ShopNest!</p>
    `;

    await sendEmail({
      email: req.user.email,
      subject: 'ShopNest - Order Confirmation',
      message
    });

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('userId', 'id name').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'name email');
    if (order) {
      const newStatus = req.body.status || order.status;
      order.status = newStatus;
      const updatedOrder = await order.save();

      if (newStatus === 'Shipped') {
        const message = `
          <h2>Order Shipped</h2>
          <p>Hello ${order.userId.name},</p>
          <p>Your order <strong>${order._id}</strong> has been shipped.</p>
          <p>It is on its way to: ${order.address.street}, ${order.address.city}.</p>
          <p>Thank you for shopping with ShopNest!</p>
        `;
        await sendEmail({
          email: order.userId.email,
          subject: 'ShopNest - Order Shipped',
          message
        });
      }

      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addOrderItems, getMyOrders, getOrders, updateOrderStatus };
