import express from 'express';
import {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart
} from '../controllers/cart.controller';

import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', protect, getCart);

router.post('/add', protect, addToCart);

router.put('/update', protect, updateQuantity);

router.delete('/remove/:productId', protect, removeFromCart);

export default router;