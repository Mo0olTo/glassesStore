import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes'
import productRoutes from './routes/product.routes'
import cartRoutes from './routes/cart.routes'
import orderRoutes from './routes/order.routes'

const app = express();

app.use(cors());

app.use(express.json());
app.use(authRoutes);
app.use('/api/categories', categoryRoutes); 
app.use('/uploads', express.static('uploads'));
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Glasses API Running');
});

export default app;