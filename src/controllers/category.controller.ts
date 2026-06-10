import { Request, Response } from 'express';
import Category from '../models/category.model'; 


export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const exists = await Category.findOne({ name });

    if (exists) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = await Category.create({ name });

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 



export const getCategories = async (_req: Request, res: Response) => {
  const categories = await Category.find();
  res.json(categories);
};



export const deleteCategory = async (req: Request, res: Response) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};