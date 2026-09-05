import { Router } from 'express';
import { celebrate } from 'celebrate';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productsController.js';
import { getAllProductsSchema } from '../validation/productsValidation.js';

const router = Router();

router.get('/products', celebrate(getAllProductsSchema), getAllProducts);
router.get('/products/:productId', getProductById);
router.post('/products', createProduct);
router.patch('/products/:productId', updateProduct);
router.delete('/products/:productId', deleteProduct);

export default router;

