import express from 'express';
import {
  addProduct,
  getProducts,
  getProductById,
  deleteProduct
} from '../controllers/product.controller';

import { protect ,adminOnly} from '../middleware/auth.middleware';
import { upload } from '../utils/upload';

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProductById);

router.post(
  '/',
  protect,
  adminOnly,
  upload.array('images', 5),
    addProduct
);

router.delete('/:id', protect, adminOnly, deleteProduct);

export default router;