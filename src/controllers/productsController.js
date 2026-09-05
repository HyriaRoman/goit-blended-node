// import createHttpError from 'http-errors';

import { Products } from '../models/product.js';

export async function getAllProducts(req, res) {
  const { page = 1, perPage = 10 } = req.query;
  const skip = Math.max(0, (page - 1) * perPage);
  const query = Products.find();

  const [totalNotes, notes] = await Promise.all([
    query.clone().countDocuments(),
    query.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({
    page,
    perPage,
    totalNotes,
    totalPages,
    notes,
  });
}
