import createHttpError from 'http-errors';

import { Products } from '../models/product.js';

export async function getAllProducts(req, res) {
  const { page = 1, perPage = 10 } = req.query;
  const skip = Math.max(0, (page - 1) * perPage);
  const query = Products.find();

  const [totalProducts, products] = await Promise.all([
    query.clone().countDocuments(),
    query.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalProducts / perPage);

  res.status(200).json({
    page,
    perPage,
    totalProducts,
    totalPages,
    products,
  });
}

export async function getProductById(req, res) {
  const { productId } = req.params;

  const product = await Products.findOne({
    _id: productId,
  });

  console.log(productId, product);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json(product);
}

export async function createProduct(req, res) {
  const product = await Products.create({
    ...req.body,
  });
  res.status(201).json(product);
}

export async function deleteProduct(req, res) {
  const { productId } = req.params;

  const product = await Products.findOneAndDelete({
    _id: productId,
  });

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json(product);
}

export async function updateProduct(req, res) {
  const { productId } = req.params;

  const product = await Products.findOneAndUpdate(
    {
      _id: productId,
    },
    req.body,
    { returnDocument: 'after' },
  );

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json(product);
}
