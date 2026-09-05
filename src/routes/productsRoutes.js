import { Router } from 'express';
import { celebrate } from 'celebrate';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productsController.js';
import { createProductSchema, getAllProductsSchema, productIdSchema, updateProductSchema } from '../validation/productsValidation.js';

const router = Router();

router.get('/products', celebrate(getAllProductsSchema), getAllProducts);
router.get('/products/:productId', celebrate(productIdSchema), getProductById);
router.post('/products', celebrate(createProductSchema), createProduct);
router.patch('/products/:productId', celebrate(updateProductSchema), updateProduct);
router.delete('/products/:productId', celebrate(productIdSchema), deleteProduct);

export default router;

