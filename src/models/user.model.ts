import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const userSchema = new Schema<IUser>(
  {
    firstName: String,

    lastName: String,

    email: {
      type: String,
      unique: true
    },

    password: String,

    role: {
      type: String,
      default: 'user'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUser>(
  'User',
  userSchema
);