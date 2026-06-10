import { Request, Response } from 'express';
import Product from '../models/product.model'; 
import { paginate } from '../utils/paginate';



export const addProduct = async (req: any, res: Response) => {
  try {
    const {
      title,
      description,
      price,
      stock,
      category,
      brand,
      gender
    } = req.body;

    const images = req.files?.map((file: any) => file.path);

    const product = await Product.create({
      title,
      description,
      price,
      stock,
      category,
      brand,
      gender,
      images
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product' });
  }
}; 



export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const { skip } = paginate(page, limit);

    const products = await Product.find()
      .populate('category')
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments();

    res.json({
      data: products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
};


export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id).populate('category');

  res.json(product);
}; 


export const deleteProduct = async (req: Request, res: Response) => {
  await Product.findByIdAndDelete(req.params.id);

  res.json({ message: 'Deleted' });
};