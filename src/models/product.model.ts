import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
  {
    title: { type: String, required: true },

    description: { type: String },

    images: [String],

    price: { type: Number, required: true },

    stock: { type: Number, default: 0 },

    sold: { type: Number, default: 0 },

    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },

    brand: String,

    gender: {
      type: String,
      enum: ['male', 'female', 'unisex'],
      default: 'unisex'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);