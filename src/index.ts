import express, { Express } from 'express';
import dotenv from 'dotenv';
import { ProductRoutes } from './routes/product.router';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const host = process.env.HOST;
const productRoutes = new ProductRoutes();
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productRoutes.router.bind(productRoutes));

app.listen(port, () => {
  console.log(`Server is running at ${host}:${port}`);
});