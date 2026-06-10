
import { Request, Response } from 'express';
import { hashPassword } from '../utils/hashPassword';
import { comparePassword } from '../utils/comparePassword';
import { generateToken } from '../utils/jwt';
import userModel from '../models/user.model';


export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashed = await hashPassword(password);

    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashed
    });

    const token = generateToken(user._id.toString(), user.role);

    res.status(201).json({
      user,
      token
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 



export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id.toString(), user.role);

    res.json({
      user,
      token
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};