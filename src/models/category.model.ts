import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },

    image: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model('Category', categorySchema);