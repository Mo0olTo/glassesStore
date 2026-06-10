import express from 'express';
import {
  checkout,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} from '../controllers/order.controller';

import { protect, adminOnly } from '../middleware/auth.middleware';


const router = express.Router();

// user
router.post('/checkout', protect, checkout);
router.get('/my-orders', protect, getMyOrders);

// admin
router.get('/', protect, adminOnly, getAllOrders);
router.put('/:id/status', protect, adminOnly, updateOrderStatus);

export default router;