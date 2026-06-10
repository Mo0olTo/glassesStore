import { Request, Response } from 'express';
import Cart from '../models/cart.model';
import Order from '../models/order.model';
import Product from '../models/product.model'; 


export const checkout = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    // 1. get cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // 2. check stock before order
    for (const item of cart.items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.title}`
        });
      }
    }

    // 3. create order items
    const orderItems = cart.items.map((item: any) => ({
      product: item.product,
      quantity: item.quantity,
      price: item.price
    }));

    // 4. calculate total
    const totalPrice = cart.totalPrice;

    // 5. create order
    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalPrice,
      paymentStatus: 'pending',
      orderStatus: 'pending'
    });

    // 6. decrease stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity, sold: item.quantity }
      });
    }

    // 7. clear cart
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (err) {
    res.status(500).json({ message: 'Checkout failed' });
  }
}; 




export const getMyOrders = async (req: any, res: Response) => {
  const orders = await Order.find({ user: req.user.id })
    .populate('items.product')
    .sort({ createdAt: -1 });

  res.json(orders);
}; 



export const getAllOrders = async (_req: Request, res: Response) => {
  const orders = await Order.find()
    .populate('user')
    .populate('items.product');

  res.json(orders);
}; 



export const updateOrderStatus = async (req: Request, res: Response) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.orderStatus = status;

  await order.save();

  res.json(order);
};