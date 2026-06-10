import express from 'express';
import {
  createCategory,
  getCategories,
  deleteCategory
} from '../controllers/category.controller';

import { adminOnly, protect } from '../middleware/auth.middleware';


const router = express.Router();

router.get('/', getCategories);

router.post('/', protect, adminOnly, createCategory);

router.delete('/:id', protect, adminOnly, deleteCategory);

export default router; 

