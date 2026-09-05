import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';

import productRouter from './routes/productsRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT ?? 3030;

await connectMongoDB();

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(productRouter);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
