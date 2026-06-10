import { Request, Response } from 'express';
import Cart from '../models/cart.model';
import Product from '../models/product.model';
import { calculateTotal } from '../utils/cart.util'; 


export const getCart = async (req: any, res: Response) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

  res.json(cart);
}; 


export const addToCart = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: userId });

    // لو مفيش cart → create
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: []
      });
    }

    // check if product already exists in cart
    const existingItem = cart.items.find(
      (item: any) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price
      });
    }

    // update total
    cart.totalPrice = calculateTotal(cart.items);

    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error adding to cart' });
  }
}; 


export const updateQuantity = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(
      (i: any) => i.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.quantity = quantity;

    cart.totalPrice = calculateTotal(cart.items);

    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error updating cart' });
  }
}; 


export const removeFromCart = async (req: any, res: Response) => {
  const userId = req.user.id;
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  cart.items = cart.items.filter(
    (item: any) => item.product.toString() !== productId
  );

  cart.totalPrice = calculateTotal(cart.items);

  await cart.save();

  res.json(cart);
};